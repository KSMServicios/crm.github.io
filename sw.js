const CACHE_NAME = "crm-radio-cache-v2";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/manifest.json",
  "/src/main.js",
  "/src/data/stations.json",
  "/img/df.png",
  "/img/ksm.png"
];

// Instalar y pre-cachear recursos estáticos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Pre-cacheando recursos estáticos");
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activar y limpiar cachés antiguas
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log("[SW] Eliminando caché antigua:", name);
            return caches.delete(name);
          })
      );
    })
  );
  self.clients.claim();
});

// Interceptar peticiones fetch
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // 1. Evitar interceptar streams de audio (CORS / Live streams)
  if (url.pathname.match(/\.(mp3|aac|m4a)$/) || event.request.url.includes("zeno.fm") || event.request.url.includes("stream")) {
    return; // Dejar pasar la petición nativa directamente a la red
  }

  // 2. Network-First para stations.json (para obtener siempre emisoras actualizadas si hay red)
  if (url.pathname.includes("stations.json")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clonedResponse));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // 3. Cache-First (Stale-While-Revalidate) para imágenes estáticas y assets PWA
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // Solo cachear peticiones exitosas del mismo origen
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === "basic") {
          const clonedResponse = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clonedResponse));
        }
        return networkResponse;
      }).catch(() => {
        // Fallback offline si falla la red
      });

      return cachedResponse || fetchPromise;
    })
  );
});
