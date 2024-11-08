const mongoose = require('mongoose');

// Define the schema
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Item name is required'], // Validation
  },
  bought: {
    type: Boolean,
    default: false,
  },
});

// Create and export model
const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
