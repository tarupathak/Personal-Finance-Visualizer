const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// Create a transaction
router.post("/", async (req, res) => {
  try {
    const { amount, description, date, category } = req.body;
    const transaction = new Transaction({ amount, description, date, category });
    await transaction.save();
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: "Failed to create transaction" });
  }
});

// Update a transaction
router.put("/:id", async (req, res) => {
  try {
    const { amount, description, date, category } = req.body;
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      { amount, description, date, category },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update transaction" });
  }
});

// Delete a transaction
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete transaction" });
  }
});

module.exports = router;
