/**
 * GVMC Road Watch - Demo Seeding Dataset (Section 13.9)
 * Pre-seeds realistic Visakhapatnam pilot ward data into local storage & memory
 */

export const DEMO_POTHOLES = [
    {
        id: 'PTH-1042',
        latitude: 17.7231,
        longitude: 83.3012,
        road: 'Beach Road, Nr Kali Temple',
        ward: 'Ward 52',
        source: 'Auto Accelerometer (Z-Shock)',
        severity: 'high',
        peakGForce: 2.9,
        confidenceScore: 92,
        status: 'detected',
        reporterId: 'USR-8821',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
        confirmations: 4,
        imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=60'
    },
    {
        id: 'PTH-1041',
        latitude: 17.7210,
        longitude: 83.2980,
        road: 'Siripuram Circle Main Rd',
        ward: 'Ward 52',
        source: 'Manual Photo Report',
        severity: 'medium',
        peakGForce: 1.8,
        confidenceScore: 85,
        status: 'assigned',
        reporterId: 'USR-9012',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 hours ago
        confirmations: 2,
        imageUrl: 'https://images.unsplash.com/photo-1584463699966-2ef1240375cf?w=600&auto=format&fit=crop&q=60'
    },
    {
        id: 'PTH-1039',
        latitude: 17.7255,
        longitude: 83.3040,
        road: 'VIP Road, Lane 4',
        ward: 'Ward 52',
        source: 'Auto Accelerometer (Z-Shock)',
        severity: 'high',
        peakGForce: 3.2,
        confidenceScore: 96,
        status: 'assigned',
        reporterId: 'USR-7731',
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(), // 12 hours ago
        confirmations: 5,
        imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=60'
    },
    {
        id: 'PTH-1035',
        latitude: 17.7260,
        longitude: 83.3050,
        road: 'Waltair Main Road',
        ward: 'Ward 52',
        source: 'Manual Photo Report',
        severity: 'low',
        peakGForce: 1.2,
        confidenceScore: 70,
        status: 'repaired',
        reporterId: 'USR-6120',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
        repairedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        confirmations: 1,
        imageUrl: 'https://images.unsplash.com/photo-1584463699966-2ef1240375cf?w=600&auto=format&fit=crop&q=60'
    },
    {
        id: 'PTH-1020',
        latitude: 17.6900,
        longitude: 83.2100,
        road: 'Gajuwaka Main Highway',
        ward: 'Ward 40',
        source: 'Auto Accelerometer (Z-Shock)',
        severity: 'high',
        peakGForce: 4.1,
        confidenceScore: 98,
        status: 'detected',
        reporterId: 'USR-3312',
        createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
        confirmations: 8,
        imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=60'
    }
];

import { storageSet } from './firebase-service.js';

export function seedDemoData() {
    storageSet('gvmc_potholes_db', JSON.stringify(DEMO_POTHOLES));
    console.log('[SEED] Successfully pre-seeded demo dataset with 5 realistic potholes across Ward 52 & Ward 40.');
}

if (typeof window !== 'undefined') {
    window.seedDemoData = seedDemoData;
}
