const express = require('express');
const cors = require('cors');
const data = require('./data'); // Existing data for other components
const userData = require('./user-data'); // Import your user data

// Create an Express application
const app = express();

// Use CORS and JSON middleware
app.use(cors());
app.use(express.json());

// Route to get all data for existing component
app.get('/api/data', (req, res) => {
    res.json(data);
});

// Route to get user data
app.get('/api/user-data', (req, res) => {
    res.json(userData);
});

// Other routes and middleware...

// Start the server on port 3001
const port = 3001;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
