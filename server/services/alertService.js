const nodemailer = require('nodemailer');
const InfrastructureData = require('../models/InfrastructureData');

// Email Alert
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export function sendAlert(data) {
  // Send Email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ALERT_RECIPIENTS,
    subject: `Critical Infrastructure Alert - ${data.timestamp}`,
    text: `Critical levels detected:\n
           Stress: ${data.stressLevel} MPa\n
           Water: ${data.waterLevel} m\n
           Traffic: ${data.trafficDensity} veh/hr`
  };

  transporter.sendMail(mailOptions);
  
  // Real-time Alert (WebSocket)
  io.emit('infra-alert', {
    message: 'Critical infrastructure condition detected!',
    data: data
  });
}