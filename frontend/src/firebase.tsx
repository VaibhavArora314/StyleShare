// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_KEY,
  authDomain:import.meta.env.DOMAIN ,
  projectId: import.meta.env.PROJECT_ID,
  storageBucket: "style-share-19dca.appspot.com",
  messagingSenderId: "1001984111526",
  appId:import.meta.env.APP_ID,
  measurementId: "G-E55W452MBQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
