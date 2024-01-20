import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

navigator.serviceWorker
  .register("/firebase-messaging-sw.js")
  .then((registration) => {
    console.log("SW registered: ", registration);
  })
  .catch((registrationError) => {
    console.log("SW registration failed: ", registrationError);
  });

// アプリ内のどこかをタップしたときにバッジを消す
window.addEventListener("touchstart", async (event) => {
  console.log("touchstart pushed");
  if ("setAppBadge" in navigator) {
    navigator.setAppBadge(0);

    const cache = await caches.open(CACHE_NAME);
    const updatedContent = new Blob([JSON.stringify({ count })], {
      type: "application/json",
    });
    await cache.put(BADGE_COUNT_URL, new Response(updatedContent));
  }
});

// アプリ内のどこかをタップしたときにバッジを消す
window.addEventListener("mousedown", (event) => {
  console.log("mousedown pushed");
  if ("setAppBadge" in navigator) {
    navigator.setAppBadge(0);
  }
});

window.addEventListener("focus", () => {
  console.log("focus fired");
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    console.log("changeVisibility fired");
  }
});

createApp(App).use(router).mount("#app");
