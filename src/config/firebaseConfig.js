import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyCIdg-PQ8c9e9EpJSrAVclnWFWfYUjSGKc",
    authDomain: "cse316-hw3-todo.firebaseapp.com",
    databaseURL: "https://cse316-hw3-todo.firebaseio.com",
    projectId: "cse316-hw3-todo",
    storageBucket: "cse316-hw3-todo.appspot.com",
    messagingSenderId: "988039154655",
    appId: "1:988039154655:web:2bcace7d60c7cb498a126a",
    measurementId: "G-TYTG03FNGE"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;