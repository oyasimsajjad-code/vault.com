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
    const notifTitle = payload.notification?.title || payload.data?.title || 'StudyVault';
    const notifOptions = {
        body: payload.notification?.body || payload.data?.body || '',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: payload.data?.tag || 'sv-push-' + Date.now(),
        data: payload.data || {},
        actions: [{ action: 'open', title: 'Open' }],
        requireInteraction: false,
        vibrate: [200, 100, 200]
    };
    self.registration.showNotification(notifTitle, notifOptions);
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
            for (let client of windowClients) {
                if (client.url && 'focus' in client) { client.focus(); return; }
            }
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});
