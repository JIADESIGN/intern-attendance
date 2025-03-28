// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2oJ8jFYAQJ1iLRFErQAlZyodp-dv5ifA",
  authDomain: "intern-attendance-c075a.firebaseapp.com",
  projectId: "intern-attendance-c075a",
  storageBucket: "intern-attendance-c075a.firebasestorage.app",
  messagingSenderId: "508930034142",
  appId: "1:508930034142:web:40e665f7afb49e4e64354f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };


