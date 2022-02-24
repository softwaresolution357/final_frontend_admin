const products = require('../models/catlog/products');
const categorymodel = require('../models/catlog/category');
const currency = require('../models/system/currency');
const home = require('../models/cms/home');
const integration = require('../models/system/integration');
exports.CartDataFetch = async (req, res, next) => {
 
  const product_cart = JSON.parse(req.query.cart);
  const remove_cart = [];

  for (let i = 0; i < product_cart.length; i++) {
    const data_cart = await products.findOne({ _id: product_cart[i].id });

    if (data_cart == null) {
      product_cart.splice(i, 1);
      remove_cart.push(i);
    }
  }

  const fainal_cart_data = [];
  for (let i = 0; i < product_cart.length; i++) {
    const product_data = await products.findOne({ _id: product_cart[i].id });
    const data = {
      id: product_data._id,
      name: product_data.name,
      photo: product_data.photo,
      mrp: product_data.mrp,
      prepaidshipmentprice: product_data.prepaidshipmentprice,
      codshipamount: product_data.codshipamount,
      tax: product_data.tax,
      specialprice: product_data.specialprice,
      prepaidprice: product_data.prepaidprice,
      slug: product_data.slug,
      qty: product_cart[i].qty,

      varient1: product_cart[i].varient1,
      varient2: product_cart[i].varient2,
      varient3: product_cart[i].varient3,
      vientqunatity: product_data.quantity,
    };
    fainal_cart_data.push(data);
  }

  const currencydata = await currency
    .findOne({ status: true })
    .select('symbol');

  res.status(202).json({
    success: true,
    cartItems: fainal_cart_data,
    symbol:currencydata !== null ? currencydata.symbol:'',
    cart: remove_cart,
  });
};
