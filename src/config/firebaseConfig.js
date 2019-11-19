import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyDeID-lO4L3Shfte_4KzvQdbM83PBaAkf8",
    authDomain: "cse316-hw3-18591.firebaseapp.com",
    databaseURL: "https://cse316-hw3-18591.firebaseio.com",
    projectId: "cse316-hw3-18591",
    storageBucket: "cse316-hw3-18591.appspot.com",
    messagingSenderId: "836754694063",
    appId: "1:836754694063:web:b54c2a4ca55f9d0689995a",
    measurementId: "G-NF6QQWD6XM"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;