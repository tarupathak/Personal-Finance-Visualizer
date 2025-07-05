import { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Stack,
  Box,
  Typography
} from '@mui/material';

export default function TransactionForm({ onSubmit, selectedTransaction, clearSelection }) {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: ''
  });

  useEffect(() => {
    if (selectedTransaction) {
      setFormData({
        amount: selectedTransaction.amount,
        description: selectedTransaction.description,
        date: selectedTransaction.date?.split('T')[0] || ''
      });
    }
  }, [selectedTransaction]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) return;
    onSubmit(formData, selectedTransaction?._id);
    setFormData({ amount: '', description: '', date: '' });
    clearSelection();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Stack spacing={3}>
        <Typography variant="h6" fontWeight={600}>
          {selectedTransaction ? 'Update Transaction' : 'Add New Transaction'}
        </Typography>

        <TextField
          label="Amount (₹)"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <Stack direction="row" spacing={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            {selectedTransaction ? 'Update' : 'Add'}
          </Button>

          {selectedTransaction && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={clearSelection}
            >
              Cancel
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
