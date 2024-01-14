// service-worker.js
self.addEventListener("install", (event) => {
  console.log("Service worker installing...");
  // ここでキャッシュの初期化などを行う
});

self.addEventListener("fetch", (event) => {
  console.log("Fetching:", event.request.url);
  // ここでキャッシュからファイルを提供するロジックを実装する
});
