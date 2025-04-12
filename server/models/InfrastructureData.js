const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  stressLevel: { type: Number, required: true },
  waterLevel: { type: Number, required: true },
  trafficDensity: { type: Number, required: true },
  status: { type: String, enum: ['safe', 'warning', 'critical'], default: 'safe' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('InfrastructureData', dataSchema);