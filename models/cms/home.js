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
  parallex: [
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
      parallex: {
        type: String,
      },
      shortorder:{
        type:Number
      }
    },
  ],
  
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
      shortorder:{
        type:Number
      }
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
      shortorder:{
        type:Number
      }
    },
  ],
});
module.exports = mongoose.model('home', home);
