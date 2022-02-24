const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  billing: {
    type: String,
  },
  shipping: {
    type: String,
  },
  addressid: {
    type: String,
  },
  status: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('address', addressSchema);
