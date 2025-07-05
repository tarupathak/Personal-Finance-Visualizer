"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Button, Dialog, DialogContent, DialogTitle, Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TransactionForm from '@/components/TransactionForm';
import ExpenseChart from '@/components/ExpenseChart';
import TransactionTable from '@/components/TransactionTable';

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchTransactions = async () => {
    const res = await axios.get('http://localhost:5000/api/transactions');
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddOrUpdate = async (data, id) => {
    if (id) {
      await axios.put(`http://localhost:5000/api/transactions/${id}`, data);
    } else {
      await axios.post('http://localhost:5000/api/transactions', data);
    }
    fetchTransactions();
    setOpen(false);
    setSelectedTransaction(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/transactions/${id}`);
    fetchTransactions();
  };

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setOpen(true);
  };

  return (
    <Box className=" mx-auto p-6 space-y-6">
      <Box className="flex justify-between items-center">
        <Typography variant="h4" fontWeight="bold">Personal Finance Tracker</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Finance
        </Button>
      </Box>

      <Box className="flex flex-col md:flex-row gap-6">
        <Box className="flex-1">
          <ExpenseChart transactions={transactions} />
        </Box>
        <Box className="flex-1">
          <TransactionTable
            transactions={transactions}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </Box>
      </Box>

      <Dialog open={open} onClose={() => { setOpen(false); setSelectedTransaction(null); }} fullWidth maxWidth="sm">
        <DialogTitle>{selectedTransaction ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
        <DialogContent>
          <TransactionForm
            onSubmit={handleAddOrUpdate}
            selectedTransaction={selectedTransaction}
            clearSelection={() => setSelectedTransaction(null)}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
