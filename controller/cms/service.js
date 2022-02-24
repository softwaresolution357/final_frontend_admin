const ObjectId = require('mongodb').ObjectID;
const path = require('path');
const services = require('../../models/cms/services');
const { uploadFile } = require('../../component/fileUpload');
exports.postService = async (req, res, next) => {
  try {
    await services.create(req.body);
    res.status(201).json({
      success: true,
      message: 'data created sucessfully',
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "you cann't created more than one document",
    });
  }
};

exports.getServices = async (req, res, next) => {
  try {
    const data = await services.find().select('-__v -created');

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {}
};
exports.getSingleService = async (req, res, next) => {
  try {
    const data = await services.findById({ _id: req.params.id });
    res.status(200).json({
      success: true,
      data: {
        service: data.service,
        description: data.description,
        shortdescription: data.shortdescription,
        icone: data.icone,
      },
    });
  } catch (err) {}
};
exports.putSingleService = async (req, res, next) => {
  try {
    await services.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(201).json({
      success: true,
      message: 'data created sucessfully',
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "you cann't created more than one document",
    });
  }
};
exports.deletedServices = async (req, res, next) => {
  try {
    await services.findByIdAndDelete({ _id: req.params.id });
    res.status(201).json({
      success: true,
      message: 'data created sucessfully',
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "you cann't created more than one document",
    });
  }
};
