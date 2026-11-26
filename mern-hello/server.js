const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/mernclass')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error:', err.message));

app.get('/', (req, res) => {
  const dbReady = mongoose.connection.readyState === 1;
  res.send(
    'Hello World from Express! MongoDB is ' +
      (dbReady ? 'connected' : 'not connected')
  );
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));