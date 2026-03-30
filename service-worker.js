const CACHE_NAME="rm-cache-v1";
const urlsToCache=[".","index.html","style.css","script.js","manifest.json"];

self.addEventListener('install', e=>{ e.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(urlsToCache)))});
self.addEventListener('activate', e=>{ console.log("Service Worker ativado!");});
self.addEventListener('fetch', e=>{
    e.respondWith(caches.match(e.request).then(resp=>resp || fetch(e.request)));
});