import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyA8LpuAcnxGFYKxFPJDPvUHLHvtpDb6P9Y",
    authDomain: "wireframer-79f37.firebaseapp.com",
    databaseURL: "https://wireframer-79f37.firebaseio.com",
    projectId: "wireframer-79f37",
    storageBucket: "wireframer-79f37.appspot.com",
    messagingSenderId: "909375561441",
    appId: "1:909375561441:web:eb570c72824c2b9416a1a0",
    measurementId: "G-9HKZVXRYJL"
  };
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;