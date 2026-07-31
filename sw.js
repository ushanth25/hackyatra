/**
 * GVMC Road Watch - Service Worker (Section 13.7)
 * Offline Asset Caching & Zero-Network Resiliency
 */

const CACHE_NAME = 'gvmc-road-watch-v1';
const STATIC_ASSETS = [
    '/',
    '/citizen_home.html',
    '/auto_detect_active.html',
    '/report_pothole.html',
    '/my_reports.html',
    '/report_detail.html',
    '/citizen_profile.html',
    '/citizen_offline_sync.html',
    '/officer_login.html',
    '/officer_overview.html',
    '/gis_map.html',
    '/reports_list.html',
    '/pothole_detail.html',
    '/admin_overview.html',
    '/admin_officers.html',
    '/admin_settings.html',
    '/js/firebase-service.js',
    '/js/accelerometer-engine.js',
    '/js/app-controller.js',
    '/js/demo-seed-data.js',
    '/manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Pre-caching offline static assets');
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[SW] Clearing old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).catch(() => {
                // If offline and requesting HTML, fallback to offline sync view
                if (event.request.headers.get('accept').includes('text/html')) {
                    return caches.match('/citizen_offline_sync.html');
                }
            });
        })
    );
});
