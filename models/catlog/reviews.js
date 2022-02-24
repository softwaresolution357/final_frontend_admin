const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
  productselect: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
  reviewname: {
    type: String,
  },
  review: {
    type: String,
  },
  like: {
    type: Number,
  },
  dislike: {
    type: Number,
  },
  reviewdate: {
    type: String,
  },
  rattingvalue: {
    type: Number,
  },
  photo: [
    {
      type: String,
    },
  ],
  status: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
  creating: {
    type: Date,
  },
});

module.exports = mongoose.model('reviews', reviewsSchema);
