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

const tokenCache = {
    token: null,
    expiresAt: 0
};

const getAuthToken = async () => {
    const now = Date.now();
    if (tokenCache.token && now < tokenCache.expiresAt) {
        return tokenCache.token;
    }

    const response = await axios.post(process.env.AUTH_URL, {
    username: process.env.USERNAME,
    password: process.env.PASSWORD
    }, {
    headers: { 'Content-Type': 'application/json' }
    });
    const token = response.data.token;
    tokenCache.token = token;
    tokenCache.expiresAt = now + 10 * 60 * 1000; // cache for 10 mins (adjust as needed)
    return token;
};

app.post('/api/jobs', async (req, res) => {
    const { timeString } = req.body;

    try {
    const token = await getAuthToken();
    const JOBS_URL = process.env.JOBS_URL;

    const filterPayload = {
      filter: {
        operator: "and",
        operands: [
          {
            operator: "ge",
            field: "startDateTime",
            value: timeString
          }
        ]
      },
      page: {
        offset: 0,
        length: 10000
      },
      sort: [
        { field: "deviceName", direction: "asc" }
      ]
    };

    const response = await axios.post(
        JOBS_URL,  // Use your real AA jobs endpoint
        filterPayload,
        {
        headers: {
            'X-Authorization': token,
            'Content-Type': 'application/json'
        }
        }
    );

    res.json(response.data);
    } catch (error) {
    console.error('Job fetch error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
});