import { initializeApp } from "firebase/app";
import firebaseSetting from "../../resources/firebaseApiKey.json";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = initializeApp(firebaseSetting);
export const firestore = getFirestore(firebaseConfig);
