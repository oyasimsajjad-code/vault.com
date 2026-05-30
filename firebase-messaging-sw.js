importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCFXdmQSAHucGXZEX_GP2XKvi7qIZN6T1s",
  authDomain: "studyvault-1102b.firebaseapp.com",
  projectId: "studyvault-1102b",
  storageBucket: "studyvault-1102b.appspot.com",
  messagingSenderId: "380134237088",
  appId: "1:380134237088:web:a45afadf31dbf0db907ac5"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || 'StudyVault 🔔', {
    body: body || '',
    icon: icon || 'https://ui-avatars.com/api/?name=SV&background=7000ff&color=fff&size=128',
    badge: 'https://ui-avatars.com/api/?name=SV&background=7000ff&color=fff&size=64',
    data: payload.data || {},
    vibrate: [200, 100, 200],
    requireInteraction: false
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('studyvault') && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow('/');
    })
  );
});
