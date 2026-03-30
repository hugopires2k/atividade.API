const CACHE_NAME = "rick-morty-cache-v1";
const urlsToCache = [
  ".",
  "index.html",
  "style.css",
  "script.js",
  "manifest.json"
];

// Instalando SW e cacheando arquivos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

// Ativando SW
self.addEventListener('activate', event => {
    console.log("Service Worker ativado!");
});

// Interceptando requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(resp => resp || fetch(event.request))
    );
});