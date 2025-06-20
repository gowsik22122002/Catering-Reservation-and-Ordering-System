// assets/js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js"; // ✅ Add this line

const firebaseConfig = {
  apiKey: "AIzaSyD7cb_QS7iFX4esJejDyuG9lFWJlHAIfII",
  authDomain: "catering-reservation-67ac0.firebaseapp.com",
  databaseURL: "https://catering-reservation-67ac0-default-rtdb.firebaseio.com",
  projectId: "catering-reservation-67ac0",
  storageBucket: "catering-reservation-67ac0.appspot.com",
  messagingSenderId: "647730576492",
  appId: "1:647730576492:web:9c249df09f898109a42c49",
  measurementId: "G-PJ40Q4YM55"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // ✅ Initialize storage

export { app, auth, db, storage }; // ✅ Export storage
