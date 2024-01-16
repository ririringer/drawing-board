import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { getToken } from "firebase/messaging";
import { messaging } from "./config/firebase_config";
import { getFunctions, httpsCallable } from "firebase/functions";

const TOPIC_NAME = "testTopic";

function subscribeDeviceToTopic(token) {
  console.log("token:", token);
  const functions = getFunctions();
  const subscribeToTopic = httpsCallable(functions, "addMessage");
  subscribeToTopic({ token })
    .then((result) => {
      console.log("succeeded");
      console.log(result.data.message);
    })
    .catch((error) => {
      console.error("Error subscribing to topic:", error);
    });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
    navigator.serviceWorker.register("/firebase-messaging-sw.js").then(() => {
      getToken(messaging, {
        vapidKey:
          "BH8GZqS8nQ__4pSOkTXit4sQcuSAHItUDr7xEWn_qeUf0SK3QOsCK0bYnC0ajh0-NoM6jmjm_eV8XrnvTsJe9is",
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log("token:", currentToken);
            subscribeDeviceToTopic(currentToken);
            // Send the token to your server and update the UI if necessary
            // ...
          } else {
            // Show permission request UI
            console.log(
              "No registration token available. Request permission to generate one."
            );
            console.log("Requesting permission...");
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                console.log("Notification permission granted.");
                navigator.serviceWorker.ready.then((p) => {
                  p.pushManager.getSubscription().then((subscription) => {
                    if (subscription === null) {
                      //通知の購読が存在しない場合は登録する。
                      let re = p.pushManager.subscribe({
                        userVisibleOnly: true,
                      });
                    }
                  });
                });
              }
            });
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
          // ...
        });
    });
  });
}

createApp(App).use(router).mount("#app");
