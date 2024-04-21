// server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const PORT = process.env.PORT || 5001;

// Connection URL and database name
const url = 'mongodb+srv://shreyas:passcode@tinda.q783xqc.mongodb.net/?retryWrites=true&w=majority&appName=Tinda';
const dbName = 'Tinda';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
client.connect(err => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  console.log('Connected to MongoDB');

  // Use the specified database
  const db = client.db(dbName);
  const collection = db.collection('users');

  // Route for handling user signup
  app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    // Check if the email already exists
    collection.findOne({ email }, (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (user) {
        // Email already exists
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Insert the new user into the database
      collection.insertOne({ email, password }, (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        return res.status(201).json(result.ops[0]);
      });
    });
  });

  // Start the server
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
