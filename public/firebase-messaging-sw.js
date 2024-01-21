const NAME = 'firebase-messaging-sw_';
const VERSION = '011';
const CACHE_NAME = NAME + VERSION;
const contentToCache = [
  "/",
];

importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: "AIzaSyAmaTRsmwyBPMk2TGBwMhwGKODrfO7MgvY",
    authDomain: "drawing-board-b1d22.firebaseapp.com",
    projectId: "drawing-board-b1d22",
    storageBucket: "drawing-board-b1d22.appspot.com",
    messagingSenderId: "504123299533",
    appId: "1:504123299533:web:b41ff116264fcc009e7b84",
    measurementId: "G-3LGX1YDT3N",
    type: "service_account",
    privateKeyId: "71dbe6593b9eb8785e3de74685b37c951dab8e82",
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC0mk4Twj7rKmYJ\nbi0KwekyI8xTiRaa93f79L2V8mRbuLQWUX5d65Rw2SAsCQ4t4RAzuRJLCdUAyfnW\nhP9CKhFHVksW1Q/7Rtluk0dKsRYkuhbJReCicteFybrkLwitJqZwWXWK9+2VmO+4\n6hVdDH8qglZULeQV/+iAJeCxgQakadjY3irFoF4gQg84kfTTmrS1jc4Ux1xpk8B3\njcTsKgQfryyL/SaZj/k/QdwACxL+ePFY1JfEhrJsMmh2WFwqZDPya+aY0aosb1QP\nZ2//g3xWnCK+wjMq2UIUO2Xf3ajdpaYubmK3oOBr0rWwGfF+4aZRYk8ZTA3DHDA9\no7wpJiS/AgMBAAECggEAAYftVREaQFQXPOYdwPbsvOugxDug0sMIDq8qqLSGNURl\nV8BsqAgNbod24sw7hTR8/ciWg44bjz/uLV0jQiRT0StwUi6Pv60cvkz/iUU4z0bk\nj+PIpJfkoSd8oMKP+gtXKkymD8TaRPXu7r3psjoCq7w/HVI7mhQj8cBgcsttNaeT\nesFGGzz9dooAj9vMx5p2J76oy3fwsBdQ5gNHW4BysxsOGGQxfdn1iwMFDdWOt2Fq\n2wUJDDUU5g9TiIXoXx0RneracIkU8v6Bz3g0RI/AUzfxIiBDMsgXR4GBjL0MoA69\n92/tyyUewO2Ri8KUDCXVFEDGTLE/FiMC8idjmpKPAQKBgQD2nIalATteAxRLbdYG\nVniSMiu+u6GjSp0RQudRUKTZhDQXbLbEo8s/SKJiqFtyM5NvBH9d3uLdh6GlvstG\nV29C42PwxK3mwbWYvkcUtVcVh9OFRRf1UZ+4RKmz5q2slhu07w4InqHQ5PWAfTDw\n7zsPt6kROp9OQ07s8IxJaA9vEQKBgQC7enVvnhqKKU234BJEkzEYE2RE2DG7+UdU\nRsu1S7zhswseLwORwp3jf/0993SYyGCWZzmMEEf7LSpyGF81GPL3dw7CS8I1dJoG\ny+WzNKkgN4SqCgUtSmWlB7tlxwrnFaeGXJvKjMyfyUaQVkiHFly0XAs22FSUxoPa\n7jeccuH2zwKBgQC+qgPbnNk2dTECpFe9rKspdMqne0+b/Pr0toI7NxtM5M6VccLY\nwz5HnjOWDU4uPDv3sEV84O8LkWpjx+BHcSAfWckSBC3jY86v2iUAmLdMeSgLOIEu\ndL4E7Gk8ItQRxDiFqfFyrpqy8+HvRltJW9yQ6VE4dddm3dkujUgZFPAh0QKBgFJP\nOGHx0wsXiTSSXtLWoLZGRT5ogKVbkzJwBp2pC9s3hUkSMQn8nN814RQkoX82chl2\nZnCU8VVYhgsjoiEou/tjvQoWwsQ/ViRnvohINXycg1U4Iv+4axniZCcSFTpRaoR2\nAjwSRwBcGOvjxeHxMnBI/O9uWOwcn+UtsyKv2X9HAoGAVQ44XMCXOKFRj/cqlIjQ\nd5dqt4hiRHtGCB8Rq1Zr5u0kkLADjVTl5yzyT7Udw9yV/w6XdmO0Kq/r7z5bb5Lk\nIrJOeY0v2MdTEuGIPib5hhRV6XJc1mf4HOiW2VIM/oNxSuDJRPKNk8sy5w0vyiDL\nDntfSjyda62gvTtzq2LXcgI=\n-----END PRIVATE KEY-----\n",
    clientEmail:
      "firebase-adminsdk-f9p2g@drawing-board-b1d22.iam.gserviceaccount.com",
    clientId: "110210589616577718452",
    authUri: "https://accounts.google.com/o/oauth2/auth",
    tokenUri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-f9p2g%40drawing-board-b1d22.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  });
}

console.log("test1");
const messaging = firebase.messaging();
console.log("test2");

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/keijiban_harigami_192x192.png",
  };
  console.log(self.registration);

  self.registration
    .showNotification(notificationTitle, notificationOptions)
    .then((e) => console.log("push notification:", e));
});

// service-worker.js
self.addEventListener("install", (event) => {
  console.log("Service worker installing...");
  // キャッシュの初期化
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME)
    console.log("[Service Worker] Caching all: app shell and content");
    return cache.addAll(contentToCache);
  })());
});

self.addEventListener("fetch", (event) => {
  event.respondWith((async () => {
    // GET 以外のリクエストでは、ブラウザーに既定のことをさせる
    if (event.request.method !== "GET") return;

    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) {
      console.log("[Service Worker] Return from cash: " + event.request.url);
      return cachedResponse;
    }

    const response = await fetch(event.request).catch((error) => {
      console.error(`[Service Worker] Fetching failed: ${error}`);
    });
    const cache = await caches.open(CACHE_NAME);
    await cache.put(event.request, response.clone()).catch(e=>{
      console.error("[Service Worker] Failed cashing: " + response);
    });
    return response
  })());
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activating...");
  event.waitUntil((async () => {
    const keyList = await caches.keys()
    return Promise.all(
      keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log("[Service Worker] delete unused cash: " + key);
          return caches.delete(key);
        }
      }),
    );
  })());
});

// self.addEventListener("push", (event) => {
//   const data = event.data.json(); // プッシュ通知のデータを取得
//   console.log("Push Notification:", data.message);
//   self.registration.showNotification(data.title, {
//     body: data.message,
//     icon: "/keijiban_harigami_192x192.png",
//   });
// });
