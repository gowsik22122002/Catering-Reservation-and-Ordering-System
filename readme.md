# 🍽️ Catering Reservation and Ordering System

A fully functional web application for managing catering reservations and online food ordering. Built with **HTML, CSS, JavaScript**, and integrated with **Firebase** for authentication, Firestore database, and storage.

---

## 🚀 Features

### 👤 User Module
- Register and login as a user
- Browse available catering products
- Add items to cart and manage quantity
- Place orders with delivery address
- View past orders and profile

### 🛠️ Admin Module
- Login as admin
- Upload and manage product listings
- View all customer orders
- Confirm or delete orders
- Filter orders by status

### 🧾 Occasion Pages
- Wedding Catering
- Birthday Catering
- Corporate Events
- Mass Gatherings
- Housewarming

---

## 🛠️ Tech Stack

| Frontend       | Backend / Services         |
|----------------|----------------------------|
| HTML5 + CSS3   | Firebase Authentication    |
| JavaScript (ES6) | Firebase Firestore Database |
| Responsive CSS | Firebase Storage           |

---

---

## 🔥 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable:
   - **Authentication** (Email/Password)
   - **Firestore Database**
   - **Firebase Storage**
4. Copy your Firebase config and replace it in `firebase-config.js`.

---

## ⚙️ How to Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/catering-reservation-system.git
cd catering-reservation-system

# Open index.html in your browser (via Live Server or localhost)
