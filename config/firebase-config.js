// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_370XxyEhu77QKOUwlJgqkJ2f9KzoPEs",
  authDomain: "todo-app-79453.firebaseapp.com",
  projectId: "todo-app-79453",
  storageBucket: "todo-app-79453.appspot.com",
  messagingSenderId: "936991183863",
  appId: "1:936991183863:web:2699470f635555b765d4f2",
  measurementId: "G-RVLR1EMMW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db}