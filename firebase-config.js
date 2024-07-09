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
  apiKey: "AIzaSyCGrOkplAJMT1Fn8ykQ7hqD3i7a2_mId9o",
  authDomain: "pruebanc-da164.firebaseapp.com",
  projectId: "pruebanc-da164",
  storageBucket: "pruebanc-da164.appspot.com",
  messagingSenderId: "518399927383",
  appId: "1:518399927383:web:91926d8fc67ff40fc8ef12"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const database = getDatabase(app);
export const db = getFirestore(app);



