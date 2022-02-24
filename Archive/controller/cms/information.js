const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const path = require('path');
const information = require('../../models/cms/information');
const { uploadFile } = require('../../component/fileUpload');

exports.postInforation = async (req, res, next) => {
  try {
    const information_data = await information.create(req.body);
    if (!information_data) {
      res.status(400).json({
        success: false,
        message: 'no data created',
      });
    }
    res.status(201).json({
      success: true,
      message: 'data created success fully',
      data: information_data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
exports.getInformation = async (req, res, next) => {
  try {
    const information_data = await information
      .find()
      .select('_id name status show')
      .sort({ _id: -1 });

    res.status(200).json({
      success: true,
      data: information_data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'no data',
    });
  }
};
exports.singInformationViewing = async (req, res, next) => {
  try {
    const data = await information.findById({ _id: req.params.id });
    res.status(200).json({
      success: true,
      data: {
        name: data.name,
        description: data.description,
        meta_name: data.name,
        metakey_word: data.metakey_word,
        meta_description: data.meta_description,
        slug: data.slug,
        status: data.status,
        show: data.show,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'No data found',
    });
  }
};
exports.putSingInformation = async (req, res, next) => {
  try {
    const information_data = await information.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    if (!information_data) {
      res.status(400).json({
        success: false,
        message: 'no data created',
      });
    }
    res.status(201).json({
      success: true,
      message: 'data created success fully',
      data: information_data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
exports.updataStatusInformation = async (req, res, next) => {
  if (mongodb.ObjectID.isValid(req.params.id)) {
    const statusData = await information.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
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
exports.singleUpdateSwitch = async (req, res, next) => {
  // const count = category.findById(req.params.id);
  if (mongodb.ObjectID.isValid(req.params.id)) {
    console.log(req.body.status);
    const statusData = await information.findByIdAndUpdate(
      req.params.id,
      { show: req.body.status },
      {
        new: true,
        runValidators: true,
      }
    );
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
exports.deletedInformation = async (req, res, next) => {
  await information.findByIdAndDelete({ _id: req.params.id }, (err, doc) => {
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
