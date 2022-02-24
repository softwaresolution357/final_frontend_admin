const sizes = require('../../models/catlog/sizes');
const sizesmodule = require('../../models/catlog/size');
exports.postSizes = async (req, res, next) => {
  console.log(req.body);
  try {
    const data = await sizes.create({
      name: req.body.sizes.replace(/(&nbsp;|<([^>]+)>)/gi, ''),
    });

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "can't create duplicate vlaue",
    });
  }
};
exports.getSizes = async (req, res, next) => {
  try {
    const data = await sizes.find().sort({ _id: -1 });
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "data doesn't create",
    });
  }
};

exports.putSize = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const data = await sizes.findOneAndUpdate(
      { _id: req.params.id },
      { name: req.body.sizes.replace(/(&nbsp;|<([^>]+)>)/gi, '') }
    );

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "data doesn't create",
    });
  }
};
exports.deleteSize = async (req, res, next) => {
  const count = await sizesmodule.countDocuments({ size: req.query.sizes });
  console.log(count);
  if (count == 0) {
    await sizes.findByIdAndDelete({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.status(400).json({
          success: false,
        });
      }
      res.status(200).json({
        success: true,
      });
    });
  } else {
    console.log('hello');
    res.status(400).json({
      success: false,
    });
  }
};
exports.putStatus = async (req, res, next) => {
  await sizes.findByIdAndUpdate(
    { _id: req.params.id },
    { status: req.body.status }
  );
};
