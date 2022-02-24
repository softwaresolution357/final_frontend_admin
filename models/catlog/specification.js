const mongoose = require('mongoose');

const specification = new mongoose.Schema({
  title: {
    type: String,
  },
  value: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('specification', specification);
