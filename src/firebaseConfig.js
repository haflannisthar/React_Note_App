// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore, collection, addDoc } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo9fno1rfab7kMYDVpjZaRzsckCLWQyIE",
  authDomain: "note-app-dac08.firebaseapp.com",
  projectId: "note-app-dac08",
  storageBucket: "note-app-dac08.firebasestorage.app",
  messagingSenderId: "477251219641",
  appId: "1:477251219641:web:63cdc8ccd7ce12f6ebab68",
  measurementId: "G-3C5KKV8VZM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const db = getFirestore(app);


export { auth, db };
