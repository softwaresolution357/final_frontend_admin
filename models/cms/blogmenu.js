const mongoose = require('mongoose');

const reviewBlog = new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
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
      slug:{
        type: String,
      },
      status: {
        type: Boolean,
        enum: [true, false],
        default: false,
      },
      createDate: { type: Date, default: Date.now },
})

module.exports = mongoose.model('reviewblogmenu',reviewBlog)