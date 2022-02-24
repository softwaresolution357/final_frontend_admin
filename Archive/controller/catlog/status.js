const status = require('../../models/catlog/status');
exports.postStatus = async (req, res, next) => {
  console.log(req.body);
  try {
    const data = await status.create({
      name: req.body.name.replace(/(&nbsp;|<([^>]+)>)/gi, ''),
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
exports.getStatus = async (req, res, next) => {
  try {
    const data = await status.find().sort({ _id: -1 });

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
exports.updateStatus = async (req, res, next) => {
  console.log(req.params.id);
  console.log(req.body);
  try {
    const data = await status.findOneAndUpdate(
      { _id: req.params.id },
      { name: req.body.name.replace(/(&nbsp;|<([^>]+)>)/gi, '') }
    );

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
exports.deleteStatus = async (req, res, next) => {
  await status.findByIdAndDelete({ _id: req.params.id }, (err, data) => {
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
exports.putStatus = async (req, res, next) => {
  console.log(req.body);
  console.log(req.body.status);
  await status.findByIdAndUpdate(
    { _id: req.params.id },
    { status: req.body.status }
  );
};
exports.getSingleStatus = async (req, res, next) => {
  const single_status = await status.findOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    status: single_status.name,
    dropdown: single_status.dropdown,
  });
};
exports.singlePutUpdateStatus = async (req, res, next) => {
  console.log(req.body.dropdown);
  await status.findByIdAndUpdate(
    { _id: req.params.id },
    {
      dropdown: JSON.parse(req.body.dropdown),
    },
    (err, data) => {
      if (err) {
      }
      res.status(200).json({
        success: true,
      });
    }
  );
};
