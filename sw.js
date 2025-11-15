self.addEventListener('install', event => {
    console.log('Service Worker instalado');
    self.skipWaiting();
});
self.addEventListener('fetch', () => {});