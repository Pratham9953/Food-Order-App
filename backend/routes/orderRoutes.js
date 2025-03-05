import express from "express";
import db from "../db/database.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { userId, items } = req.body; // Get userId and items from request

  if (!userId || !items || items.length === 0) {
    return res.status(400).json({ error: "Invalid request. User ID and items are required." });
  }

  // Insert the order into the database
  db.query("INSERT INTO orders (user_id) VALUES (?)", [userId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    const orderId = result.insertId; // Get the newly inserted order ID

    // Insert order items into the order_items table
    const itemValues = items.map(item => [orderId, item.name, item.price]);

    db.query("INSERT INTO order_items (order_id, item_name, price) VALUES ?", [itemValues], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ message: "✅ Order placed successfully", orderId });
    });
  });
});

export default router;
