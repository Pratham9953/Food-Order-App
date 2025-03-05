const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let orders = [];
let orderId = 1;

// Menu API
app.get("/api/menu", (req, res) => {
  res.json([
    { id: 1, name: "Pizza", price: 250 },
    { id: 2, name: "Burger", price: 120 },
    { id: 3, name: "Pasta", price: 180 },
  ]);
});

// Place Order
app.post("/api/orders", (req, res) => {
  const newOrder = {
    id: orderId++,
    date: new Date(),
    items: req.body.items,
    totalPrice: req.body.items.reduce((acc, item) => acc + item.price, 0),
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Get All Orders
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

// Start Server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
