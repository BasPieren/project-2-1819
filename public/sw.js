const cacheName = 'mirabeau-smart-office-cache',
      urlsToCache = ['css/style.css', 'js/script.js']

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
      .catch(err => console.error(err))
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response
        }

        return fetch(event.request)
        .then(response => {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            var responseToCache = response.clone()

            caches.open(cacheName)
              .then(cache => {
                cache.put(event.request, responseToCache)
              })

            return response
          }
        )
      })
      .catch(err => console.error(err))
    )
})
