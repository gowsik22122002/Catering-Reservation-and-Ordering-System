// assets/js/cart.js

import { db } from './firebase-config.js';
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const userId = localStorage.getItem('userId');
if (!userId) {
  alert('User not logged in. Redirecting to login.');
  window.location.href = '../../login.html';
}

const cartItemsContainer = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const placeOrderBtn = document.getElementById('placeOrderBtn');

async function loadCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  try {
    const cartRef = collection(db, 'users', userId, 'cart');
    const snapshot = await getDocs(cartRef);

    snapshot.forEach(docSnap => {
      const item = docSnap.data();
      const itemId = docSnap.id;

      total += item.price * (item.quantity || 1);

      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <p><strong>${item.name}</strong></p>
        <p>₹${item.price} x ${item.quantity || 1}</p>

        <div class="cart-actions">
          <button class="decrease">-</button>
          <span>${item.quantity || 1}</span>
          <button class="increase">+</button>
          <button class="delete">Delete</button>
        </div>
      `;

      // Update Quantity
      div.querySelector('.increase').addEventListener('click', async () => {
        const newQty = (item.quantity || 1) + 1;
        await updateDoc(doc(db, 'users', userId, 'cart', itemId), { quantity: newQty });
        loadCart();
      });

      div.querySelector('.decrease').addEventListener('click', async () => {
        const newQty = (item.quantity || 1) - 1;
        if (newQty > 0) {
          await updateDoc(doc(db, 'users', userId, 'cart', itemId), { quantity: newQty });
        } else {
          await deleteDoc(doc(db, 'users', userId, 'cart', itemId));
        }
        loadCart();
      });

      // Delete item
      div.querySelector('.delete').addEventListener('click', async () => {
        await deleteDoc(doc(db, 'users', userId, 'cart', itemId));
        loadCart();
      });

      cartItemsContainer.appendChild(div);
    });

    cartTotalEl.textContent = total.toFixed(2);
  } catch (error) {
    console.error('Failed to load cart:', error);
    cartItemsContainer.innerHTML = '<p>Error loading cart items.</p>';
  }
}

placeOrderBtn.addEventListener('click', () => {
  alert('Order placed successfully!'); // Hook to real order logic later
});
document.getElementById('placeOrderBtn').addEventListener('click', () => {
  window.location.href = 'place-order.html';
});


loadCart();
