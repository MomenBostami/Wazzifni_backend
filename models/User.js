const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Business Manager', 'University Student'],
    required: true,
  },
  name:{
    type: String,
    required: true,
  } ,
  universityName: String,
  major: String,
  location: String,
  year: String,
  phoneNumber: String,
  business: String,
});

module.exports = mongoose.model('User', UserSchema);
