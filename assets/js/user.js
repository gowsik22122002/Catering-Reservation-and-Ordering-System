// assets/js/user.js

import { db } from './firebase-config.js';
import {
  collection,
  getDocs,
  doc,
  setDoc
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// Ensure user is logged in
const userId = localStorage.getItem('userId');
if (!userId) {
  alert("User not logged in. Redirecting to login.");
  window.location.href = '../../login.html';
}

const productList = document.getElementById('productList');

async function fetchProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    querySnapshot.forEach((docSnap) => {
      const product = { id: docSnap.id, ...docSnap.data() };
      renderProduct(product);
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

function renderProduct(product) {
  const card = document.createElement('div');
  card.className = 'product-card';

  card.innerHTML = `
    <h3>${product.name}</h3>
    <p><strong>Price:</strong> ₹${product.price}</p>
    <p>${product.description}</p>
    <button class="add-to-cart-btn">Add to Cart</button>
  `;

  const addButton = card.querySelector('.add-to-cart-btn');
  addButton.addEventListener('click', async () => {
    try {
      await setDoc(doc(db, 'users', userId, 'cart', product.id), {
        name: product.name,
        price: product.price,
        description: product.description
      });
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  });

  productList.appendChild(card);
}

fetchProducts();

await setDoc(doc(db, 'users', userId, 'cart', product.id), {
  name: product.name,
  price: product.price,
  description: product.description,
  quantity: 1
});
