const CACHE_NAME = `CoinGeckoApp_V_${Date.now()}`;
const cacheFiles = [
    '/',
    '/CSS/switch.css',
    '/JS/Graph_Render.js',
    '/JS/card_render.js',
    '/JS/db_handler.js',
    '/JS/init_Display.js',
    '/JS/more_info_render.js',
    '/JS/track_card_render.js',
    '/Lib/css/bootstrap/bootstrap.min.css',
    '/Lib/css/fontawesome/css/all.css',
    '/Lib/css/fontawesome/webfonts/fa-solid-900.woff2',
    '/Lib/js/bootstrap/bootstrap.bundle.min.js',
    '/Lib/js/dexie.js',
    '/Lib/js/jquery-3.4.1.min.js',
    '/images/logoCrypto.png',
    '/index.html',
    '/index.js',
    '/styles.css',

];

self.addEventListener('install', function(e) {
    // console.log('TCL: install event', e)
        // Perform install steps
    e.waitUntil(
        caches
        .open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(cacheFiles);
        })
        .then(() => self.skipWaiting())
        .catch(err => console.error('SW installation error: ', err))
    );
});

self.addEventListener('activate', e => {
    // console.log('TCL: activate event', e)
    //clear old caches
    e.waitUntil(caches.keys()
        .then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // console.log("TCL: CACHE_NAME", CACHE_NAME)
                    if (cacheName != CACHE_NAME) {
                        // console.info('clearing old cache:', cacheName)
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );

});

//cache whole site
self.addEventListener('fetch', e => {
    // console.info('fetch event detected:', e.request.url, e.request);
    e.respondWith(fetch(e.request)
        .then(res => {
            //clone response
            const resClone = res.clone();
            //open cache and store
            caches
                .open(CACHE_NAME)
                .then(cache => {
                    cache.put(e.request, resClone)
                })
            return res;
        })
        .catch(err => {
            caches
                .match(e.request)
                .then(res => res)
        })
    )
});