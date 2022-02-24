const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  name: {
    type: String
  },
  url: {
    type: String
  },
  status: {
    type: String,
    enum: ['on', 'off'],
    default: 'on'
  },
  createDate: { type: Date, default: Date.now }
});
module.exports = mongoose.model('gallery', gallerySchema);
