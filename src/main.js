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
window.addEventListener("touchstart", (event) => {
  console.log("touchstart pushed");
  if ("setAppBadge" in navigator) {
    navigator.setAppBadge(0);
  }
});

// アプリ内のどこかをタップしたときにバッジを消す
window.addEventListener("mousedown", (event) => {
  console.log("mousedown pushed");
  if ("setAppBadge" in navigator) {
    navigator.setAppBadge(0);
  }
});

createApp(App).use(router).mount("#app");
