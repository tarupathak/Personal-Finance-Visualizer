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

      <TableContainer className="min-w-[600px]">
        <Table aria-label="transaction table">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Amount (₹)</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx._id}>
                <TableCell>{tx.description}</TableCell>
                <TableCell>{tx.amount}</TableCell>
                <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
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
