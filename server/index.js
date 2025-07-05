const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const transactions = require('./routes/transactions');
const budgets = require('./routes/budgets');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactions);
app.use('/api/budgets', budgets);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
  app.listen(5000, () => console.log("Server running on port 5000"));
}).catch(err => console.log(err));
