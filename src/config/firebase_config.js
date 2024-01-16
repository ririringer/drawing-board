import { initializeApp } from "firebase/app";
import firebaseSetting from "../../resources/firebaseApiKey.json";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";
import { getFunctions } from "firebase/functions";

export const firebaseConfig = initializeApp(firebaseSetting);
export const firestore = getFirestore(firebaseConfig);
export const messaging = getMessaging(firebaseConfig);
const functions = getFunctions(firebaseConfig);
