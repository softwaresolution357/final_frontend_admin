const categorymodel = require('../models/catlog/category');

exports.commonDataFetch = async (req, res, next) => {
  //--------------------------------------------------------------------------//
  const categorydata = await categorymodel
    .find()
    .select('name slug _id subcategory category');

  res.status(202).json({
    success: true,
    category: categorydata,
  });
};
