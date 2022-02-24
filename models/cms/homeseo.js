const mongoose = require('mongoose');
const homepageSeo = new mongoose.Schema({
  metatitle: {
    type: String,
  },
  metakeyword: {
    type: String,
  },
  metadescription: {
    type: String,
  },
});
module.exports = mongoose.model('homepageseo', homepageSeo);
