const express = require('express');
const Item = require('../models/Item');
const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error.message);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Add a new item
router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Item name is required' });
  }
  
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error adding item:', error.message);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// Update an item
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error.message);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting item:', error.message);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

module.exports = router;
