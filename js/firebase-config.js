import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDijnptDHnZzRI17SgbGq7WGlxr2TPJB10",
  authDomain: "gvmc-road-watch.firebaseapp.com",
  projectId: "gvmc-road-watch",
  storageBucket: "gvmc-road-watch.firebasestorage.app",
  messagingSenderId: "936374399743",
  appId: "1:936374399743:web:424ce276dac15b9768d2ca",
  measurementId: "G-DJNTPR5297"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
