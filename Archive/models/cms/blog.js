const mongoose = require('mongoose');
const blog = new mongoose.Schema({
  blogname: {
    type: String,
  },
  createdby: {
    type: String,
  },
  shortdescription: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: [String],
  },
  creted: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('blog', blog);
