import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBTvZmmD2IfIqaHzy95_QhuT9EzzVRgNTE",
  authDomain: "lydia-stelin-wedding.firebaseapp.com",
  projectId: "lydia-stelin-wedding",
  storageBucket: "lydia-stelin-wedding.firebasestorage.app",
  messagingSenderId: "800207802142",
  appId: "1:800207802142:web:c22d45ae11dc9edd07830f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
