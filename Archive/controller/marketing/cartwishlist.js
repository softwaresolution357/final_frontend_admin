const cart = require('../../models/marketing/cart');

// exports.cartWishlist = async (req, res, next) => {
//   console.log(req);
// };

exports.getCartWishlist = async (req, res, next) => {
  try {
    const fainalData = [];
    const data = await cart
      .find()
      .populate({ path: 'customerid', model: 'register', select: 'name' })
      .populate({ path: 'product', model: 'products', select: 'name qty sum' });
    for (const {
      _id: _id,
      product: product,
      customerid: customerid,
      qty: qty,
      sum: sum,
    } of data) {
      const data = {
        _id: _id,
        name: product.name,
        customer: customerid.name,
        quantity: qty,
        total: sum,
      };
      fainalData.push(data);
    }

    if (!data) {
      res.status(400).json({
        success: false,
        message: 'no data found',
      });
    }
    res.status(202).json({
      success: true,
      data: fainalData,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "don't find any data",
    });
  }
};
