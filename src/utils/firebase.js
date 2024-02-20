import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "fastapi-7931f.firebaseapp.com",
  projectId: "fastapi-7931f",
  storageBucket: "fastapi-7931f.appspot.com",
  messagingSenderId: "411230464671",
  appId: "1:411230464671:web:7676523aa7b61e7377d0aa",
  measurementId: "G-HEV8PD9QNM",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
