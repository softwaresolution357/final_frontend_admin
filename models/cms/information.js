const mongoose = require('mongoose');

const information = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },

  description: {
    type: String,
  },
  status: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
  meta_name: {
    type: String,
  },
  metakey_word: {
    type: String,
  },
  meta_description: {
    type: String,
  },
  slug: {
    type: String,
  },
  show: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
  creating: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('information', information);
