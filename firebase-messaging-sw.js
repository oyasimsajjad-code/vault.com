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

messaging.onBackgroundMessage(function(payload) {
  const title = payload.notification?.title || 'StudyVault';
  const body  = payload.notification?.body  || '';
  self.registration.showNotification(title, {
    body:  body,
    icon:  '/icon-192.png',
    badge: '/icon-192.png'
  });
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://oyasimsajjad-code.github.io/vault.com/')
  );
});
