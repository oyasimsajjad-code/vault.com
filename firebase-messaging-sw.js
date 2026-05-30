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

// Background message handler
messaging.onBackgroundMessage(function(payload) {
    const { title, body, icon, data } = payload.notification || payload.data || {};
    const notificationTitle = title || 'StudyVault 📚';
    const notificationOptions = {
        body: body || '',
        icon: icon || 'https://ui-avatars.com/api/?name=SV&background=7000ff&color=fff&size=128',
        badge: 'https://ui-avatars.com/api/?name=SV&background=7000ff&color=fff&size=64',
        data: data || payload.data || {},
        vibrate: [200, 100, 200],
        requireInteraction: false,
        actions: payload.data && payload.data.type === 'message' ? [
            { action: 'open', title: 'Open' }
        ] : []
    };
    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Click handler
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients) {
            for (let client of windowClients) {
                if (client.url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});
