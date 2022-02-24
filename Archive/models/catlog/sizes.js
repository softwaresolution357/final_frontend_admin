const mongoose = require('mongoose');
const addsizes = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
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
module.exports = mongoose.model('addsizes', addsizes);
