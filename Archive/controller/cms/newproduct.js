const products = require('../../models/catlog/products');
const futureproduct = require('../../models/cms/futureproduct');
const newproduct = require('../../models/cms/newproduct');
exports.getProductList = async (req, res, next) => {
  try {
    let productList = '';

    if (req.query.q == 'future') {
      productList = await futureproduct
        .findOne()
        .populate({ path: 'product', model: 'products', select: '_id name' });
    } else if (req.query.q == 'new') {
      productList = await newproduct
        .findOne()
        .populate({ path: 'product', model: 'products', select: '_id name' });
    }

    res.status(200).json({
      success: true,
      data: productList.product,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'no data found',
    });
  }
};
exports.postProductList = async (req, res, next) => {
  console.log(req.body);
  if (req.body.title == 'future') {
    const futureproductcount = await futureproduct.countDocuments();
    if (futureproductcount == 0) {
      await futureproduct.create({ product: JSON.parse(req.body.product) });
    } else {
      const data = await futureproduct.findOne();
      await futureproduct.findByIdAndUpdate(
        { _id: data._id },
        { product: JSON.parse(req.body.product) }
      );
    }
  } else if (req.body.title == 'new') {
    const newproductcount = await newproduct.countDocuments();
    if (newproductcount == 0) {
      await newproduct.create({ product: JSON.parse(req.body.product) });
    } else {
      const data = await newproduct.findOne();
      await newproduct.findByIdAndUpdate(
        { _id: data._id },
        { product: JSON.parse(req.body.product) }
      );
    }
  }
  res.status(200).json({
    success: true,
    message: 'Successfully Created Future data',
  });
};
exports.productDropdow = async (req, res, next) => {
  let new_prduct_list = '';

  const product_data = await products.find().select('name');

  if (req.query.q == 'future') {
    new_prduct_list = await futureproduct.findOne();
  } else {
    new_prduct_list = await newproduct.findOne();
  }
  const dropdown = [];
  for (const { _id: _id, name: name } of product_data) {
    const data = {
      value: _id,
      label: name,
    };
    dropdown.push(data);
  }

  res.status(200).json({
    success: true,
    data: dropdown,
    list: new_prduct_list === null ? [] : new_prduct_list.product,
  });
};
