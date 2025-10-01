const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve frontend files

// POST - Add a new sale
app.post('/add-sale', (req, res) => {
    const sale = req.body;

    let salesData = [];
    if (fs.existsSync('sales_data.json')) {
        salesData = JSON.parse(fs.readFileSync('sales_data.json'));
    }

    salesData.push(sale);
    fs.writeFileSync('sales_data.json', JSON.stringify(salesData, null, 2));

    res.json({ message: 'Sale added successfully!' });
});

// GET - Fetch all sales
app.get('/get-sales', (req, res) => {
    if (fs.existsSync('sales_data.json')) {
        const salesData = JSON.parse(fs.readFileSync('sales_data.json'));
        res.json(salesData);
    } else {
        res.json([]);
    }
});

// Default route (Homepage)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Run server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});

