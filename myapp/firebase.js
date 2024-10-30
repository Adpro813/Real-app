// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAw-YNYT_dLd2zzi4fP3x3Fzz4k1oojSFg",
  authDomain: "aroma-c1310.firebaseapp.com",
  databaseURL: "https://aroma-c1310-default-rtdb.firebaseio.com",
  projectId: "aroma-c1310",
  storageBucket: "aroma-c1310.appspot.com",
  messagingSenderId: "655198709057",
  appId: "1:655198709057:web:8074b6e7c5d9b734faedc0",
  measurementId: "G-62EM31RF55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };