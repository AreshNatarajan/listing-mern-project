const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, 'config.env') });

// Initialize express app
const app = express();
const port = process.env.PORT || 5000; // Default to 5000 if no port is provided

// Middleware setup
app.use(cors());
app.use(express.json());

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if DB connection fails
  }
};

connectDB();

// Import routes
const itemRoutes = require('./routes/items');

// Use routes
app.use('/items', itemRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${process.env.MONGO_URI}`);
});
