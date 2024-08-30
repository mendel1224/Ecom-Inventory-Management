"use client"; // Ensure this component is treated as a client component

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  TableContainer,
  Paper,
  Stack,
} from '@mui/material';
import { firestore } from '@/firebase';

import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';

const style = {
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

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [purchaseTotal, setPurchaseTotal] = useState('');
  const [sku, setSku] = useState('');
  const [size, setSize] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // Add search state

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ id: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const addItem = async () => {
    if (!itemName || !purchaseDate || !purchaseTotal || !sku || !size) {
      alert('Please fill out all fields');
      return;
    }

    // Sanitize the purchaseTotal by removing non-numeric characters (except for ".")
    const sanitizedTotal = purchaseTotal.replace(/[^0-9.]/g, '');

    const docRef = doc(collection(firestore, 'inventory'), itemName);
    const docData = {
      name: itemName,
      purchaseDate: purchaseDate,
      purchaseTotal: parseFloat(sanitizedTotal), // Store as a number
      sku: sku,
      size: size,
    };

    await setDoc(docRef, docData);
    await updateInventory();
    setItemName('');
    setPurchaseDate('');
    setPurchaseTotal('');
    setSku('');
    setSize('');
    handleClose();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    await deleteDoc(docRef);
    await updateInventory();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Filter inventory based on the search query
  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box width="100vw" padding={4}>
      <TextField
        label="Search by Name or SKU"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 2 }} // Add some margin at the bottom
      />
      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>
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
            {filteredInventory.map(({ id, name, size, sku, purchaseDate, purchaseTotal }) => (
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
                    onClick={() => removeItem(id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
    </Box>
  );
}