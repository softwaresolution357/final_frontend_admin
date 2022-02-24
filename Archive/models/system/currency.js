const mongoose = require('mongoose');

const currency = new mongoose.Schema({
  symbol: {
    type: String,
    unique: true,
  },
  status: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },
  create: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('currency', currency);
