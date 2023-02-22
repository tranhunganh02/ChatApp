// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbaVmppMECHfoeGwny70Syc2ZkfUiZUew",
  authDomain: "chatapp-7a845.firebaseapp.com",
  projectId: "chatapp-7a845",
  storageBucket: "chatapp-7a845.appspot.com",
  messagingSenderId: "72163232551",
  appId: "1:72163232551:web:d7ea65cc9195072b8d7702",
  measurementId: "G-MN2XXY1RS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {firebaseConfig}