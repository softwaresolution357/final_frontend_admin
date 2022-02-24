const AWS = require('aws-sdk');

exports.uploadMp4File = async (req, res, fileName, photo, common) => {
  // Read content from the file

  const config = new AWS.Config({
    accessKeyId: process.env.AWS_SECURITY_ID,
    secretAccessKey: process.env.AWS_SECURITY_SECRET,
    httpOptions: { timeout: 0 },
  });
  const base64data = new Buffer.alloc(fileName.size, fileName.data, 'binary');

  let params = {
    Bucket: process.env.BucketName,
    Key: `${common}/${photo}`, // F
    ContentType: fileName.mimetype,
    Body: base64data,
  };

  try {
    await new AWS.S3(config).putObject(params).promise();
    console.log('Successfully uploaded data to bucket');
  } catch (e) {
    console.log('Error uploading data: ', e);
  }
};
