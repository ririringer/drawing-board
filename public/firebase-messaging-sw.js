const FETCH_CACHE_PREFIX = "firebase-messaging-sw_";
const FETCH_CACHE_VERSION = "016";
const FETCH_CACHE_NAME = FETCH_CACHE_PREFIX + FETCH_CACHE_VERSION;
const contentToCache = ["/"];

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

// service-worker.js
self.addEventListener("install", (event) => {
  console.log("Service worker installing...");
  // キャッシュの初期化
  event.waitUntil(
    (async () => {
      const cache = await caches.open(FETCH_CACHE_NAME);
      console.log("[Service Worker] Caching all: app shell and content");
      return cache.addAll(contentToCache);
    })()
  );
});

self.addEventListener("fetch", (event) => {
  // GET 以外のリクエストでは、ブラウザーに既定のことをさせる
  if (event.request.method !== "GET") return;

  event.respondWith(
    (async () => {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        console.log("[Service Worker] Return from cash: " + event.request.url);
        return cachedResponse;
      }

      const response = await fetch(event.request).catch((error) => {
        console.error(`[Service Worker] Fetching failed: ${error}`);
      });
      const cache = await caches.open(FETCH_CACHE_NAME);
      await cache.put(event.request, response.clone()).catch((e) => {
        console.error("[Service Worker] Failed cashing: " + response);
      });
      return response;
    })()
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activating...");
  event.waitUntil(
    (async () => {
      const keyList = await caches.keys();
      return Promise.all(
        keyList.map((key) => {
          if (key.startsWith(FETCH_CACHE_PREFIX) && key !== FETCH_CACHE_NAME) {
            console.log("[Service Worker] delete unused cash: " + key);
            return caches.delete(key);
          }
        })
      );
    })()
  );
});

messaging.onBackgroundMessage(async (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const BADGE_COUNT_CACHE_NAME = "app-state-cache";
  const BADGE_COUNT_URL = "/badge-count.json";

  async function saveBadgeCount(count) {
    const cache = await caches.open(BADGE_COUNT_CACHE_NAME);
    const updatedContent = new Blob([JSON.stringify({ count })], {
      type: "application/json",
    });
    await cache.put(BADGE_COUNT_URL, new Response(updatedContent));
  }

  async function getBadgeCount() {
    const cache = await caches.open(BADGE_COUNT_CACHE_NAME);
    const response = await cache.match(BADGE_COUNT_URL);
    if (!response) return 0; // キャッシュが存在しない場合は0を返す
    const data = await response.json();
    return data.count;
  }

  if ("setAppBadge" in self.navigator) {
    try {
      const currentCount = await getBadgeCount();
      const newCount = currentCount + 1;
      await saveBadgeCount(newCount);
      console.log(newCount);

      await self.navigator.setAppBadge(newCount);
    } catch (error) {
      console.error("Error updating app badge:", error);
    }
  }
});
