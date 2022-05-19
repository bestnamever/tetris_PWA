var cacheStorageKey = 'Tetris'

var cacheList = [
    '/',
    "index.html",
    "image/tetris.png"
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheStorageKey)
            .then(cache => cache.addAll(cacheList))
            .then(() => self.skipWaiting())
    )
})

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            if (response != null) {
                return response
            }
            return fetch(e.request.url)
        })
    )
})

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});