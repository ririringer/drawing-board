import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

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
  const BADGE_COUNT_URL = "/badge-count.json";
  const cache = await caches.open(CACHE_NAME);
  const updatedContent = new Blob([JSON.stringify({ count })], {
    type: "application/json",
  });
  await cache.put(BADGE_COUNT_URL, new Response(updatedContent));
}

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(router).use(vuetify).mount("#app");
