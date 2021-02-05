const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the name'],
    trim: true,
  },
  email: {
    type: String,
    unique: [true, 'Please provide a valid email'],
    required: [true, 'Please provide the email'],
    trim: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'employer'],
  },
  otp: Number,
  expiresAt: {
    type: Number,
    select: false,
  },
  resume: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
