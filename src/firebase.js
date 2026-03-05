import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAp1mtiuCSiC6u9qQDAIp1TL_xD111EZoI",
  authDomain: "bugununtarihi-f5025.firebaseapp.com",
  projectId: "bugununtarihi-f5025",
  storageBucket: "bugununtarihi-f5025.firebasestorage.app",
  messagingSenderId: "14193296316",
  appId: "1:14193296316:web:4e88c527f3e810dc44e1b9",
  measurementId: "G-4RXN2LF60H",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
