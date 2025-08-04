// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCym4ODf9LmNiJi7oOXiUNmBd5DsNjUHPI",
  authDomain: "macwrite-280d0.firebaseapp.com",
  projectId: "macwrite-280d0",
  storageBucket: "macwrite-280d0.firebasestorage.app",
  messagingSenderId: "199900747857",
  appId: "1:199900747857:web:79a4ae9a3267015fb68070",
  measurementId: "G-EP9Z7Q8920"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Analytics only on client side and when supported
export const initAnalytics = async () => {
  if (typeof window !== 'undefined' && await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

export { app };