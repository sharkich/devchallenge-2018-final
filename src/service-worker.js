const APP_CACHE_NAME = 'final-app-6-1';

const FILES_TO_CACHE = [
  // '/',
  // '/index.html',
  // '/404.html',
  // General App
  '/runtime.js',
  '/polyfills.js',
  // '/styles.js',
  '/styles.css',
  // '/vendor.js',
  '/main.js',
  '/service-worker.js',
  '/favicon.ico',
  '/assets/icons/icon-72x72.png',
  '/assets/icons/icon-96x96.png',
  '/assets/icons/icon-128x128.png',
  '/assets/icons/icon-144x144.png',
  '/assets/icons/icon-152x152.png',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-256x256.png',
  '/assets/icons/icon-384x384.png',
  '/assets/icons/icon-512x512.png',
  '/assets/google-icons-font.woff2'
];

self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(APP_CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(FILES_TO_CACHE)
          .then((res) => {
            console.log('res', res);
            return self.skipWaiting();
          });
      })
      .catch((err) => {
        console.log('err', err);
        return Promise.reject(err);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  console.log('[ServiceWorker] Fetch', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
      .catch((err) => {
        console.log('err', err);
        return Promise.reject(err);
      })
  );
});