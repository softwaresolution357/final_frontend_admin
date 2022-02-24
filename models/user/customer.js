const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const ObjectId = mongoose.Schema.ObjectId;
const jwt = require('jsonwebtoken');
const registerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  mobile: {
    type: Number,
  },

  email: {
    type: String,
  },
  password: {
    type: String,
    select: false,
  },
  addressid: {
    type: ObjectId,
  },
  billing: {
    type: String,
  },
  shipping: {
    type: String,
  },
  address: [
    {
      type: ObjectId,
      ref: 'address',
    },
  ],
  wishlist: [
    {
      type: ObjectId,
      ref: 'products',
    },
  ],
  cartlist: [
    {
      type: ObjectId,
      ref: 'cart',
    },
  ],
  order: [{ type: ObjectId, ref: 'order' }],
  newsletter: {
    type: Boolean,
    status: [true, false],
    default: false,
  },
  createDate: { type: Date, default: Date.now },
});

registerSchema.pre('save', async function (next) {
  const salt = await bcryptjs.genSalt(10);

  this.password = await bcryptjs.hash(this.password, salt);
  next();
});
// sign JWT
registerSchema.methods.getSignedJwtWebToken = () => {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
// match enter password
registerSchema.methods.passwordVlidationCheck = async function (enterPassword) {
  return await bcryptjs.compare(enterPassword, this.password);
};

module.exports = mongoose.model('register', registerSchema);
