const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');


const adminSchema = mongoose.Schema({
  name: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  user: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    select: false,
  },
  role: {
    type: String,
    enum: ['analyzer', 'admin','super user'],
  },
  path:[{type: String}],
  image:{
    type:String,
  },
  dob:{
    type:Date,
  },
  linkedin:{
    type:String,
  },
  twitter:{
    type:String,
  },
  facebook:{
    type:String,
  },
  createdDeate: {
    type: Date,
    default: new Date(),
  },
});
adminSchema.pre('save', async function (next) {
  const salt = await bcryptjs.genSalt(10);

  this.password = await bcryptjs.hash(this.password, salt);
  next();
});
// sign JWT
adminSchema.methods.getSignedJwtWebToken = () => {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
// match enter password
adminSchema.methods.passwordVlidationCheck = async function (enterPassword) {
  return await bcryptjs.compare(enterPassword, this.password);
};
module.exports = mongoose.model('admin', adminSchema);
