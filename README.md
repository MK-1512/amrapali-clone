# 💎 Amrapali Clone

This is a **client-side clone of the Amrapali e-commerce website**, built with **React** and **Vite**.  
It focuses on creating a **complex, component-based frontend architecture** using **React Context API** for global state management and **React Router** for page navigation.

---

## 🚀 Key Features

### 🧠 Context API State Management  
- Uses React’s **Context API** to manage global state for:  
  - Authentication  
  - Cart  
  - Wishlist  
  - Currency  
  - Recently Viewed items  

### 🧭 Complex Routing  
- Implements a **sophisticated routing system** in `App.jsx`, mapping paths like `/product/:id` and `/collection/:name` dynamically.  
- Handles **page reloads and direct navigation** correctly using React Router.  

### 🛍️ Client-Side E-Commerce  
- Simulates a **complete e-commerce experience** entirely on the client-side.  
- Includes **User Account**, **Login**, and **Register** pages.  
- Protected routes for **AccountPage** and **AddressesPage** to simulate authentication-based access.  

### 🔎 Product Features  
- **Filtering** by color, price, and style.  
- **Sorting** functionality for dynamic product display.  
- **Search** bar to find products by keyword.  

### 🎨 Rich UI Components  
- **Slide-out CartDrawer** and **WishlistModal** for quick user interactions.  
- **Product carousels** implemented using `react-slick`.  
- **Static pages** for policies, FAQs, and brand stories for realism.  

---

## 🧰 Technology Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | React (v19) |
| **Build Tool** | Vite |
| **State Management** | React Context API |
| **Routing** | React Router (`react-router-dom`) |
| **Styling** | Bootstrap, React-Bootstrap |
| **Carousel** | React Slick (`react-slick`) |

---

## 🔗 Links

- **Repository:** https://github.com/MK-1512/amrapali-clone  
- **Live Demo:** *Currently not hosted*

---

## ⚙️ Setup and Installation

> Ensure **Node.js** and **npm** are installed before proceeding.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/MK-1512/amrapali-clone.git
cd mk-1512/amrapali-clone/amrapali-clone-5694b623a45b0f0a5acc6fb662f0c40bcfe8966d
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Start the Development Server
```bash
npm run dev
```
Then open your browser at the address shown in the terminal (usually `http://localhost:5173`).

---

## 🧪 Notes & Usage Tips

- This project is **frontend-only** — all product and user data are simulated locally.  
- If you reload on dynamic routes (like `/product/:id`), React Router will handle it correctly.  
- Make sure to adjust screen size and test responsiveness — the design is **fully responsive** across devices.  
- Carousel and modal components rely on `react-slick` and Bootstrap’s CSS — ensure these packages are installed properly.  

---

## 👨‍💻 Author & Contact

**Mukesh Kumar J**  
- Email: mktech1512@gmail.com  
- LinkedIn: https://linkedin.com/in/mk2003  
- GitHub: https://github.com/MK-1512

---
