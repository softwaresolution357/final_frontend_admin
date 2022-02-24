const mongoose = require('mongoose');
const reviews = new mongoose.Schema({
  description: {
    type: String,
  },
  link: {
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
  image: {
    type: String,
  },
  create: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('review', reviews);
