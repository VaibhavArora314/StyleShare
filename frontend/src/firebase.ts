import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCbCO0gIc0-0fXRNyE5IFtDQP1TveFoCko",
  authDomain: "styleshare-18b7d.firebaseapp.com",
  projectId: "styleshare-18b7d",
  storageBucket: "styleshare-18b7d.appspot.com",
  messagingSenderId: "219338980290",
  appId: "1:219338980290:web:bcd0b62580593b4ba2345b",
  measurementId: "G-YL8CTBCE71"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);