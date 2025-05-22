require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Browsers block requests from one origin (e.g., your frontend) to another (e.g., your backend) unless the backend explicitly allows it.
// this line allows my dev server to make requests to the backend
app.use(cors({
  origin: 'http://localhost:5173'  // change this to the production domain when deployed
}));
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.post('/api/token', async (req, res) => {
    const AUTH_URL = process.env.AUTH_URL;

    const credentials = {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    };

    try {
        const response = await axios.post(AUTH_URL, credentials, {
            headers: { 'Content-Type': 'application/json' }
        });

        const token = response.data.token;
        res.json({ token }); // send token back to frontend
    } catch (err) {
        console.error("Token fetch failed:", err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to get token' });
    }
});

app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
});