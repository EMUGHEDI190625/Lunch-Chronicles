// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getDatabase, ref, push, get, child } from "firebase/getDatabase";
// import { getDatabase, ref, push, } from "firebase/database";
import { getDatabase, ref, push, get, child } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCL_dNTo4N9SnNuDQYH5aA7JXEIH4mWDPM",
  authDomain: "paystackorders.firebaseapp.com",
  databaseURL: "https://paystackorders-default-rtdb.firebaseio.com",
  projectId: "paystackorders",
  storageBucket: "paystackorders.firebasestorage.app",
  messagingSenderId: "772974877440",
  appId: "1:772974877440:web:1ee1b70162eaeeff5cb1e5",
  measurementId: "G-VV82SSZTL0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const analytics = getAnalytics(app);

export {database, ref, push, get, child};