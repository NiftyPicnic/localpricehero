const express = require('express');
const cors = require('cors');
const data = require('./data'); // Make sure the path to data.js is correct

// Create an Express application
const app = express();

// Use CORS and JSON middleware
app.use(cors());
app.use(express.json());

// Route to get all data
app.get('/api/data', (req, res) => {
    res.json(data);
});

// Test route
app.get('/test', (req, res) => {
    res.send('Test route works');
});

// Catch-all route for undefined routes
app.get('*', (req, res) => {
    res.status(404).send('404 Not Found');
});

// Start the server on port 3001
const port = 3001;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
