const mongoose = require('mongoose');

const InformationSchema = new mongoose.Schema({
  storename: {
    type: String,
    unique: true,
  },
  bissnessname: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  mobile: {
    type: Number,
    unique: true,
  },
  storeaddress: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  state: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('infomatiom', InformationSchema);
