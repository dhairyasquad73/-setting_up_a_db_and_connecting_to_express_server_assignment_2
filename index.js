require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./schema');
const bodyParser = require('body-parser');

const app = express();
const port = 3010;

const URL=process.env.URL || "mongodb+srv://dhairyajangirs73:dhairyaAss2@cluster0.xiz4v.mongodb.net/";
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Error connecting to database:', err));

app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Validation error: All fields are required' });
    }
    
    const newUser = new User({ name, email, password });
    await newUser.save();
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

