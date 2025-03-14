/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/webfavicon.png',
        '/fonts/Inter.woff2',
        '/social-share-image.png'
      ]);
    })
  );
}); 