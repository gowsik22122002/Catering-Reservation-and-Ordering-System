// assets/js/place-order.js
import { auth, db } from './firebase-config.js';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import {
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const userId = localStorage.getItem('userId');
if (!userId) {
  alert('User not logged in.');
  window.location.href = '../../login.html';
}

const orderSummaryDiv = document.getElementById('orderSummary');
const orderForm = document.getElementById('orderForm');

let orderItems = [];
let total = 0;
let userEmail = '';
let userName = '';

async function loadUserDetails() {
  const userDocRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userDocRef);
  if (userSnap.exists()) {
    const userData = userSnap.data();
    userName = userData.name || '';
    userEmail = userData.email || '';
  }
}

async function loadCartSummary() {
  const cartRef = collection(db, 'users', userId, 'cart');
  const snapshot = await getDocs(cartRef);

  orderSummaryDiv.innerHTML = '';
  orderItems = [];
  total = 0;

  if (snapshot.empty) {
    orderSummaryDiv.innerHTML = '<p>Your cart is empty.</p>';
    orderForm.style.display = 'none';
    return;
  }

  snapshot.forEach(docSnap => {
    const item = docSnap.data();
    const quantity = item.quantity || 1;
    const itemTotal = item.price * quantity;

    orderItems.push({
      name: item.name,
      price: item.price,
      quantity
    });

    total += itemTotal;

    orderSummaryDiv.innerHTML += `
      <p><strong>${item.name}</strong> - ₹${item.price} × ${quantity} = ₹${itemTotal}</p>
    `;
  });

  orderSummaryDiv.innerHTML += `<hr/><p><strong>Total: ₹${total.toFixed(2)}</strong></p>`;
}

orderForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const address = document.getElementById('address').value.trim();
  if (!address) return alert('Please enter delivery address.');

  try {
    await addDoc(collection(db, 'orders'), {
      userId,
      userName,
      userEmail,
      address,
      items: orderItems,
      status: 'pending',
      total,
      createdAt: serverTimestamp()
    });

    // Clear cart
    const cartRef = collection(db, 'users', userId, 'cart');
    const snapshot = await getDocs(cartRef);
    for (const docSnap of snapshot.docs) {
      await deleteDoc(docSnap.ref);
    }

    alert('Order placed successfully!');
    window.location.href = 'orders.html';
  } catch (error) {
    console.error('Error placing order:', error);
    alert('Failed to place order.');
  }
});

await loadUserDetails(); // Load user info before placing order
await loadCartSummary();
