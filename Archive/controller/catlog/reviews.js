const reviews = require('../../models/catlog/reviews');
const productModel = require('../../models/catlog/products');
exports.postAdminReviews = async (req, res, next) => {
  try {
    const {
      productselect,
      reviewname,
      review,
      like,
      dislike,
      reviewdate,
      rattingvalue,
      photo,
    } = req.body;
    const data = await reviews.create({
      productselect: productselect,
      reviewname: reviewname,
      review: review,
      like: like,
      dislike: dislike,
      reviewdate: reviewdate,
      rattingvalue: rattingvalue,
      photo: JSON.parse(photo),
    });
    if (!data) {
      res.status(400).json({
        success: false,
        message: 'No data found',
      });
    }
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'No data found',
    });
  }
};
exports.getAdminReviews = async (req, res, next) => {
  const review_data = await reviews
    .find()
    .populate({ path: 'productselect', model: 'products' });
  
  const fainal_review_data = [];
  for (const {
    _id: _id,
    productselect: productselect,
    reviewname: reviewname,
    review: review,
    like: like,
    dislike: dislike,
    reviewdate: reviewdate,
    rattingvalue: rattingvalue,
  } of review_data) {
    const data = {
      _id: _id,
      product: productselect !== null ? productselect.name : '',
      customer: reviewname,
      like: like,
      dislike: dislike,
      date: reviewdate,
      ratting: rattingvalue,
    };
    fainal_review_data.push(data);
  }
  res.status(200).json({
    success: true,
    data: fainal_review_data,
  });
};
exports.productReview = async (req, res, next) => {
  console.log(req);
};
exports.prductListDropdow = async (req, res, nex) => {
  const review_data = await productModel.find().select('name');
  const dropdown = [];
  for (const { _id: _id, name: name } of review_data) {
    const data = {
      value: _id,
      label: name,
    };
    dropdown.push(data);
  }
  res.status(200).json({
    success: true,
    data: dropdown,
  });
};
exports.SingleReview = async (req, res, next) => {
  const review_single_data = await reviews.findOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    singledata: {
      product: review_single_data.productselect,
      review: review_single_data.review,
      reviewname: review_single_data.reviewname,
      like: review_single_data.like,
      dislike: review_single_data.dislike,
      reviewdate: review_single_data.reviewdate,
      rattingvalue: review_single_data.rattingvalue,
      photo: review_single_data.photo,
      status: review_single_data.status,
    },
  });
};
exports.putSingReview = async (req, res, next) => {
  try {
    const data = await reviews.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    if (!data) {
      res.status(400).json({
        success: false,
        message: 'No data found',
      });
    }
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'No data found',
    });
  }
};
exports.deleteSingleReview = async (req, res, next) => {
  await reviews.findByIdAndDelete({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(400).json({
        success: false,
      });
    }
    res.status(200).json({
      success: true,
    });
  });
};
