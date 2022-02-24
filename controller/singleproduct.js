const products = require('../models/catlog/products');
const review = require('../models/catlog/reviews')
const paymentlist = require('../models/system/payment');
const currency = require('../models/system/currency');

exports.frontendsingleProduct = async (req, res, next) => {
  const data = await products.findOne({ slug: req.params.slug });
  const start5 = await review.countDocuments({rattingvalue: '5'})
  const start4 = await review.countDocuments({rattingvalue: '4'})
  const start3 = await review.countDocuments({rattingvalue: '3'})
  const start2 = await review.countDocuments({rattingvalue: '2'})
  const start1 = await review.countDocuments({rattingvalue: '1'})

  const reviewdata = await review.find({productselect: data._id}).sort({_id:-1})
  const reviewImage =[];
  for(let i =0; i < reviewdata.length;i++){
    reviewImage.push(...reviewdata[i].photo)
  }
 
  const currencydata = await currency
    .findOne({ status: true })
    .select('symbol');

  res.status(202).json({
    success: true,
    item: data,
    symbol: currencydata != null ? currencydata.symbol:'',
    start5:start5,
    start4:start4,
    start3:start3,
    start2:start2,
    start1:start1,
    reviewImage:reviewImage,
    reviewdata:reviewdata,
  });
};
exports.relatedPrduct = async (req, res, next) => {
  const relatedproduct = await products
    .find({
      category: { $in: JSON.parse(req.params.category) },
    })
    .select('name mrp specialprice photo slug description')
    .limit(6);
  const currencydata = await currency
    .findOne({ status: true })
    .select('symbol');
  res.status(202).json({
    success: true,
    releted: relatedproduct,
    currency: currencydata,
  });
};
exports.BuyNow = async (req, res, next) => {
  const paymentdata = await paymentlist
    .find({ status: true })
    .sort({ shotorder: 1 })
    .select('method alternatename');
  const currencydata = await currency
    .findOne({ status: true })
    .select('symbol');
  res.status(202).json({
    success: true,
    payment: paymentdata,
    symbol:currencydata !== null ? currencydata.symbol :'',
  });
};
