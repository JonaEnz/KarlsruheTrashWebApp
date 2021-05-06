// This is the service worker with the Cache-first network

const CACHE = "pwabuilder-precache";
const API_CACHE = "api-cache";

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  ({ url }) => url.hostname.startsWith("karlsruhe-trash.azurewebsites.net"),
  new workbox.strategies.NetworkFirst({
    cacheName: API_CACHE,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 5,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp("/*"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
      }),
    ],
  })
);
