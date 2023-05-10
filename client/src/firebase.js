// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWKruhrr1tbZ46QHJ4aiMHnpRTmOdg95M",
    authDomain: "login-9dadb.firebaseapp.com",
    projectId: "login-9dadb",
    storageBucket: "login-9dadb.appspot.com",
    messagingSenderId: "355437534500",
    appId: "1:355437534500:web:772ddd84c83645bb7da7b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };
