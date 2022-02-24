const mongoose = require('mongoose');

const status = new mongoose.Schema({
  name: {
    type: String,
  },
  status: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
  dropdown: [{ type: String }],
  created: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('addstatus', status);
