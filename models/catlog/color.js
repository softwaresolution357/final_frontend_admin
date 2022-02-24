const mongoose = require('mongoose');

const colors = new mongoose.Schema({
  color: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  image: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('colors', colors);
