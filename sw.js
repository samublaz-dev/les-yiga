const CACHE_NAME = "les-yiga-v1";

const FILES_TO_CACHE = [
    "/les-yiga/",
    "/les-yiga/index.html",
    "/les-yiga/manifest.json"
];


self.addEventListener(
    "install",
    function(event) {

        event.waitUntil(
            caches.open(CACHE_NAME)
            .then(function(cache) {

                return cache.addAll(
                    FILES_TO_CACHE
                );

            })
        );

        self.skipWaiting();

    }
);


self.addEventListener(
    "activate",
    function(event) {

        event.waitUntil(
            self.clients.claim()
        );

    }
);


self.addEventListener(
    "fetch",
    function(event) {

        event.respondWith(
            fetch(event.request)
            .catch(function() {

                return caches.match(
                    event.request
                );

            })
        );

    }
);
