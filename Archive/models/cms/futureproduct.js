const mongoose = require('mongoose');
const futureproducts = new mongoose.Schema({
  product: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'products' }],
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('futureproducts', futureproducts);
