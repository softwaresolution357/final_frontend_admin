const mongoose = require('mongoose');

const services = new mongoose.Schema({
  service: {
    type: String,
  },
  description: {
    type: String,
  },
  icone: {
    type: String,
  },
  status: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },

  created: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('services', services);
