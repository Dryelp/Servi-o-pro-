const CACHE = 'autonomopro-v7';
// Atualizar este número a cada novo deploy para forçar atualização nos dispositivos
const FILES = ['./index.html','./manifest.json','./icon-192.png','./icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Network first — tenta buscar versão nova, cai no cache só se offline
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

// Push notification handler
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : { title: 'AutônomoPro', body: 'Nova notificação' };
  e.waitUntil(self.registration.showNotification(data.title, {
    body: data.body,
    icon: './icon-192.png',
    badge: './icon-192.png',
    vibrate: [200, 100, 200],
    tag: data.tag || 'autonomopro',
    requireInteraction: data.requireInteraction || false
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('./'));
});

// Background sync for notifications
self.addEventListener('message', e => {
  // Comando de atualização forçada
  if(e.data && e.data.type === 'SKIP_WAITING'){
    self.skipWaiting();
    return;
  }
  if (e.data && e.data.type === 'NOTIFY') {
    self.registration.showNotification(e.data.title, {
      body: e.data.body,
      icon: './icon-192.png',
      badge: './icon-192.png',
      vibrate: [200, 100, 200],
      tag: e.data.tag || 'ap-' + Date.now()
    });
  }
});
