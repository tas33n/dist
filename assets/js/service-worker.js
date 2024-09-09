const CACHE_NAME = "chika_web_app";

// URLs to be cached
const URLsToCache = [
  "/",
  "/pages/home",
  "/pages/about",
  "/assets/css/app.css",
  "/assets/js/app.js",
  "/assets/imgs/icon-192x192.png",
  "/assets/imgs/icon-512x512.png",
  "/assets/imgs/7btrrd.mp4",
];

// Install event
self.addEventListener("install", (event) => {
  self.skipWaiting();
  console.log("Service Worker: Installed");
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Service Worker: Removing old cache", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event
self.addEventListener("fetch", (event) => {
  if (URLsToCache.includes(new URL(event.request.url).pathname)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then((networkResponse) => {
            if (
              !networkResponse ||
              networkResponse.status !== 200 ||
              networkResponse.type !== "basic"
            ) {
              return networkResponse;
            }

            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
            return networkResponse;
          })
          .catch((error) => {
            console.error("Fetch failed:", error);
            // Optionally, handle failed fetch requests (e.g., return a fallback response)
          });
      })
    );
  }
});

// Listen for messages from clients
self.addEventListener("message", (event) => {
  if (event.data.action === "updateCache") {
    clearCacheAndReload();
  }
});

// Function to clear all caches and reload essential resources
function clearCacheAndReload() {
  caches
    .keys()
    .then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );
    })
    .then(() => {
      console.log("Service Worker: All caches cleared");

      caches
        .open(CACHE_NAME)
        .then((cache) => {
          return Promise.allSettled(
            URLsToCache.map((url) => {
              return fetch(url).then((response) => {
                if (!response.ok) {
                  throw new Error(`Failed to fetch ${url}`);
                }
                return cache.put(url, response);
              });
            })
          );
        })
        .then((results) => {
          const failedRequests = results.filter(
            (result) => result.status === "rejected"
          );
          if (failedRequests.length > 0) {
            console.warn("Some resources failed to cache:", failedRequests);
          } else {
            console.log("Service Worker: re-cached successfully");
          }

          // Step 3: Notify all clients to reload
          self.clients.matchAll().then((clients) => {
            clients.forEach((client) => {
              client.postMessage({ action: "reloadPage" });
            });
          });
        })
        .catch((error) => {
          console.error("Service Worker: Error during cache update", error);
        });
    });
}
