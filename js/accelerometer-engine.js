/**
 * GVMC Road Watch - Accelerometer Pothole Detection Engine (Section 8)
 * Edge Computing Shock Detection & Confidence Pipeline
 */

export class AccelerometerEngine {
    constructor(config = {}) {
        this.gravity = 9.81; // m/s^2
        this.zThreshold = config.zThreshold || 2.2; // g-force threshold
        this.minSpeedKmH = config.minSpeedKmH || 15;
        this.maxSpeedKmH = config.maxSpeedKmH || 80;
        this.dedupRadiusMeters = config.dedupRadiusMeters || 15;
        
        this.isMonitoring = false;
        this.localCache = []; // Spatio-temporal cache for deduplication
        this.onPotholeDetected = null;
        this.onTelemetryUpdate = null;
    }

    /**
     * Calculate Z-axis g-force shock
     * Formula: z_g_force = |accelZ - GRAVITY| / GRAVITY
     */
    calculateGForce(accelZ) {
        return Math.abs(accelZ - this.gravity) / this.gravity;
    }

    /**
     * Speed window validation (Section 8.3 & 8.10)
     */
    isValidSpeed(speedKmH) {
        return speedKmH >= this.minSpeedKmH && speedKmH <= this.maxSpeedKmH;
    }

    /**
     * Spatio-temporal deduplication check (Section 8.5)
     * Radius: 15m
     */
    isDuplicate(lat, lng) {
        const R = 6371e3; // Earth radius in meters
        for (const item of this.localCache) {
            const φ1 = lat * Math.PI / 180;
            const φ2 = item.lat * Math.PI / 180;
            const Δφ = (item.lat - lat) * Math.PI / 180;
            const Δλ = (item.lng - lng) * Math.PI / 180;

            const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                      Math.cos(φ1) * Math.cos(φ2) *
                      Math.sin(Δλ/2) * Math.sin(Δλ/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            const distance = R * c;

            if (distance <= this.dedupRadiusMeters) {
                return true; // Duplicate impact within 15 meters
            }
        }
        return false;
    }

    /**
     * Classify Severity Banding (Section 8.6)
     */
    classifySeverity(gForce) {
        if (gForce >= 4.0) return 'high';       // > 4.0g (Deep crater / High threat)
        if (gForce >= 2.5) return 'medium';     // 2.5g - 4.0g (Standard pothole)
        return 'low';                           // 1.5g - 2.5g (Minor rough patch)
    }

    /**
     * Calculate Confidence Score 0% - 100% (Section 8.7)
     */
    calculateConfidence(gForce, speedKmH, isWaveformMatched = true) {
        let confidence = 0;

        // 1. Impact Clarity (+40%)
        if (isWaveformMatched && gForce >= this.zThreshold) {
            confidence += 40;
        }

        // 2. Speed Validity (+30%)
        if (this.isValidSpeed(speedKmH)) {
            confidence += 30;
        }

        // 3. Shock Intensity Bonus (+30%)
        if (gForce >= 3.0) {
            confidence += 30;
        } else if (gForce >= 2.2) {
            confidence += 20;
        } else {
            confidence += 10;
        }

        return Math.min(100, confidence);
    }

    /**
     * Process incoming telemetry frame
     */
    processTelemetry(frame) {
        const { accelZ, speedKmH, lat, lng, timestamp = Date.now() } = frame;
        const gForce = this.calculateGForce(accelZ);

        if (this.onTelemetryUpdate) {
            this.onTelemetryUpdate({ gForce, speedKmH, accelZ });
        }

        // Check if impact exceeds threshold and speed filter passes
        if (gForce >= this.zThreshold && this.isValidSpeed(speedKmH)) {
            // Check for deduplication
            if (!this.isDuplicate(lat, lng)) {
                const severity = this.classifySeverity(gForce);
                const confidence = this.calculateConfidence(gForce, speedKmH);

                const incident = {
                    id: 'PTH-' + Math.floor(1000 + Math.random() * 9000),
                    latitude: lat,
                    longitude: lng,
                    peakGForce: parseFloat(gForce.toFixed(2)),
                    severity,
                    confidenceScore: confidence,
                    timestamp: new Date(timestamp).toISOString(),
                    status: 'detected',
                    source: 'auto_accelerometer'
                };

                // Add to local deduplication cache
                this.localCache.push({ lat, lng, timestamp });

                if (this.onPotholeDetected) {
                    this.onPotholeDetected(incident);
                }

                return incident;
            }
        }

        return null;
    }
}
