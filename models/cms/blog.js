const mongoose = require('mongoose');
const blog = new mongoose.Schema({
  blogname:  {
    type: String,
  },
 bloguser:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'admin',
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
  blogimage: [{ 
    type: String,
  }],
  blogreviews: [
    {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'reviewsction',
    },
  ],
blogdate:{
  type:String,
},
bloglink :[
  {
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'reviewblogmenu',
  },
],
 blogstatus:{
  type:Boolean,
  enum:[true,false],
  default:true,
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
slug: {
  type: String,
  lowercase: true,
},
  creted: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('blog', blog);
