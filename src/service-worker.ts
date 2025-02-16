self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/logo-swtlabs.png',
        '/fonts/Inter.woff2'
      ]);
    })
  );
}); 