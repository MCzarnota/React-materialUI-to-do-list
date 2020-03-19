import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyB0dXJmDwVV4-_4F_vugPGlWVIPm4ZiMq4",
    authDomain: "todolist-85f38.firebaseapp.com",
    databaseURL: "https://todolist-85f38.firebaseio.com",
    projectId: "todolist-85f38",
    storageBucket: "todolist-85f38.appspot.com",
    messagingSenderId: "56626782049",
    appId: "1:56626782049:web:4a647fb68eb3a618e2ef20",
    measurementId: "G-ENLWYG0FJ6"
});


export { firebaseConfig as firebase };
