// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDZJPdynGIopsr_1rJ5GE8hArPzkigg-28",
    authDomain: "materialui-firebase.firebaseapp.com",
    projectId: "materialui-firebase",
    storageBucket: "materialui-firebase.appspot.com",
    messagingSenderId: "767685301486",
    appId: "1:767685301486:web:14be8d9d191978cac8cfff",
    measurementId: "G-T2RSD7253L"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app); // Initialize firestore here
export const storage = getStorage(app); // Initialize storage here
export const registerUser = createUserWithEmailAndPassword;
export const loginUser = signInWithEmailAndPassword; 

