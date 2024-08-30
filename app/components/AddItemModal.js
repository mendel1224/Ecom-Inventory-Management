import React from 'react';
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Stack,
} from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export default function AddItemModal({
  open,
  handleClose,
  itemName,
  setItemName,
  purchaseDate,
  setPurchaseDate,
  purchaseTotal,
  setPurchaseTotal,
  sku,
  setSku,
  size,
  setSize,
  addItem,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Item
        </Typography>
        <Stack width="100%" spacing={2}>
          <TextField
            id="outlined-name"
            label="Name"
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextField
            id="outlined-purchaseDate"
            label="Purchase Date"
            variant="outlined"
            fullWidth
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
          <TextField
            id="outlined-purchaseTotal"
            label="Purchase Total"
            variant="outlined"
            fullWidth
            type="text" // Ensure it accepts text so users can input "$100"
            value={purchaseTotal}
            onChange={(e) => setPurchaseTotal(e.target.value)}
          />
          <TextField
            id="outlined-sku"
            label="SKU"
            variant="outlined"
            fullWidth
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
          <TextField
            id="outlined-size"
            label="Size"
            variant="outlined"
            fullWidth
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <Button variant="outlined" onClick={addItem}>
            Add
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}