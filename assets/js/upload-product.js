// upload-product.js
import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("productName").value.trim();
  const price = parseFloat(document.getElementById("productPrice").value);
  const description = document.getElementById("productDescription").value.trim();

  if (!name || isNaN(price) || !description) {
    alert("Please fill out all fields correctly.");
    return;
  }

  try {
    await addDoc(collection(db, "products"), {
      name,
      price,
      description,
      createdAt: serverTimestamp()
    });

    alert("Product uploaded successfully!");
    productForm.reset();
  } catch (error) {
    console.error("Error uploading product:", error);
    alert("Failed to upload product: " + error.message);
  }
});
