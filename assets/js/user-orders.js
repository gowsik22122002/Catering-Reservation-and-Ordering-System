import { db } from './firebase-config.js';
import { collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const userId = localStorage.getItem('userId');
if (!userId) {
  alert("User not logged in. Redirecting to login.");
  window.location.href = '../../login.html';
}

const ordersList = document.getElementById('ordersList');

async function loadOrders() {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      ordersList.innerHTML = '<p>You have no orders yet.</p>';
      return;
    }

    querySnapshot.forEach(docSnap => {
      const order = docSnap.data();
      const card = document.createElement('div');
      card.className = 'order-card';

      const itemsHTML = order.items.map(item => `<li>${item.name} - ₹${item.price}</li>`).join('');

      card.innerHTML = `
        <h3>Order ID: ${docSnap.id}</h3>
        <p>Status: <strong>${order.status}</strong></p>
        <p>Placed on: ${order.createdAt?.toDate().toLocaleString() || 'N/A'}</p>
        <ul class="order-items">${itemsHTML}</ul>
      `;

      ordersList.appendChild(card);
    });

  } catch (error) {
    console.error('Failed to load orders:', error);
    ordersList.innerHTML = '<p>Error loading orders.</p>';
  }
}

loadOrders();
