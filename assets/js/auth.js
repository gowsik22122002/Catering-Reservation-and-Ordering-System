// assets/js/auth.js

import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// === REGISTER LOGIC ===
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const role = document.getElementById("registerRole").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role
      });

      // ✅ Store userId
      localStorage.setItem("userId", user.uid);

      // Redirect based on role
      if (role === "admin") {
        window.location.href = "pages/admin/dashboard.html";
      } else {
        window.location.href = "pages/user/dashboard.html";
      }

    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  });
}

// === LOGIN LOGIC ===
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch role from Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const role = userData.role;

        // ✅ Store userId
        localStorage.setItem("userId", user.uid);

        // Redirect based on role
        if (role === "admin") {
          window.location.href = "pages/admin/dashboard.html";
        } else {
          window.location.href = "pages/user/dashboard.html";
        }

      } else {
        alert("User role not found. Contact admin.");
      }

    } catch (error) {
      alert("Login failed: " + error.message);
    }
  });
}
