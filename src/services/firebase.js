import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAw72MM20jtK-kAdeSZjYruEaIuzNb-3Zk",
  authDomain: "passwords-dashboard.firebaseapp.com",
  projectId: "passwords-dashboard",
  storageBucket: "passwords-dashboard.firebasestorage.app",
  messagingSenderId: "215360992499",
  appId: "1:215360992499:web:93e8c36d13f8a8292cb386",
  measurementId: "G-B2DSYXF4J9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
