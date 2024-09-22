// server.js

const express = require('express');
const cors = require('cors');
const request = require('request');

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for frontend-backend communication
app.use(express.json());

// API route to fetch Instagram user data
app.get('/api/users/:username', (req, res) => {
  const username = req.params.username;

  const options = {
    method: 'GET',
    url: 'https://instagram-scraper-api2.p.rapidapi.com/v1/info',
    qs: { username_or_id_or_url: username },
    headers: {
      'x-rapidapi-key': 'f68befd8f3msha59f7f16fe25898p1057a6jsn1a3a7eebca21', // Replace with your actual API key
      'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
    }
  };

  request(options, function (error, response, body) {
    if (error) {
      return res.status(500).json({ error: 'Failed to fetch data' });
    }

    try {
      const data = JSON.parse(body);
      res.json(data); // Return the JSON response to the frontend
    } catch (error) {
      res.status(500).json({ error: 'Failed to parse data' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
