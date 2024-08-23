// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-dddba.firebaseapp.com",
  projectId: "real-estate-dddba",
  storageBucket: "real-estate-dddba.appspot.com",
  messagingSenderId: "692933131412",
  appId: "1:692933131412:web:6923d3fb1ff1f02dfd0881"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);