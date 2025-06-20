import { db } from './firebase-config.js';
import {
  doc,
  getDoc,
  updateDoc
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const userId = localStorage.getItem('userId');
if (!userId) {
  alert('User not logged in. Redirecting to login.');
  window.location.href = '../../login.html';
}

const profileForm = document.getElementById('profileForm');
const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');

async function loadProfile() {
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      profileName.value = data.name || '';
      profileEmail.value = data.email || '';
    } else {
      alert('User profile not found.');
    }
  } catch (error) {
    console.error('Error loading profile:', error);
  }
}

profileForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      name: profileName.value
    });

    alert('Profile updated successfully!');
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('Failed to update profile.');
  }
});

loadProfile();
