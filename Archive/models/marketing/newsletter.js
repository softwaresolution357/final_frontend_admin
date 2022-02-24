const mongoose = require('mongoose');
const newsletter = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('newsletters', newsletter);
