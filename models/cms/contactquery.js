const mongoose = require('mongoose');
const contactquerylist = new mongoose.Schema({
  email: {
    type: String,
  },
  query: {
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
});

module.exports = mongoose.model('contactquerylist', contactquerylist);
