import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqsCoMUDmucg_FaaRD2RA96vvexEYMWUM",
  authDomain: "neartreat-6693f.firebaseapp.com",
  projectId: "neartreat-6693f",
  storageBucket: "neartreat-6693f.appspot.com",
  messagingSenderId: "64137034457",
  appId: "1:64137034457:web:c7a5e5a3dd21832a9edcc8",
  measurementId: "G-R45X2QJ9EG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
