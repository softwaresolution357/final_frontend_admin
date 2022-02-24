const mongoose = require('mongoose');
const replacerefundcansel = new mongoose.Schema({
  cancelby: {
    type: String,
    ref: 'register',
  },
  orderid: {
    type: String,
    ref: 'order',
  },
  ordertype: {
    type: String,
  },
  reason: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: [String],
  },
  lastupdatetime: {
    type: String,
  },
  createDate: { type: Date, default: Date.now() },
});
module.exports = mongoose.model('replacerefundcansel', replacerefundcansel);
