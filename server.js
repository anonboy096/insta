const express = require('express');
const https = require('https');

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default port

// RapidAPI configuration
const rapidApiKey = 'fbf81352fcmsh5248a4f09b5d605p1c1a87jsnd230527fa9b3';
const rapidApiHost = 'instagram-scraper-api2.p.rapidapi.com';

// Middleware to parse request body as JSON
app.use(express.json());

// Route to handle Instagram user data requests
app.get('/users/:username', (req, res) => {
  const username = req.params.username;

  const options = {
    method: 'GET',
    hostname: rapidApiHost,
    port: 443, // HTTPS uses port 443 by default
    path: `/v1/info?username_or_id_or_url=${username}`,
    headers: {
      'x-rapidapi-key': rapidApiKey,
      'x-rapidapi-host': rapidApiHost
    }
  };

  https.request(options, (response) => {
    const chunks = [];

    response.on('data', (chunk) => {
      chunks.push(chunk);
    });

    response.on('end', () => {
      const body = Buffer.concat(chunks);
      try {
        const jsonData = JSON.parse(body.toString());
        res.json(jsonData); // Send the user data as JSON response
      } catch (error) {
        console.error('Error parsing response:', error);
        res.status(500).json({ error: 'Failed to fetch user data' });
      }
    });
  }).end();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});