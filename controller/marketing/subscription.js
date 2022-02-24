const subscriprion = require('../../models/marketing/subscription');

exports.getSubscription = async (req, res, next) => {
  try {
    const data = await subscriprion.find().select('-__v -created');
    console.log(data);
    if (!data) {
      res.status(400).json({
        success: false,
        message: 'There is no data found',
      });
    }
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      message: 'There is no data found',
    });
  }
};
exports.postSubscription = async (req, res, next) => {
  try {
    console.log(req.body);
    const data = await subscriprion.create(req.body);
    if (!data) {
      res.status(400).json({
        success: false,
        message: 'There is no data found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'subscription successfully',
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'you already subscribed',
    });
  }
};
