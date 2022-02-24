const mongoose = require('mongoose');
const ReviewSchema = mongoose.Schema({
  porductid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'product',
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  short: {
    type: String,
  },
  createDate: {
    type: Date,
    defaut: Date.now(),
  },
});

module.exports = mongoose.model('product', ReviewSchema);
