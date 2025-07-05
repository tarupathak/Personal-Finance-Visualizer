import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Paper,
  TableContainer
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TransactionTable({ transactions, onEdit, onDelete }) {
  return (
    <Paper className="p-4 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>

      <TableContainer className="min-w-[700px]">
        <Table aria-label="transaction table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Amount (₹)</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx._id}>
                <TableCell>{tx.description}</TableCell>
                <TableCell>₹{Number(tx.amount).toFixed(2)}</TableCell>
                <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                <TableCell>{tx.category || 'Other'}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => onEdit(tx)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(tx._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
