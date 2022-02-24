const mongoose = require('mongoose');
const category = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters'],
  },
  category: {
    type: Number,
    enum: [1, 0],
    default: 1,
  },

  description: {
    type: String,
    lowercase: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  subcategory: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'category',
    },
  ],

  metatitle: {
    type: String,
    lowercase: true,
  },
  metakeyword: {
    type: String,
    lowercase: true,
    default: null,
  },
  metadescription: {
    type: String,
    lowercase: true,
  },
  status: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },
  show: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },
  photo: {
    type: String,
  },
  createDate: { type: Date, default: Date.now },
});
module.exports = mongoose.model('category', category);
