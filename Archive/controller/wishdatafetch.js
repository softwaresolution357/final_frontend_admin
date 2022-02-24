const products = require('../models/catlog/products');
const categorymodel = require('../models/catlog/category');
const currency = require('../models/system/currency');
const home = require('../models/cms/home');
const integration = require('../models/system/integration');
exports.WishDataFetch = async (req, res, next) => {
  const product_wish = JSON.parse(req.query.wish);
  const fainal_wish_data = [];
  for (let i = 0; i < product_wish.length; i++) {
    const product_data = await products.findOne({ _id: product_wish[i].id });
    const data = {
      id: product_data._id,
      name: product_data.name,
      photo: product_data.photo,
      mrp: product_data.mrp,
      quantity: product_data.quantity,
      specialprice: product_data.specialprice,
      prepaidprice: product_data.prepaidprice,
      prepaidshipmentprice: product_data.prepaidshipmentprice,
      codshipamount: product_data.codshipamount,
      tax: product_data.tax,
      prepaid: product_data.prepaid,
      slug: product_data.slug,
      qty: product_wish[i].qty,
      varient1: product_wish[i].varient1,
      varient2: product_wish[i].varient2,
      varient3: product_wish[i].varient3,
      vientqunatity: product_data.quantity,
    };
    fainal_wish_data.push(data);
  }
  const categorydata = await categorymodel.find({
    category: 1,
    status: true,
  });

  const subcategorydata = await categorymodel.find({
    category: 0,
    status: true,
  });
  const currencydata = await currency
    .findOne({ status: true })
    .select('symbol');
  const homedata = await home.findOne().select('header fotter favicon');
  const integrationdata = await integration
    .findOne()
    .select('facebook google googleconversion external');
  res.status(202).json({
    success: true,
    wishitem: fainal_wish_data,
    currency: currencydata,
    category: categorydata,
    subcategory: subcategorydata,
    home: homedata,
    integration: integrationdata,
  });
};
