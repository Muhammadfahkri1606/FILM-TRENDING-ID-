import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, get, child, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBg4pTh_Vy4QHkADHA5dW_Z5WJz0HS2p2c",
  authDomain: "film-trending-data.firebaseapp.com",
  databaseURL: "https://film-trending-data-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "film-trending-data",
  storageBucket: "film-trending-data.firebasestorage.app",
  messagingSenderId: "531081678400",
  appId: "1:531081678400:web:5db6b2c9179c71136c59a5",
  measurementId: "G-H1DHW0134K"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, get, child, push };
