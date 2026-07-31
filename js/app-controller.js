/**
 * GVMC Road Watch - App State Controller (Section 11)
 * Binds UI components across all 19 HTML screens to the data service & accelerometer engine
 */

import { firebaseService } from './firebase-service.js';
import { AccelerometerEngine } from './accelerometer-engine.js';

export class AppController {
    constructor() {
        this.firebase = firebaseService;
        this.engine = null;
        this.initEngine();
    }

    async initEngine() {
        const config = await this.firebase.getConfig();
        this.engine = new AccelerometerEngine(config);

        this.engine.onPotholeDetected = async (pothole) => {
            console.log('[AUTO-DETECT] Impact logged:', pothole);
            await this.firebase.createReport({
                latitude: pothole.latitude,
                longitude: pothole.longitude,
                severity: pothole.severity,
                peakGForce: pothole.peakGForce,
                confidenceScore: pothole.confidenceScore,
                source: 'Auto Accelerometer (Z-Shock)',
                ward: 'Ward 52',
                road: 'Automated Telemetry Detection'
            });
        };
    }

    async loadWardOverview(wardName = 'Ward 52') {
        const potholes = await this.firebase.getPotholes({ ward: wardName });
        const detected = potholes.filter(p => p.status === 'detected').length;
        const assigned = potholes.filter(p => p.status === 'assigned').length;
        const repaired = potholes.filter(p => p.status === 'repaired').length;

        return {
            total: potholes.length,
            detected,
            assigned,
            repaired,
            list: potholes
        };
    }

    async updatePotholeLifecycle(potholeId, nextStatus, notes) {
        return await this.firebase.updateStatus(potholeId, nextStatus, notes);
    }
}

// Global window handle for easy prototype testing
window.gvmcController = new AppController();
