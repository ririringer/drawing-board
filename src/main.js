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

document.addEventListener("visibilitychange", async () => {
  if (document.visibilityState === "visible") {
    console.log("changeVisibility fired");

    if ("setAppBadge" in navigator) {
      navigator.setAppBadge(0);
      await changeCacheBadgeCount(0);
    }
  }
});

async function changeCacheBadgeCount(count) {
  const CACHE_NAME = "app-state-cache";
  const cache = await caches.open(CACHE_NAME);
  const updatedContent = new Blob([JSON.stringify({ count })], {
    type: "application/json",
  });
  await cache.put(BADGE_COUNT_URL, new Response(updatedContent));
}

createApp(App).use(router).mount("#app");
