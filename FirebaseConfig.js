// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVG56pTO4nZFuW0PfNwcdXAJPAietgrHY",
  authDomain: "travel-planning-3b7cd.firebaseapp.com",
  projectId: "travel-planning-3b7cd",
  storageBucket: "travel-planning-3b7cd.firebasestorage.app",
  messagingSenderId: "320982103704",
  appId: "1:320982103704:web:ae0c7140131dbb5a8842ed",
  measurementId: "G-ZZTDX2MKGE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);