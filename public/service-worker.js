importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const messaging = firebase.messaging();

messaging
  .onBackgroundMessage((payload) => {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
      body: "Background Message body.",
      icon: "/keijiban_hargami_192x192.png",
    };
    console.log(self.registration);

    self.registration
      .showNotification(notificationTitle, notificationOptions)
      .then((e) => console.log("push notification:", e));
  })
  .catch((e) => console.log(e));

// service-worker.js
self.addEventListener("install", (event) => {
  console.log("Service worker installing...");
  // ここでキャッシュの初期化などを行う
});

self.addEventListener("fetch", (event) => {
  // console.log("Fetching:", event.request.url);
  // ここでキャッシュからファイルを提供するロジックを実装する
});

// self.addEventListener("push", (event) => {
//   const data = event.data.json(); // プッシュ通知のデータを取得
//   console.log("Push Notification:", data.message);
//   self.registration.showNotification(data.title, {
//     body: data.message,
//     icon: "/keijiban_harigami_192x192.png",
//   });
// });
