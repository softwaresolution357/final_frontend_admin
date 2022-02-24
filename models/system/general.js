const mongoose = require('mongoose');

const generalSchema = new mongoose.Schema({
  storename: {
    type: String,
  },
  bissnesstorename: {
    type: String,
  },
  address: {
    type: String,
  },
  description: {
    type: String,
  },
  email: {
    type: String,
  },
  customeremail: {
    type: String,
  },
  supportemail: {
    type: String,
  },
  mobile: {
    type: String,
  },
  customeremobile: {
    type: String,
  },
  supportemobile: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  GST: {
    type: String,
  },
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  instagram: {
    type: String,
  },
  linked: {
    type: String,
  },
  firstshipping: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },
  freeshipping: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('general', generalSchema);
