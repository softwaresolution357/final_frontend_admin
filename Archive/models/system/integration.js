const mongoose = require('mongoose');

const integrationSchema = new mongoose.Schema({
  facebook: {
    type: Number,
  },
  google: {
    type: String,
  },
  googleconversion: {
    type: String,
  },
  external: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('integraiotn', integrationSchema);
