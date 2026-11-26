const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Donation = require('./models/Donation');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://imca2535_db_user:MARIASARAGEORGE992@cluster0.owt8ckz.mongodb.net/fooddonation?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('FoodBridge API is running!');
});

app.get('/api/donations', async (req, res) => {
  const donations = await Donation.find().sort({ createdAt: -1 });
  res.json(donations);
});

app.post('/api/donations', async (req, res) => {
  const donation = await Donation.create(req.body);
  res.status(201).json(donation);
});

app.put('/api/donations/:id/claim', async (req, res) => {
  const updated = await Donation.findByIdAndUpdate(
    req.params.id,
    { status: 'Claimed', claimedBy: req.body.claimedBy },
    { new: true }
  );
  res.json(updated);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));