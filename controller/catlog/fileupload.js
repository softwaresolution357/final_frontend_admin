const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');
const ObjectId = require('mongodb').ObjectID;

exports.UploadFile = async (req, res, next) => {
  const common = req.body.type;
  let photo = `photo_${ObjectId()}${path.parse(req.files.image.name).ext}`;

  uploadFile(req, res, req.files.image, photo, common);
};
const uploadFile = (req, res, fileName, photo, common) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_SECURITY_ID,
    secretAccessKey: process.env.AWS_SECURITY_SECRET,
  });
  const params = {
    Bucket: process.env.BucketName,
    Key: `${common}/${photo}`, // File name you want to save as in S3
    Body: fileName.data,
  };
  var s3upload = s3.upload(params).promise();
  return s3upload
    .then(function (data) {
      return res.status(201).json({
        success: true,
        photo: photo,
        message: `Image Upload Successfully`,
      });
    })
    .catch(function (err) {
      return res.status(400).json({
        success: false,
        message: `Image Upload Error`,
      });
    });
};
exports.DeletedFile = (req, res, next) => {
  deletedFileawsfile(res, req.params.type, req.params.id);
};
const deletedFileawsfile = async (res, common, file) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_SECURITY_ID,
    secretAccessKey: process.env.AWS_SECURITY_SECRET,
    region: process.env.REGION,
  });

  const params = {
    Bucket: process.env.BucketName,
    Key: `${common}/${file}`, // File name you want to save as in S3
  };
  // console.log(params);

  var s3upload = s3.deleteObject(params).promise();
  return s3upload
    .then(function (data) {
      return res.status(201).json({
        success: true,

        message: `Image Deleted Successfully`,
      });
    })
    .catch(function (err) {
      return res.status(400).json({
        success: false,
        message: `Error, when deleted image`,
      });
    });
};
