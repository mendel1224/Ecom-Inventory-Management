// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "ecom-inventory-managemen-3400e.firebaseapp.com",
  projectId: "ecom-inventory-managemen-3400e",
  storageBucket: "ecom-inventory-managemen-3400e.appspot.com",
  messagingSenderId: "143469690199",
  appId: "1:143469690199:web:3c6fb4e97cdced3ed61212",
  measurementId: "G-97H3NGNYX4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firestore = getFirestore(app);
export { firestore };

