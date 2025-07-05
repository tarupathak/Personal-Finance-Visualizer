const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");

router.get("/", async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch budgets" });
  }
});

router.post("/", async (req, res) => {
  const { month, category, amount } = req.body;
  try {
    const budget = await Budget.findOneAndUpdate(
      { month, category },
      { amount },
      { new: true, upsert: true }
    );
    res.json(budget);
  } catch (err) {
    res.status(400).json({ error: "Failed to save budget" });
  }
});

module.exports = router;
