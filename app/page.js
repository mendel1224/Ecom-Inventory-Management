"use client"; // Ensure this component is treated as a client component in Next.js

import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';             // Import SearchBar component
import InventoryTable from './components/InventoryTable';   // Import InventoryTable component
import AddItemModal from './components/AddItemModal';       // Import AddItemModal component
import { fetchInventory, addItemToInventory, removeItemFromInventory } from '../services/firebase'; // Import Firebase service functions
import { Box, Button } from '@mui/material'; // Import MUI components

export default function Home() {
  // State to store the inventory items fetched from Firestore
  const [inventory, setInventory] = useState([]);
  // State to control the open/close status of the AddItemModal
  const [open, setOpen] = useState(false);
  // States to manage the form inputs for adding a new item
  const [itemName, setItemName] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [purchaseTotal, setPurchaseTotal] = useState('');
  const [sku, setSku] = useState('');
  const [size, setSize] = useState('');
  // State to manage the search query entered by the user
  const [searchQuery, setSearchQuery] = useState('');

  // useEffect hook to fetch and update the inventory data when the component mounts
  useEffect(() => {
    const updateInventory = async () => {
      // Fetch inventory items from Firestore
      const inventoryList = await fetchInventory();
      // Update the inventory state with the fetched data
      setInventory(inventoryList);
    };
    // Call the updateInventory function when the component mounts
    updateInventory();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to add a new item to the inventory
  const addItem = async () => {
    // Basic validation to ensure all fields are filled out
    if (!itemName || !purchaseDate || !purchaseTotal || !sku || !size) {
      alert('Please fill out all fields');
      return;
    }

    // Add the new item to Firestore
    await addItemToInventory(itemName, purchaseDate, purchaseTotal, sku, size);
    // Fetch the updated inventory list and update the state
    const inventoryList = await fetchInventory();
    setInventory(inventoryList);

    // Reset form fields
    setItemName('');
    setPurchaseDate('');
    setPurchaseTotal('');
    setSku('');
    setSize('');
    // Close the modal
    setOpen(false);
  };

  // Function to remove an item from the inventory
  const removeItem = async (itemId) => {
    // Remove the item from Firestore using its unique ID
    await removeItemFromInventory(itemId);
    // Fetch the updated inventory list and update the state
    const inventoryList = await fetchInventory();
    setInventory(inventoryList);
  };

  // Filter the inventory based on the search query (searching by name or SKU)
  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box width="100vw" padding={4}>
      {/* Render the SearchBar component, passing down the searchQuery and setSearchQuery as props */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Button to open the AddItemModal */}
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add New Item
      </Button>

      {/* Render the InventoryTable component, passing down the filteredInventory and removeItem as props */}
      <InventoryTable inventory={filteredInventory} removeItem={removeItem} />

      {/* Render the AddItemModal component, passing down the necessary props for form management and modal control */}
      <AddItemModal
        open={open}
        handleClose={() => setOpen(false)}
        itemName={itemName}
        setItemName={setItemName}
        purchaseDate={purchaseDate}
        setPurchaseDate={setPurchaseDate}
        purchaseTotal={purchaseTotal}
        setPurchaseTotal={setPurchaseTotal}
        sku={sku}
        setSku={setSku}
        size={size}
        setSize={setSize}
        addItem={addItem}
      />
    </Box>
  );
}