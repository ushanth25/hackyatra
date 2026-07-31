/**
 * GVMC Road Watch - Unified Firestore Client & Auth Service (Section 4 & 9)
 * Interoperable Data Store for Local Prototype & Cloud Sync
 */

// Memory Store fallback for Node runtime testing
const memoryStore = {};

export function storageGet(key) {
    if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(key);
    }
    return memoryStore[key] || null;
}

export function storageSet(key, val) {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, val);
    } else {
        memoryStore[key] = val;
    }
}

function storageRemove(key) {
    if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
    } else {
        delete memoryStore[key];
    }
}

export class FirebaseService {
    constructor() {
        this.storageKeyPotholes = 'gvmc_potholes_db';
        this.storageKeyUser = 'gvmc_current_user';
        this.storageKeyLogs = 'gvmc_audit_logs';
        this.storageKeyConfig = 'gvmc_system_config';
        
        this.initDefaultData();
    }

    initDefaultData() {
        if (!storageGet(this.storageKeyPotholes)) {
            const initialPotholes = [
                {
                    id: 'PTH-1042',
                    latitude: 17.7231,
                    longitude: 83.3012,
                    road: 'Beach Road, Nr Kali Temple',
                    ward: 'Ward 52',
                    source: 'Auto-Detect (Z-Shock)',
                    severity: 'high',
                    peakGForce: 2.9,
                    confidenceScore: 90,
                    status: 'detected',
                    reporterId: 'USR-8821',
                    createdAt: new Date().toISOString(),
                    confirmations: 3
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
                    createdAt: new Date().toISOString(),
                    confirmations: 1
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
                    reporterId: 'USR-7731',
                    createdAt: new Date().toISOString(),
                    confirmations: 2
                }
            ];
            storageSet(this.storageKeyPotholes, JSON.stringify(initialPotholes));
        }

        if (!storageGet(this.storageKeyConfig)) {
            const defaultConfig = {
                zThreshold: 2.2,
                minSpeedKmH: 15,
                maxSpeedKmH: 80,
                dedupRadiusMeters: 15,
                highSlaDays: 3,
                standardSlaDays: 5
            };
            storageSet(this.storageKeyConfig, JSON.stringify(defaultConfig));
        }
    }

    // --- AUTH OPERATIONS (Section 5) ---

    async login(email, password) {
        let role = 'citizen';
        if (email.includes('gvmc.gov.in') || email.includes('officer')) role = 'field_officer';
        if (email.includes('admin') || email.includes('commissioner')) role = 'admin';

        const user = {
            uid: 'USR-' + Math.floor(1000 + Math.random() * 9000),
            email,
            role,
            assignedWard: role === 'field_officer' ? 'Ward 52' : null
        };
        storageSet(this.storageKeyUser, JSON.stringify(user));
        return user;
    }

    async getCurrentUser() {
        const raw = storageGet(this.storageKeyUser);
        return raw ? JSON.parse(raw) : null;
    }

    async logout() {
        storageRemove(this.storageKeyUser);
    }

    // --- POTHOLE CRUD OPERATIONS (Section 4 & 9) ---

    async getPotholes(filters = {}) {
        const raw = storageGet(this.storageKeyPotholes);
        let list = raw ? JSON.parse(raw) : [];

        if (filters.ward) {
            list = list.filter(p => p.ward === filters.ward);
        }
        if (filters.status) {
            list = list.filter(p => p.status === filters.status);
        }
        return list;
    }

    async getPotholeById(id) {
        const list = await this.getPotholes();
        return list.find(p => p.id === id) || null;
    }

    async createReport(reportData) {
        const list = await this.getPotholes();
        const newIncident = {
            id: 'PTH-' + Math.floor(1000 + Math.random() * 9000),
            confirmations: 1,
            createdAt: new Date().toISOString(),
            status: 'detected',
            ...reportData
        };
        list.unshift(newIncident);
        storageSet(this.storageKeyPotholes, JSON.stringify(list));
        
        await this.addAuditLog(`Created incident report #${newIncident.id}`, newIncident.id);
        return newIncident;
    }

    async updateStatus(id, newStatus, notes = '') {
        const list = await this.getPotholes();
        const index = list.findIndex(p => p.id === id);
        if (index !== -1) {
            list[index].status = newStatus;
            list[index].updatedAt = new Date().toISOString();
            if (notes) list[index].notes = notes;
            
            storageSet(this.storageKeyPotholes, JSON.stringify(list));
            await this.addAuditLog(`Status updated to ${newStatus}`, id);
            return list[index];
        }
        throw new Error('Pothole ID not found');
    }

    // --- AUDIT LOGS (Section 10) ---

    async addAuditLog(action, targetId) {
        const raw = storageGet(this.storageKeyLogs);
        const logs = raw ? JSON.parse(raw) : [];
        const user = await this.getCurrentUser();

        logs.unshift({
            id: 'LOG-' + Date.now(),
            action,
            targetId,
            actor: user ? user.email : 'System Auto-Detect',
            timestamp: new Date().toISOString()
        });

        storageSet(this.storageKeyLogs, JSON.stringify(logs));
    }

    // --- SYSTEM CONFIG (Section 7 & 8) ---

    async getConfig() {
        const raw = storageGet(this.storageKeyConfig);
        return raw ? JSON.parse(raw) : {};
    }

    async updateConfig(newConfig) {
        storageSet(this.storageKeyConfig, JSON.stringify(newConfig));
        await this.addAuditLog('Updated accelerometer & SLA system configuration', 'CONFIG');
        return newConfig;
    }
}

export const firebaseService = new FirebaseService();
