<template>
  <button @click="requestNotificationPermission">通知を許可</button>
</template>

<script>
import { getToken } from "firebase/messaging";
import { messaging } from "../config/firebase_config";
import { getFunctions, httpsCallable } from "firebase/functions";

export default {
  methods: {
    requestNotificationPermission() {
      Notification.requestPermission()
        .then((permission) => {
          if (permission === "granted") {
            console.log("Notification permission granted.");
            this.getAndSubscribeToken();
          }
        })
        .catch((err) => {
          console.error("Error requesting permission: ", err);
        });
    },
    getAndSubscribeToken() {
      getToken(messaging, {
        vapidKey:
          "BH8GZqS8nQ__4pSOkTXit4sQcuSAHItUDr7xEWn_qeUf0SK3QOsCK0bYnC0ajh0-NoM6jmjm_eV8XrnvTsJe9is",
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log("Token:", currentToken);
            this.subscribeDeviceToTopic(currentToken);
          }
        })
        .catch((err) => {
          console.error("Error getting token: ", err);
        });
    },
    subscribeDeviceToTopic(token) {
      const functions = getFunctions();
      const subscribeToTopic = httpsCallable(functions, "addMessage");
      subscribeToTopic({ token })
        .then((result) => {
          console.log("Subscribed to topic:", result.data.message);
        })
        .catch((error) => {
          console.error("Error subscribing to topic: ", error);
        });
    },
  },
};
</script>
