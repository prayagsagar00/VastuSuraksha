const express = require('express');
const router = express.Router();
const axios = require('axios');
// Replace the existing fetch call with:
const response = await fetch('/api/sensor-data');
const data = await response.json();

// Replace external API calls with mock data
router.get('/sensor-data', (req, res) => {
    // Simulated realistic infrastructure data
    const mockData = {
      stress: Math.floor(Math.random() * (100 - 20) + 20), // 20-100 MPa
      waterLevel: (Math.random() * 5).toFixed(1), // 0-5 meters
      trafficDensity: Math.floor(Math.random() * (500 - 50) + 50) // 50-500 veh/hr
    };
    
    res.json(mockData);
  });

function calculateStress(weatherData) {
    // Example stress calculation based on wind speed
    return Math.min(weatherData.wind.speed * 0.75, 100);
}

function calculateWaterLevel(weatherData) {
    // Example water level calculation
    return weatherData.rain ? weatherData.rain['1h'] || 0 : 0;
}

module.exports = router;