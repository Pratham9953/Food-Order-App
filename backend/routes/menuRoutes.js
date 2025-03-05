import express from "express";
import db from "../db/database.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM menu_items", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

export default router;
