"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import TransactionForm from "@/components/TransactionForm";
import TransactionTable from "@/components/TransactionTable";
import ExpenseChart from "@/components/ExpenseChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import DashboardSummary from "@/components/DashboardSummary";
import BudgetComparisonChart from "@/components/BudgetComparisonChart";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]); // 🆕 budgets
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/transactions");
      setTransactions(res.data);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  };

  const fetchBudgets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/budgets");
      setBudgets(res.data);
    } catch (error) {
      console.error("Failed to fetch budgets", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
  }, []);

  const handleAddOrUpdate = async (data, id) => {
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/transactions/${id}`, data);
      } else {
        await axios.post("http://localhost:5000/api/transactions", data);
      }
      fetchTransactions();
      setOpen(false);
      setSelectedTransaction(null);
    } catch (error) {
      console.error("Failed to submit transaction", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error("Failed to delete transaction", error);
    }
  };

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <Box className="max-w-7xl mx-auto p-6 space-y-6">
      <Box className="flex justify-between items-center">
        <Typography variant="h4" fontWeight="bold">
          Personal Finance Tracker
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Finance
        </Button>
      </Box>

      <DashboardSummary transactions={transactions} budgets={budgets} />

      <Box className="flex flex-col lg:flex-row gap-6">
        <Box className="flex-1">
          <ExpenseChart transactions={transactions} />
        </Box>
        <Box className="flex-1">
          <CategoryPieChart transactions={transactions} />
        </Box>
      </Box>

      <BudgetComparisonChart transactions={transactions} budgets={budgets} />

      <TransactionTable
        transactions={transactions}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {selectedTransaction ? "Edit Transaction" : "Add Transaction"}
        </DialogTitle>
        <DialogContent>
          <TransactionForm
            onSubmit={handleAddOrUpdate}
            selectedTransaction={selectedTransaction}
            clearSelection={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
