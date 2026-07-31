/**
 * GVMC Road Watch - End-to-End Integration Verifier (Section 13)
 * Automated Test Runner for Architecture & Logic Verification
 */

import { firebaseService } from './firebase-service.js';
import { AccelerometerEngine } from './accelerometer-engine.js';
import { seedDemoData } from './demo-seed-data.js';

export async function runE2EVerifier() {
    console.log('===================================================');
    console.log('  GVMC ROAD WATCH (SW11) - E2E INTEGRATION TEST   ');
    console.log('===================================================');
    
    let passed = 0;
    let failed = 0;

    function assert(condition, message) {
        if (condition) {
            console.log(`✅ [PASS] ${message}`);
            passed++;
        } else {
            console.error(`❌ [FAIL] ${message}`);
            failed++;
        }
    }

    try {
        // Test 1: Seed Data Initialization
        seedDemoData();
        const potholes = await firebaseService.getPotholes();
        assert(potholes.length >= 5, 'Demo dataset pre-seeded with at least 5 incidents');

        // Test 2: Role-Based Access Control & Auth
        const citizenUser = await firebaseService.login('citizen@example.com', 'password123');
        assert(citizenUser.role === 'citizen', 'Citizen login resolves role to citizen');

        const officerUser = await firebaseService.login('officer.ward52@gvmc.gov.in', 'password123');
        assert(officerUser.role === 'field_officer' && officerUser.assignedWard === 'Ward 52', 'Officer login resolves field_officer role & Ward 52 assignment');

        // Test 3: Accelerometer Engine Shock Calculation & Speed Filtering
        const engine = new AccelerometerEngine({ zThreshold: 2.2, minSpeedKmH: 15, maxSpeedKmH: 80 });
        const gForceHigh = engine.calculateGForce(38.2); // ~2.9g
        assert(gForceHigh >= 2.8 && gForceHigh <= 3.0, `Z-Axis g-Force calculation accurate (${gForceHigh.toFixed(2)}g)`);

        const isSpeedValid = engine.isValidSpeed(35);
        assert(isSpeedValid === true, 'Speed filter allows valid vehicle speed 35 km/h');

        const isSpeedInvalid = engine.isValidSpeed(5);
        assert(isSpeedInvalid === false, 'Speed filter rejects stationary/walking speed 5 km/h');

        // Test 4: Spatio-Temporal Deduplication Check (15m radius)
        engine.localCache.push({ lat: 17.7231, lng: 83.3012, timestamp: Date.now() });
        const isDup = engine.isDuplicate(17.72315, 83.30125); // ~6 meters away
        assert(isDup === true, 'Deduplication engine correctly flags impact within 15-meter radius');

        // Test 5: Pothole Status Stepper Workflow Transition
        const updatedItem = await firebaseService.updateStatus('PTH-1042', 'verified', 'Verified by Officer R. Sharma');
        assert(updatedItem.status === 'verified', 'Pothole #PTH-1042 successfully updated to Verified');

        // Test 6: System Configuration Update & Audit Log
        const newConfig = await firebaseService.updateConfig({ zThreshold: 1.8, minSpeedKmH: 10 });
        assert(newConfig.zThreshold === 1.8, 'Admin system config updated Z-threshold to 1.8g');

        console.log('===================================================');
        console.log(`   TEST SUMMARY: ${passed} PASSED, ${failed} FAILED       `);
        console.log('===================================================');

        return { passed, failed };
    } catch (err) {
        console.error('E2E Test Execution Error:', err);
        return { passed, failed, error: err };
    }
}

if (typeof window !== 'undefined') {
    window.runE2EVerifier = runE2EVerifier;
}
