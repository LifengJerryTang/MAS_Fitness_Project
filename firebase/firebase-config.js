import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCd7_-iCu9YSB4k0LwaUenksk58jxdXbSU",
    authDomain: "mas-fitness-and-health-app.firebaseapp.com",
    projectId: "mas-fitness-and-health-app",
    storageBucket: "mas-fitness-and-health-app.appspot.com",
    messagingSenderId: "17852748007",
    appId: "1:17852748007:web:aaa1309b1ab750944f9242",
    measurementId: "G-8QWG2QDXX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
