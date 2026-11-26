/**
 * NYC Teen Guide - Service Worker
 * Permette funzionamento offline e installazione come PWA
 */

const CACHE_NAME = 'nyc-teen-guide-v1.1';

// Install: Cache assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing v1.1...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching core assets');
        // Cache solo i file essenziali con percorsi relativi
        return cache.addAll([
          './',
          './index.html',
          './nyc-teen-app-secure.html',
          './places-database-500.js',
          './manifest.json',
          './lang/it.json',
          './lang/en.json',
          './lang/es.json',
          './lang/fr.json',
          './lang/de.json',
          './icons/icon-192.png',
          './icons/icon-512.png'
        ]);
      })
      .then(() => self.skipWaiting())
      .catch(err => console.log('[SW] Cache error:', err))
  );
});

// Activate: Clean old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip external requests (CDN, tiles, fonts, etc.)
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone and cache successful responses
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If HTML request and not in cache, return main page
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('./nyc-teen-app-secure.html');
          }
        });
      })
  );
});
