// backend/routes/otp.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const otps = {};

const generateOTP = () => {
  return crypto.randomBytes(3).toString('hex');
};

// Configure nodemailer transport using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Route to generate and send OTP
router.post('/generateOtp', (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  otps[email] = otp;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('OTP sent');
  });
});

// Route to validate OTP
router.post('/validateOtp', (req, res) => {
  const { email, otp } = req.body;
  if (otps[email] && otps[email] === otp) {
    delete otps[email];
    res.status(200).send('OTP verified');
  } else {
    res.status(400).send('Invalid OTP');
  }
});

module.exports = router;
