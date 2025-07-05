const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

router.get("/", async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.json(transactions);
});

router.post("/", async (req, res) => {
  const { amount, description, date } = req.body;
  const transaction = new Transaction({ amount, description, date });
  await transaction.save();
  res.json(transaction);
});

router.put("/:id", async (req, res) => {
  const { amount, description, date } = req.body;
  const updated = await Transaction.findByIdAndUpdate(
    req.params.id,
    { amount, description, date },
    { new: true }
  );
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
