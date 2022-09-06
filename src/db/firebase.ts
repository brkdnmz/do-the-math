// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCR2vzS41moHwaAENPfjAMCiSOs9fzVMI",
  authDomain: "dothemath-a71ef.firebaseapp.com",
  projectId: "dothemath-a71ef",
  storageBucket: "dothemath-a71ef.appspot.com",
  messagingSenderId: "296149971037",
  appId: "1:296149971037:web:ebc67a8c3053bdaf085db4",
  measurementId: "G-4QFM7PJVEE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default db;
