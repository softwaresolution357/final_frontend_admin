const mongoose = require('mongoose');

const brands = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    lowercase: true,
  },
  brandidentitynumber: {
    type: String,
    lowercase: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  metatitle: {
    type: String,
    lowercase: true,
  },
  metadescription: {
    type: String,
    lowercase: true,
  },
  metatag: {
    type: String,
    lowercase: true,
  },
  photo: {
    type: String,
  },
  logo: {
    type: String,
  },
  status: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
  createDate: { type: Date, default: Date.now },
});
module.exports = mongoose.model('brands', brands);
