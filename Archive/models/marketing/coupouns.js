const mongoose = require('mongoose');

const couponsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  code: {
    type: String,
  },
  amount: {
    type: Number,
  },
  start: {
    type: Date,
  },
  ending: {
    type: Date,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('coupons', couponsSchema);
