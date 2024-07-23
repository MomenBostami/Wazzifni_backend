const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// Get user data
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update user data
router.post('/update', auth, async (req, res) => {
  const { name, universityName, major, location, year, phoneNumber, business } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.name = name || user.name;
    user.universityName = universityName || user.universityName;
    user.major = major || user.major;
    user.location = location || user.location;
    user.year = year || user.year;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.business = business || user.business;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
