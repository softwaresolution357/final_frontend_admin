const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  email: {
    type: String,
  },
  reason: {
    type: String,
    ref: 'contactquerylist',
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
  },
  careated: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('contactus', contactSchema);
