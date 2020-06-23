importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyC3snN-ginnoX5KmXwtKKNw1Qwsb0rn6q8",
    authDomain: "pushnotification-1a2bc.firebaseapp.com",
    databaseURL: "https://pushnotification-1a2bc.firebaseio.com",
    projectId: "pushnotification-1a2bc",
    storageBucket: "pushnotification-1a2bc.appspot.com",
    messagingSenderId: "317074961759",
    appId: "1:317074961759:web:6093f6cc566d6224a332ea",
    measurementId: "G-TYY20MF1SQ"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notifice here
    const notificationTitle = 'You have a messaging!';
    const notificationOptions = {
        body: 'Information a messaging.',
        icon: '/icon.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});
