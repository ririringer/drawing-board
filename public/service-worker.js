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
