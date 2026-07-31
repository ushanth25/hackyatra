/**
 * GVMC Road Watch - PWA Registration & Install Prompt Handler (Section 13.7)
 */

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('[PWA] Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.warn('[PWA] Service Worker registration failed:', error);
            });
    });
}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('[PWA] App installation prompt available');
});
