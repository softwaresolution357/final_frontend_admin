const mongoose = require('mongoose');

const home = new mongoose.Schema({
  header: {
    type: String,
  },
  fotter: {
    type: String,
  },
  favicon: {
    type: String,
  },
  parallex: {
    type: String,
  },
  parallexdescription: {
    type: String,
  },
  top: [
    {
      description: {
        type: String,
      },
      link: {
        type: String,
      },
      status: {
        type: Boolean,
        enum: [true, false],
        default: true,
      },
      top: {
        type: String,
      },
    },
  ],
  banner: [
    {
      description: {
        type: String,
      },
      link: {
        type: String,
      },
      status: {
        type: Boolean,
        enum: [true, false],
        default: true,
      },
      banner: {
        type: String,
      },
    },
  ],
});
module.exports = mongoose.model('home', home);
