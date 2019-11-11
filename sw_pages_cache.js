const CACHE_NAME = `CoinGeckoApp_V_${Date.now()}`;
const cacheFiles = [
    '/',
    '/styles.css',
    '/index.js',
    '/images/logoCrypto.png',
    '/CSS/switch.css',
    '/JS/card_render.js',
    '/JS/init_Display.js',
    '/JS/more_info_render.js',
    './Lib/css/bootstrap/bootstrap.min.css',
    './Lib/css/fontawesome/css/all.css',
    './Lib/js/jquery-3.4.1.min.js',
    './Lib/js/bootstrap/bootstrap.bundle.min.js',

];

self.addEventListener('install', function(e) {
    console.log('TCL: install event', e)
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
    console.log('TCL: activate event', e)
        //clear old caches
    e.waitUntil(caches.keys().then((cacheNames) => {
        return Promise.all(
            cacheNames.map((cacheName) => {
                if (cacheName != CACHE_NAME) {
                    console.info('clearing old cache:', cacheName)
                    return caches.delete(cacheName);
                }
            })
        );
    }));
});

//intercept fetch events and manage
// self.addEventListener('fetch', e => {
//     console.info('fetch event detected', e);
//     fetch(e.request)
//         .catch(err => {
//             console.error('SW failed to aquire connection: ', err)
//             caches.match(e.request)
//         });
// });

//cache whole site
self.addEventListener('fetch', e => {
    console.info('fetch event detected:', e.request.url, e.request);
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