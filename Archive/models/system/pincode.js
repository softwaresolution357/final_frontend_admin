const mongoose = require('mongoose');

const pinCodeSchema = new mongoose.Schema({
  City: {
    type: String,
  },
  State: {
    type: String,
  },
  Country: {
    type: String,
  },
  Pincode: {
    type: Number,
  },
  COD: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
  Prepaid: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
  Delivery_Date: {
    type: Number,
  },
});

module.exports = mongoose.model('pincode', pinCodeSchema);
