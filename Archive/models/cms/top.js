const mongoose = require('mongoose');
const top = new mongoose.Schema({
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

  image: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('top', top);
