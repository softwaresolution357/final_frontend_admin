const mongoose = require('mongoose');

const subScriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('subscription', subScriptionSchema);
