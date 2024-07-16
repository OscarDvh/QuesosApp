// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvOhdYEvxZ4u0hxcHtEu1DYWJbwIEIHe8",
  authDomain: "pruebanc-5ee45.firebaseapp.com",
  projectId: "pruebanc-5ee45",
  storageBucket: "pruebanc-5ee45.appspot.com",
  messagingSenderId: "397283805044",
  appId: "1:397283805044:web:a52f422b3c197a92dc0e21",
  measurementId: "G-P9NEYGRWRY"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const database = getDatabase(app);
export const db = getFirestore(app);



