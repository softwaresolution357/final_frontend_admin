const AWS = require('aws-sdk');

exports.uploadFile = async (req, res, fileName, photo, common) => {
  // Read content from the file
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_SECURITY_ID,
    secretAccessKey: process.env.AWS_SECURITY_SECRET,
  });

  const params = {
    Bucket: process.env.BucketName,
    Key: `${common}/${photo}`, // File name you want to save as in S3
    Body: fileName.data,
  };

  await s3
    .upload(params, function (err, data) {
      if (err) {
        throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
      resolve(data);
    })
    .promise();
};
exports.deletedFile = async (req, res, file, common) => {
  // Read content from the file
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_SECURITY_ID,
    secretAccessKey: process.env.AWS_SECURITY_SECRET,
    region: process.env.REGION,
  });

  const params = {
    Bucket: process.env.BucketName,
    Key: `${common}/${file}`, // File name you want to save as in S3
  };
  console.log(params);
  await s3.deleteObject(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File deleted file successfully`);
  });
};
