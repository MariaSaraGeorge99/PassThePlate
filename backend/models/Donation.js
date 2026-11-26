const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorName: { type: String, required: true },      // e.g., "Grand Hotel" or "College Canteen"
  foodDetails: { type: String, required: true },    // e.g., "30 meals - Rice & Curry"
  pickupAddress: { type: String, required: true },  // e.g., "MG Road, Near Bus Stand"
  status: { type: String, default: 'Available' },   // 'Available' or 'Claimed'
  claimedBy: { type: String, default: '' },         // e.g., "Sunrise Elderly Home"
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', donationSchema);