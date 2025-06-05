const CACHE_NAME = 'ukushuka-cache-v1'; // Имя вашего кэша
const urlsToCache = [
  '/',
  '/index.html',
  // Добавьте сюда другие важные статические файлы, которые должны быть доступны офлайн
  // Например: '/static/js/bundle.js', '/static/css/main.css', '/ukushuka-logo.png'
  // Эти пути могут отличаться в зависимости от вашей сборки React-приложения
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Открыт кэш');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Если запрос есть в кэше, отдаем его
        if (response) {
          return response;
        }
        // Иначе делаем сетевой запрос
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Удаляем старые кэши
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});