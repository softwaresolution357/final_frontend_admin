const categorymodel = require('../models/catlog/category');
const general = require('../models/system/general');
const brands = require('../models/catlog/brand');
const services = require('../models/cms/services');
const home = require('../models/cms/home');
const integration = require('../models/system/integration');
const currency = require('../models/system/currency');
const information = require('../models/cms/information');
const homepageseo = require('../models/cms/homeseo');
const futureproduct = require('../models/cms/futureproduct');
const newproduct = require('../models/cms/newproduct');
const contact = require('../models/cms/contactquery');
const register = require('../models/user/customer');
const address = require('../models/user/address');
exports.home = async (req, res, next) => {
  try {
    const homedata = await home.findOne();
  
    res.status(202).json({
      success: true,
      home: homedata !== null ? homedata:{},
    });
  } catch (err) {

    res.status(400).json({
      success: false,
      message: 'server response error',
    });
  }
};
exports.product = async (req, res, next) => {
  let product = '';
  let fainalproduct = '';
  if (req.params.product === 'newproducts') {
    product = await newproduct
      .findOne()

      .sort({ _id: -1 })
      .select('-__v -created')
      .populate({
        path: 'product',
        model: 'products',
        select: 'name mrp specialprice photo slug  description',
      });
  } else {
    product = await futureproduct
      .findOne()

      .sort({ _id: -1 })

      .select('-__v -created')
      .populate({
        path: 'product',
        model: 'products',
        select: 'name mrp specialprice photo slug  description',
      });
  }
  fainalproduct = product !==null ?product.product :[];
  
  const currencydata = await currency
    .findOne({ status: true })
    .select('symbol');
  res.status(200).json({
    success: true,
    product: fainalproduct,
    symbol: currencydata !== null ? currencydata.symbol :'',
  });
};
exports.Brands = async (req, res, next) => {
  const finalBrands = await brands
    .find({ status: 'true' })
    .select('logo name slug');
  const servicedata = await services
    .find()
    .limit(4)
    .select('service description icone');
  res.status(200).json({
    success: true,
    brand: finalBrands,
    service: servicedata,
  });
};
exports.Fotters = async (req, res, next) => {
  const categorydata = await categorymodel
    .find({
      category: 1,
      status: true,
    })
    .select('name slug _id');
  const informationdata = await information
    .find({ status: true })
    .select('name slug');
  const generaldata = await general.findOne();
  res.status(200).json({
    success: true,
    category: categorydata,
    information: informationdata,
    general: generaldata,
  });
};
exports.Information = async (req, res, next) => {
  const informationdata = await information
    .findOne({ slug: req.params.slug })
    .select(' name description ');
  const categorydata = await categorymodel.find({
    category: 1,
    status: true,
  });

  const subcategorydata = await categorymodel.find({
    category: 0,
    status: true,
  });
  const homedata = await home.findOne().select('header fotter favicon');
  res.status(200).json({
    success: true,
    information: informationdata,
    category: categorydata,
    subcategory: subcategorydata,
    home: homedata,
  });
};
exports.Contact = async (req, res, next) => {
  const contactdata = await contact.find({ status: true }).select('query _id');
  const generaldata = await general.findOne();

  res.status(200).json({
    success: true,
    contact: contactdata,
    general: generaldata,
  });
};
exports.ListAddress = async (req, res, next) => {
  const registerdata = await register.findOne({ _id: req.id });
  const addressdata = await address.find({
    _id: { $in: registerdata.address },
  });

  res.status(200).json({
    success: true,
    address: addressdata,
  });
};
exports.ProfileData = async (req, res, next) => {
  const registerdata = await register.findOne({ _id: req.id });
  res.status(200).json({
    success: true,
    data: registerdata,
  });
};
