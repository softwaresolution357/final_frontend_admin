const galleryModel = require('../../models/extra/gallery');
const ObjectId = require('mongodb').ObjectID;
const { uploadFile, deletedFile } = require('../../component/fileUpload');
const { uploadMp4File } = require('../../component/videoUpload');
const path = require('path');
const fs = require('fs');
exports.postGalary = async (req, res, next) => {
  const gallery = {};
  const { name } = req.files.file;
  const count = await galleryModel.countDocuments({ name: name });
  if (count == 0) {
    gallery.name = name;
    if (path.parse(req.files.file.name).ext === '.mp4') {
      const URL = req.files.file.name;
      await uploadMp4File(req, res, req.files.file, URL, 'media');
      gallery.url = URL;
    } else {
      const URL = req.files.file.name;
      await uploadFile(req, res, req.files.file, URL, 'media');
      gallery.url = URL;
    }
  } else {
    const count = await galleryModel.countDocuments({
      name: { $regex: name.split('.')[0], $options: 'i' },
    });
    gallery.name = name.split('.')[0] + '-' + count + '.' + name.split('.')[1];
    if (path.parse(req.files.file.name).ext === '.mp4') {
      const URL = name.split('.')[0] + '-' + count + '.' + name.split('.')[1];
      await uploadMp4File(req, res, req.files.file, URL, 'media');
      gallery.url = URL;
    } else {
      const URL = name.split('.')[0] + '-' + count + '.' + name.split('.')[1];
      await uploadFile(req, res, req.files.file, URL, 'media');
      gallery.url = URL;
    }
  }

  const galleryData = await galleryModel.create(gallery);
  const data = {};

  data.name = galleryData.name;
  data._id = galleryData._id;
  data.url = galleryData.url;
  res.status(201).json({
    sucess: true,
    data: data,
  });
};
exports.getGallery = async (req, res, next) => {
  try {
    const gallerydata = await galleryModel
      .find()
      .sort({ _id: -1 })
      .select('-__v -createDate -status');
    if (!gallerydata) {
      res.status(400).json({ success: false, message: 'No data found' });
    }

    res.status(202).json({
      success: true,
      data: gallerydata,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: 'No data found' });
  }
};
exports.deleteGallery = async (req, res, next) => {
  console.log(req.params.id, req.query.deleteImage);
  await deletedFile(req, res, req.query.deleteImage, 'media');
  await galleryModel.findByIdAndDelete(
    {
      _id: ObjectId(`${req.params.id}`),
    },
    (err, doc) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "data n't deleted",
        });
      }

      return res.status(201).json({
        success: true,
        message: doc,
      });
    }
  );
};
