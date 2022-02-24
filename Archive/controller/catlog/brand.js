const mongodb = require('mongodb');
const path = require('path');

const brands = require('../../models/catlog/brand');
const ObjectId = require('mongodb').ObjectID;
const product = require('../../models/catlog/products');
const { uploadFile, deletedFile } = require('../../component/fileUpload');

//Name: Sunil Kumar
//get brands
exports.postBrands = async (req, res) => {
  const data = {};

  const {
    name,
    description,
    slug,
    metaname,
    metadescription,
    metakeyword,
    status,
    image,
    logo,
  } = req.body;
  data.name = name;
  data.description = description;
  data.slug = slug;
  data.metatitle = metaname;
  data.metadescription = metadescription;
  data.metatag = metakeyword;
  data.status = status;
  if (image != '') {
    data.photo = image;
  }
  if (logo != '') {
    data.logo = logo;
  }

  const postData = await brands.create(data);
  if (!postData) {
    res.status(400).json({
      success: true,
      message: "data n't update",
    });
  }
  res.status(202).json({
    success: true,
    data: postData,
  });
};

exports.getBrands = async (req, res, next) => {
  try {
    const branddata = await brands
      .find()
      .sort({ _id: -1 })
      .select('_id name photo logo status');

    res.status(202).json({
      sucess: true,
      data: branddata,
    });
  } catch (err) {
    res.status(400).json({
      sucess: true,
      message: 'no datta found',
    });
  }
};

exports.deleteBrands = async (req, res, next) => {
  const image = req.query.image;
  const logo = req.query.logo;
  try {
    await deletedFile(req, res, image, 'brand');
    await deletedFile(req, res, logo, 'brand');
    const data = await brands.findByIdAndDelete({
      _id: ObjectId(`${req.params.id}`),
    });
    res.status(200).json({
      success: true,
      message: `Brand deleted successfully, The brand name is ${data.name}`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `Error Occoured ,When deleted brand`,
    });
  }
};

exports.singlestatusupdate = async (req, res, next) => {
  mongodb.ObjectID.isValid(req.params.id);
  // const count = category.findById(req.params.id);
  if (mongodb.ObjectID.isValid(req.params.id)) {
    const statusData = await brands.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!statusData) {
      return new ErrorResponse("Category n't update successfully", 404);
    }
    res.status(200).json({
      success: true,
      message: 'Update data successfully',
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'no such id found',
    });
  }
};
exports.singleview = async (req, res, next) => {
  data = {};
  const getSingleData = await brands.findById(req.params.id);

  const {
    name,
    description,
    slug,
    metadescription,
    metatitle,
    photo,
    metatag,
    logo,
    status,
  } = getSingleData;
  data.name = name;
  data.description = description;
  data.slug = slug;
  data.metadescription = metadescription;
  data.metatitle = metatitle;
  data.photo = photo;
  data.metatag = metatag;
  data.logo = logo;
  data.status = status;
  if (!getSingleData) {
    res.status(400).json({
      sucess: false,
      message: 'id not find',
    });
  }
  res.status(201).json({
    success: true,
    data: data,
  });
};
exports.updateBrand = async (req, res, next) => {
  const data = {};
  try {
    const {
      name,
      description,
      slug,
      metaname,
      metadescription,
      metakeyword,
      image,
      logo,
      status,
    } = req.body;
    data.name = name;
    data.description = description;
    data.slug = slug;
    data.metatitle = metaname;
    data.metadescription = metadescription;
    data.metatag = metakeyword;
    data.status = status;
    if (image != '') {
      data.photo = image;
    }
    if (logo != '') {
      data.logo = logo;
    }

    await brands.findByIdAndUpdate({ _id: req.params.id }, data, {
      new: true,
      runValidators: true,
    });
    res.status(202).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
    });
  }
};
//-------------------------------------------------------------------------------------------------------//
