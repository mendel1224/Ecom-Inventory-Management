import { firestore } from '@/firebase'; // Correct import path to the Firestore instance
import {
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';

// Fetch all inventory items from Firestore
export const fetchInventory = async () => {
  const snapshot = await getDocs(collection(firestore, 'inventory'));
  const inventoryList = [];
  snapshot.forEach((doc) => {
    inventoryList.push({ id: doc.id, ...doc.data() });
  });
  return inventoryList;
};

// Add a new item to Firestore
export const addItemToInventory = async (itemName, purchaseDate, purchaseTotal, sku, size) => {
  const sanitizedTotal = purchaseTotal.replace(/[^0-9.]/g, '');
  const collectionRef = collection(firestore, 'inventory');
  const docData = {
    name: itemName,
    purchaseDate,
    purchaseTotal: parseFloat(sanitizedTotal),
    sku,
    size,
  };
  // Automatically generate a unique ID for each document
  await addDoc(collectionRef, docData);
};

// Remove an item from Firestore
export const removeItemFromInventory = async (itemId) => {
  const docRef = doc(firestore, 'inventory', itemId);
  await deleteDoc(docRef);
};