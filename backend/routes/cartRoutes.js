import express from "express";
import db from "../db/database.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { userId, itemId, quantity } = req.body;
  db.query(
    "INSERT INTO cart (user_id, item_id, quantity) VALUES (?, ?, ?)",
    [userId, itemId, quantity],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "✅ Item added to cart" });
    }
  );
});

export default router;
