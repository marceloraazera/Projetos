// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAM7ADcBGHrv6cvzxs1jAuz-gWfGZWexT0",
  authDomain: "cadastrarlogintds2.firebaseapp.com",
  projectId: "cadastrarlogintds2",
  storageBucket: "cadastrarlogintds2.firebasestorage.app",
  messagingSenderId: "553733857401",
  appId: "1:553733857401:web:44e160919b7668bd45b4a8",
  measurementId: "G-1C0XY04YM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const autenticacao = getAuth(app);
export const bancoDados = getFirestore(app);
