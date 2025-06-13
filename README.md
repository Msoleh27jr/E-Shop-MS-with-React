# 🛍 E-Shop (React Version)

This project is a modern internet shop called **E-Shop**, built with **React**. It allows users to browse products, sign up or log in, view product details, add items to the cart, and place orders. The system includes user authentication, product management, and a dynamic shopping experience — all integrated with a fake backend using `db.json`.

## 🔗 Live Demo

👉 [Click here to watch](https://e-shop-ms-with-react-f5s6.vercel.app/)  
⚠️ *Note: Product data may not appear because the backend (`db.json`) is not hosted online.*

## ✨ Features

- 🛒 Product listing with filters and search  
- 🔐 User registration and login  
- 📦 Cart and order management  
- 🔄 React components with useState, useEffect, and routing  
- 🗃 Backend simulation using `json-server`  
- 📱 Responsive design for all devices

## 📁 Project Structure

- **Frontend**: React 
- **Backend**: Simulated using `json-server` with `db.json`

## ⚙️ How to Run Locally

```bash
# Install dependencies
npm install

# Start the backend (make sure you have json-server installed globally)
json-server --watch db.json --port 3001

# Start the React app
npm run dev
