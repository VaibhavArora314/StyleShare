// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_KEY,
  authDomain: "style-share-19dca.firebaseapp.com",
  projectId: "style-share-19dca",
  storageBucket: "style-share-19dca.appspot.com",
  messagingSenderId: "1001984111526",
  appId: "1:1001984111526:web:cff4ebb77b722bb7fa1567",
  measurementId: "G-E55W452MBQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
