const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  method: {
    type: String,
  },
  alternatename: {
    type: String,
  },
  id: {
    type: String,
  },
  key: {
    type: String,
  },
  WEBSITE: {
    type: String,
  },
  INDUSTRY_TYPE_ID: {
    type: String,
  },
  CHANNEL_ID: {
    type: String,
  },
  salt: {
    type: String,
  },
  status: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },
  shotorder: {
    type: Number,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('payment', paymentSchema);
