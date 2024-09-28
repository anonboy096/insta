const express = require('express');
const https = require('https');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5200;

// Middleware
app.use(cors()); // Enable CORS for frontend-backend communication
app.use(express.json());

// Function to fetch Instagram user data
function fetchInstagramUserData(username, callback) {
    const options = {
        method: 'GET',
        hostname: 'instagram-scraper-api2.p.rapidapi.com',
        port: null,
        path: `/v1/info?username_or_id_or_url=${username}&include_about=true`,
        headers: {
            'x-rapidapi-key': 'a848139fd8msh58ace7b19261ee6p1a36e9jsn84717f383cc5', // Replace with your actual API key
            'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
        }
    };

    const req = https.request(options, function (res) {
        const chunks = [];

        res.on('data', function (chunk) {
            chunks.push(chunk);
        });

        res.on('end', function () {
            const body = Buffer.concat(chunks);
            callback(null, JSON.parse(body.toString())); // Return parsed JSON
        });
    });

    req.on('error', function (error) {
        callback(error);
    });

    req.end();
}

// API endpoint to get user details
app.get('/api/users/:username', (req, res) => {
    const username = req.params.username;
    fetchInstagramUserData(username, (error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Error fetching data' });
        }
        res.json(data);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
