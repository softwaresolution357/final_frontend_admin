const categorymodel = require('../models/catlog/category');
const home = require('../models/cms/home');
const homepageseo = require('../models/cms/homeseo');
const currency = require('../models/system/currency');
const integration = require('../models/system/integration');
const products = require('../models/catlog/products');
exports.homeCategory = async (req, res, next) => {
  const categorydata = await categorymodel
    .find({
      category: 1,
      status: true,
    })
    .select('name slug _id');

  const subcategorydata = await categorymodel
    .find({
      category: 0,
      status: true,
    })
    .select('name slug _id');
  res.status(202).json({
    success: true,
    category: categorydata,
    subcategory: subcategorydata,
  });
};
exports.homePage = async (req, res, next) => {
  const homedata = await home
    .findOne()
    .populate({
      path: 'top',
      model: 'top',
      select: '-_id -status -created -__v',
      match: { status: true },
    })
    .populate({
      path: 'banner',
      model: 'banner',
      select: '-_id -status -created -__v',
      match: { status: true },
    });
  const homeseo = await homepageseo.findOne().select('-__v -_id');
  res.status(202).json({
    success: true,
    home: homedata,
    homeseo: homeseo,
  });
};
exports.Currency = async (req, res, next) => {
  const currencydata = await currency
    .findOne({ status: true })
    .select('symbol');
  res.status(200).json({
    success: true,

    data: currencydata,
  });
};
exports.Integration = async (req, res, next) => {
  const integrationdata = await integration.findOne();

  res.status(200).json({
    success: true,

    data: integrationdata,
  });
};
exports.ProductItem = async (req, res, next) => {
  const data = await products
    .findOne({ slug: req.params.slug })
    .populate({
      path: 'sizes',
      model: 'sizes',
      match: { quantity: { $gt: 0 } },
      select: 'size quantity',
    })
    .populate({
      path: 'colors',
      model: 'colors',
      match: { quantity: { $gt: 0 } },
      select: 'color quantity',
    })
    .populate({
      path: 'others',
      model: 'others',
      match: { quantity: { $gt: 0 } },
      select: 'other quantity',
    })
    .populate({ path: 'brand', model: 'brands', select: 'name' })
    .populate({
      path: 'specification',
      model: 'specification',
      select: 'title value',
    });
  res.status(200).json({
    success: true,

    data: data,
  });
};
exports.Common = async (req, res, next) => {
  const homedata = await home.findOne().select('header fotter favicon');
  res.status(200).json({
    success: true,

    data: homedata,
  });
};
