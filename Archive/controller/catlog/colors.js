const colors = require('../../models/catlog/colors');
const colorsmodule = require('../../models/catlog/color');
exports.postColors = async (req, res, next) => {
  try {
    const colo = await colors.create({
      name: req.body.Colors.replace(/(&nbsp;|<([^>]+)>)/gi, ''),
    });

    res.status(200).json({
      success: true,
      data: colo,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "can't create duplicate vlaue",
    });
  }
};
exports.getColors = async (req, res, next) => {
  try {
    const data = await colors.find().sort({ _id: -1 });

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
exports.updateColor = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const colo = await colors.findOneAndUpdate(
      { _id: req.params.id },
      { name: req.body.Colors.replace(/(&nbsp;|<([^>]+)>)/gi, '') }
    );

    res.status(200).json({
      success: true,
      data: colo,
    });
  } catch (err) {}
};
exports.deleteColors = async (req, res, next) => {
  const count = await colorsmodule.countDocuments({ color: req.query.colors });
  if (count == 0) {
    await colors.findByIdAndDelete({ _id: req.params.id }, (err, data) => {
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
    res.status(400).json({
      success: false,
    });
  }
};
exports.putStatus = async (req, res, next) => {
  await colors.findByIdAndUpdate(
    { _id: req.params.id },
    { status: req.body.status }
  );
};
exports.getSingleColor = async (req, res, next) => {
  console.log(req.params.id);
  await colors.findById({ _id: req.params.id }, (err, data) => {
    if (err) {
    }
    console.log(data);
    res.status(202).json({
      success: true,
      data: data,
    });
  });
};
