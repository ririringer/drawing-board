import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

navigator.serviceWorker
  .register("/service-worker.js")
  .then((registration) => {
    console.log("SW registered: ", registration);
  })
  .catch((registrationError) => {
    console.log("SW registration failed: ", registrationError);
  });

createApp(App).use(router).mount("#app");
