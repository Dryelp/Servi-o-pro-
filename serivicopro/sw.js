const CACHE = 'autonomopro-v27';
const FILES = [
  './index.html',
  './orcamento.html',
  './favicon.svg',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './badge-96.png'
];

const NOTIF_ICON = './icon-192.png';
const NOTIF_BADGE = './badge-96.png';

function notificationOptions(data = {}) {
  return {
    body: data.body || '',
    icon: data.icon || NOTIF_ICON,
    badge: data.badge || NOTIF_BADGE,
    vibrate: data.vibrate || [80, 40, 80],
    tag: data.tag || 'autonomopro',
    renotify: false,
    requireInteraction: !!data.requireInteraction,
    timestamp: Date.now(),
    data: { url: data.url || './' },
    actions: data.actions || [{ action: 'open', title: 'Abrir AutônomoPro' }]
  };
}

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

self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {
    title: 'AutônomoPro',
    body: 'Você tem uma nova atualização.'
  };
  e.waitUntil(
    self.registration.showNotification(data.title || 'AutônomoPro', notificationOptions(data))
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const targetUrl = e.notification.data?.url || './';
  e.waitUntil(clients.openWindow(targetUrl));
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
    return;
  }
  if (e.data && e.data.type === 'NOTIFY') {
    self.registration.showNotification(e.data.title || 'AutônomoPro', notificationOptions({
      body: e.data.body,
      tag: e.data.tag || 'ap-' + Date.now(),
      url: e.data.url || './'
    }));
  }
});
