const categorymodel = require('../models/catlog/category');
const products = require('../models/catlog/products');
const brands = require('../models/catlog/brand');
const colors = require('../models/catlog/colors');
const currency = require('../models/system/currency');
const home = require('../models/cms/home');
const integration = require('../models/system/integration');
const futureproduct = require('../models/cms/futureproduct');
const newproduct = require('../models/cms/newproduct');

exports.LestSticky = async (req, res, next) => {
  const colorsdata = await colors.find().select('-__v -_id -created -status');
  const finalBrands = await brands
    .find({ status: 'true' })
    .select('-__v -createDate -status');

  const max = await products.findOne().sort({ mrp: -1 }).limit(1); // for MAX
 
  const min = await products
    .findOne()
    .sort({ mrp: +1 })
    .limit(1);
 
  res.status(202).json({
    success: true,
    color: colorsdata,
    brand: finalBrands,
    max: max.mrp,
    min: min.mrp,
  });
};
exports.CollectionProduct = async (req, res, next) => {
  
  let product = [];
  let single = {};
  let length = '';
  if (req.query.collection == 'collection') {
    single = await categorymodel.findOne({ slug: req.params.slug });

    product = await products
      .find({ category: { $in: [single._id] } })
      .select('name mrp specialprice photo slug others colors sizes brand description')
      .skip(req.query.skip * 1)
      .limit(10)
      .populate({ path: 'brand', model: 'brands', select: 'name' })
      .populate({
        path: 'colors',
        model: 'colors',
        select: 'color quantity',
        match: { quantity: { $gt: 0 } },
      });
    length = await products.countDocuments({ category: { $in: [single._id] } });
  
  } else if (req.query.collection == 'brands') {
    single = await brands
      .findOne({ slug: req.params.slug })

      .skip(parseInt(req.query.element))
      .limit(parseInt(req.query.size));

    product = await products
      .find({ brand: { $in: [single._id] } })
      .select('name mrp specialprice photo slug others colors sizes brand')
      .populate({ path: 'brand', model: 'brands', select: 'name' })

      .populate({
        path: 'colors',
        model: 'colors',
        select: 'color quantity',
        match: { quantity: { $gt: 0 } },
      });
    length = await products.countDocuments({ brand: { $in: [single._id] } });
  } else if (req.query.collection == 'featureproducts') {
    const feature = await futureproduct
      .find()
      .sort({ _id: -1 })
      .skip(parseInt(req.query.element))
      .limit(parseInt(req.query.size))
      .select('-__v -created')
      .populate({
        path: 'product',
        model: 'products',
        select: 'name mrp specialprice photo slug others colors sizes brand description',
        populate: [
          { path: 'brand', model: 'brands' },
          {
            path: 'colors',
            model: 'colors',
            select: 'color quantity',
            match: { quantity: { $gt: 0 } },
          },
        ],
        options: {
          skip: parseInt(req.query.skip * 1),
          limit: parseInt(10),
        },
      });

    product = feature[0].product;
    const featcount = await futureproduct.findOne()
    length = featcount.product.length
  } else if (req.query.collection == 'newproducts') {
    const newp = await newproduct
      .find()
      .sort({ _id: -1 })
      .select('-__v -created')
      .populate({
        path: 'product',
        model: 'products',
        select: 'name mrp specialprice photo slug others colors sizes brand description',
        populate: [
          { path: 'brand', model: 'brands', select: 'name' },
          {
            path: 'colors',
            model: 'colors',
            select: 'color quantity',
            match: { quantity: { $gt: 0 } },
          },
        ],
        options: {
          skip: parseInt(req.query.skip * 1),
          limit: parseInt(10),
        },
      });

    product = newp[0].product;
 const newcount = await newproduct
 .findOne()
  console.log(newcount.product.length)
    length = newcount.product.length
  
  } else if (req.query.collection == 'search') {
    if (req.params.slug == 'undefined') {
      product = await products
        .find()
        .skip(req.query.skip * 1)
      .limit(10)
        .select('name mrp specialprice photo slug others colors sizes brand description')
        .populate({ path: 'brand', model: 'brands', select: 'name' })
        .populate({
          path: 'colors',
          model: 'colors',
          select: 'color quantity',
          match: { quantity: { $gt: 0 } },
        });
      console.log(product.length)
      length = await products.countDocuments();
    } else {
      product = await products
        .find({
          name: {
            $regex: new RegExp('^' + req.params.slug.toLowerCase(), 'i'),
          },
        })
       .skip(req.query.skip * 1)
      .limit(10)
        .select('name mrp specialprice photo slug others colors sizes brand description')
        .populate({ path: 'brand', model: 'brands', select: 'name' })
        .populate({
          path: 'colors',
          model: 'colors',
          select: 'color quantity',
          match: { quantity: { $gt: 0 } },
        });

      length = await products.countDocuments({
        name: { $regex: new RegExp('^' + req.params.slug.toLowerCase(), 'i') },
      });
    }
  }
  const currencydata = await currency
    .findOne({ status: true })
    .select('symbol');
  
  res.status(202).json({
    success: true,
    collection: single,
    product: product,
    symbol: currencydata.symbol,
    length: length,
  });
};
exports.CollectionInformation = async (req, res, next) => {
  let single = {};

  if (req.params.type == 'collection') {
    single = await categorymodel.findOne({ slug: req.params.slug });
  } else if (req.params.type == 'brands') {
    single = await brands.findOne({ slug: req.params.slug });
  }
  const currencydata = await currency
    .findOne({ status: true })
    .select('symbol');
  const colorsdata = await colors.find().select('-__v -_id -created -status');
  const finalBrands = await brands
    .find({ status: 'true' })
    .select('-__v -createDate -status');

  const max = await products.findOne().sort({ mrp: -1 }).limit(1); // for MAX
  const min = await products
    .findOne()
    .sort({ mrp: +1 })
    .limit(1);

  res.status(202).json({
    success: true,
    collection: {
      name:single.name,
      metaname:single.metatitle,
      metadescription:single.metadescription,
      metakeyword:single.metakeyword,
    },
    currency: currencydata,
    color: colorsdata,
    brand: finalBrands,
    max: max.mrp,
    min: min.mrp,
  });
};
