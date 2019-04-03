const cacheName = 'mirabeau-smart-office-cache',
      urlsToCache = ['css/style-min.css', 'js/script.js']

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
      .catch(err => console.error(err))
  )
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response
        }

        return fetch(event.request).then(
          function(response) {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            var responseToCache = response.clone()

            caches.open(cacheName)
              .then(function(cache) {
                cache.put(event.request, responseToCache)
              })

            return response
          }
        )
      })
      .catch(err => console.error(err))
    )
})
