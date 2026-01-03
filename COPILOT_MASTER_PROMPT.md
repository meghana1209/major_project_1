# 🔥 GITHUB COPILOT MASTER PROMPT

### (Walmart-Style Full-Stack E-Commerce – FINAL YEAR PROJECT)

> 📌 **How to use this**

1. Open your project folder in VS Code
2. Open **GitHub Copilot Chat**
3. Paste **this entire prompt**
4. Then follow Copilot’s steps file-by-file

---

## 🚀 COPILOT PROMPT START

You are a **senior full-stack software engineer** helping me build a **BE final-year full-stack project**.

Build a **production-grade Walmart-style e-commerce and analytics web application** with **Customer and Admin portals**, **real authentication**, **analytics**, and **email notifications**.

This is **NOT a demo**.
All features must work end-to-end using a **LOCAL full-stack architecture (NO Firebase)**.

---

## 🧱 TECH STACK (STRICT – DO NOT CHANGE)

### Frontend

* React (Vite)
* Axios
* Chart.js or Recharts
* React Router

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt
* Nodemailer (Gmail SMTP)

### Database

* MongoDB (local or MongoDB Atlas free tier)

---

## 📂 PROJECT STRUCTURE (CREATE THIS FIRST)

```
walmart-clone/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── CustomerDashboard.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── Analytics.jsx
│   │   ├── components/
│   │   ├── services/api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Wallet.js
│   │   ├── NotifyRequest.js
│   │   └── InventoryAlert.js
│   ├── routes/
│   ├── controllers/
│   ├── middleware/auth.js
│   ├── utils/mailer.js
│   ├── seed/seedProducts.js
│   ├── index.js
│   └── config/db.js
```

---

## 🔐 AUTHENTICATION & LOGIN (MUST WORK 100%)

### Login UI

* Single page
* Walmart-style centered card
* Logo on top
* **Toggle tabs: Customer | Admin**
* Email & Password inputs
* Button text changes based on role

### Backend Auth Logic

* Hash passwords using bcrypt
* JWT generation on login
* Store JWT in localStorage
* Protect routes using middleware
* Role-based access control

### Login Flow

1. Signup → store user in MongoDB
2. Login → validate password
3. Generate JWT
4. Redirect:

   * Customer → Customer Dashboard
   * Admin → Admin Dashboard
5. Persist login on refresh

---

## 🏠 HOME PAGE (LIKE AMAZON / WALMART)

* Display **1000+ products**
* Load products dynamically from MongoDB
* Categories:

  * Groceries
  * Electronics
  * Retail
* Each product shows:

  * Image
  * Name
  * Price
  * Rating
  * Stock status

### Product Images (MANDATORY)

* Use **real public Amazon/Walmart-style image URLs**
* No placeholders
* No broken images

---

## 📦 BULK PRODUCT SEEDING

Create `seedProducts.js` that:

* Inserts **1000+ products**
* Uses real image URLs
* Each product has:

```js
{
  name,
  price,
  category,
  stock,
  threshold,
  image,
  rating
}
```

---

## 👤 CUSTOMER FEATURES

* Browse products
* Product details page
* Add to cart
* Remove from cart
* Auto cart total calculation
* Wallet-based checkout
* Place orders
* Order history
* Wallet balance tracking

---

## 📊 CUSTOMER ANALYTICS DASHBOARD

Use **real order data** to show:

* Total spend
* Monthly spend (Line chart)
* Category-wise spend (Pie chart)
* Frequent purchases (Bar chart)
* Wallet usage

---

## 🛠️ ADMIN DASHBOARD

Admin can:

* Add / Edit / Delete products
* Update stock
* View inventory status
* Track orders
* View revenue
* Category-wise sales
* Best-selling products
* Customer behavior analytics

---

## 🚨 OUT-OF-STOCK ALERT SYSTEM

When:

```
stock <= threshold
```

Then:

* Send email using Nodemailer
* Email to: **meghanab235@gmail.com**
* Show alert on admin dashboard
* Save alert in `InventoryAlert` collection

Email includes:

* Product name
* Category
* Stock
* Time

---

## 🔔 “NOTIFY ME” CUSTOMER DEMAND FEATURE

* Customer clicks **Notify Me**
* Save request in DB
* Admin dashboard shows demand count
* When stock updated:

  * Notify customers via email

---

## 🎨 UI REQUIREMENTS

* Walmart / Amazon-style design
* White / Blue / Yellow theme
* Responsive
* All buttons functional
* No dummy pages

---

## ❌ DO NOT DO

* Do not use Firebase
* Do not use mock data
* Do not create static pages
* Do not break login

---

## ✅ FINAL GOAL

Produce a **fully working full-stack application** suitable for:

* BE final-year submission
* Viva demonstration
* Resume & portfolio

---

## 🚀 COPILOT PROMPT END

---

## ✅ HOW COPILOT WILL HELP YOU

With this prompt, Copilot can:

* Generate backend APIs
* Create MongoDB schemas
* Write JWT auth logic
* Build React UI pages
* Seed 1000+ products
* Add analytics charts
* Implement email alerts

---

### 🔥 NEXT (I CAN STILL HELP YOU)
