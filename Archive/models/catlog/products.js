const mongoose = require('mongoose');

const products = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  model: {
    type: String,
  },
  SKU: {
    type: String,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  OutofStock: {
    type: String,
    enum: ['sold', 'pre'],
    default: 'pre',
  },
  weight: {
    type: Number,
    default: 0,
  },
  unit: {
    type: String,
  },
  COD: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
  status: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
  photo: {
    type: [String],
  },
  descriptionphoto:{
    type: [String],
  },
  mrp: {
    type: Number,
    default: 0,
  },
  specialprice: {
    type: Number,
    default: 0,
  },
  prepaidprice: {
    type: Number,
    default: 0,
  },
  prepaidshipmentprice: {
    type: Number,
    default: 0,
  },
  codshipamount: {
    type: Number,
    default: 0,
  },
  tax: {
    type: Number,
    default: 0,
  },
  prepaid: {
    type: Number,
    default: 0,
  },
  metaname: {
    type: String,
  },
  metadescription: {
    type: String,
  },
  metakeyword: {
    type: String,
  },
  slug: {
    type: String,
  },
  sizes: [
    {
      size: {
        type: String,
      },
      price: {
        type: Number,
      },
      image: [
        {
          type: String,
        },
      ],
      quantity: {
        type: Number,
      },
    },
  ],
  colors: [
    {
      color: {
        type: String,
      },
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
      image: [
        {
          type: String,
        },
      ],
    },
  ],
  others: [
    {
      other: {
        type: String,
      },
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
    },
  ],

  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
    },
  ],
  brand: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'brands',
    },
  ],
  specification: [
    {
      title: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  ],
  videolink: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('products', products);
