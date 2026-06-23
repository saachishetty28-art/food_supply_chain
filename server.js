const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows server to read JSON data sent by the user
app.use(express.static('public')); // Serves our frontend website folder

// Basic MongoDB Connection (Uses a local fallback if a cloud URL isn't set up yet)
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/food_supply';
mongoose.connect(mongoURI)
    .then(() => console.log('✅ Connected to MongoDB successfully.'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// A simple API Route to track supply items
app.get('/api/items', (req, res) => {
    res.json([
        { id: 1, name: 'Fresh Tomatoes', status: 'In Transit', location: 'Warehouse A' },
        { id: 2, name: 'Organic Apples', status: 'Delivered', location: 'City Market' }
    ]);
});

app.listen(PORT, () => {
    console.log(`🚀 Web server running at http://localhost:${PORT}`);
});