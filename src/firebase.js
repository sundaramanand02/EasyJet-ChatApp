// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA_69comSRcuHnWZQPZPInffP-SRosJfJk",
    authDomain: "chat-application-1f643.firebaseapp.com",
    projectId: "chat-application-1f643",
    storageBucket: "chat-application-1f643.appspot.com",
    messagingSenderId: "521741845108",
    appId: "1:521741845108:web:4f69f67151e5e812958721"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);