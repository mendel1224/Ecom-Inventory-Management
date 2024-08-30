import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Button,
  TableContainer,
  Paper,
} from '@mui/material';

export default function InventoryTable({ inventory, removeItem }) {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Purchase Date</TableCell>
            <TableCell>Purchase Total</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventory.map(({ id, name, size, sku, purchaseDate, purchaseTotal }) => (
            <TableRow key={id}>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{size}</TableCell>
              <TableCell>{sku}</TableCell>
              <TableCell>Listed</TableCell> {/* Or Unlisted based on your data */}
              <TableCell>{purchaseDate}</TableCell>
              <TableCell>
                {purchaseTotal !== undefined && purchaseTotal !== null
                  ? `$${purchaseTotal.toFixed(2)}`
                  : 'N/A'}
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => removeItem(id)} // Pass the unique document ID
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}