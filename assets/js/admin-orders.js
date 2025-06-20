import { db } from "./firebase-config.js";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const ordersList = document.getElementById("ordersList");
const filterStatus = document.getElementById("filterStatus");

async function fetchOrders(statusFilter = "all") {
  ordersList.innerHTML = "Loading...";

  try {
    let q = collection(db, "orders");

    if (statusFilter !== "all") {
      q = query(q, where("status", "==", statusFilter));
    }

    const snapshot = await getDocs(q);
    ordersList.innerHTML = "";

    if (snapshot.empty) {
      ordersList.innerHTML = "<p>No orders found.</p>";
      return;
    }

    snapshot.forEach(docSnap => {
      const order = docSnap.data();
      const id = docSnap.id;

      const card = document.createElement("div");
      card.className = "order-card";
      card.innerHTML = `
        <h3>Order ID: ${id}</h3>
        <p><strong>User:</strong> ${order.userEmail}</p>
        <p><strong>Items:</strong> ${order.items?.map(i => `${i.name} x${i.qty}`).join(", ") || "N/A"}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <div class="order-actions">
          ${order.status === "pending" ? `<button class="confirm" data-id="${id}">Confirm</button>` : ""}
          <button class="delete" data-id="${id}">Delete</button>
        </div>
      `;
      ordersList.appendChild(card);
    });

    addEventListeners();
  } catch (err) {
    ordersList.innerHTML = `<p>Error loading orders: ${err.message}</p>`;
  }
}

function addEventListeners() {
  document.querySelectorAll(".confirm").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      await updateDoc(doc(db, "orders", id), { status: "confirmed" });
      fetchOrders(filterStatus.value);
    });
  });

  document.querySelectorAll(".delete").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      if (confirm("Are you sure you want to delete this order?")) {
        await deleteDoc(doc(db, "orders", id));
        fetchOrders(filterStatus.value);
      }
    });
  });
}

filterStatus.addEventListener("change", () => {
  fetchOrders(filterStatus.value);
});

fetchOrders();
