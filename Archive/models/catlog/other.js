const mongoose = require('mongoose');

const others = new mongoose.Schema({
  other: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },

  created: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('others', others);
