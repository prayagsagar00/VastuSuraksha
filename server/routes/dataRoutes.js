const express = require('express');
const router = express.Router();
const InfrastructureData = require('../models/InfrastructureData');
const { analyzeSafety } = require('../services/dataProcessor');
const { sendAlert } = require('../services/alertService');

router.post('/data', async (req, res) => {
  try {
    // 1. Process incoming data
    const processedData = analyzeSafety(req.body);
    
    // 2. Save to database
    const newData = await InfrastructureData.create(processedData);
    
    // 3. Check for critical status
    if(processedData.status === 'critical') {
      sendAlert(newData);
    }
    
    res.status(201).json(newData);
    
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/historical', async (req, res) => {
  try {
    const data = await InfrastructureData.find()
      .sort({ timestamp: -1 })
      .limit(100);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;