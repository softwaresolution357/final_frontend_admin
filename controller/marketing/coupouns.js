const coupouns = require('../../models/marketing/coupouns');
exports.createCoupouns = async (req, res, next) => {
  try {
    const data = await coupouns.create(req.body);
    if (!data) {
      res.status(400).json({
        success: false,
        message: 'No data created',
      });
      res.status(200).json({
        success: true,
        data: data,
      });
    }
  } catch (err) {}
};
exports.getCoupouns = async (req, res, next) => {
  try {
    const fainaldata = [];
    const data = await coupouns.find();
    console.log(data);
    if (!data) {
      res.status(400).json({
        success: false,
        message: 'No data created',
      });
    }

    for (const {
      id: id,
      name: name,
      code: code,
      amount: amount,
      start: start,
      ending: ending,
    } of data) {
      const data = {
        id: id,
        name: name,
        code: code,
        amount: amount,
        start: new Date(start)
          .toJSON()
          .slice(0, 10)
          .split('-')
          .reverse()
          .join('/'),
        ending: new Date(ending)
          .toJSON()
          .slice(0, 10)
          .split('-')
          .reverse()
          .join('/'),
      };

      fainaldata.push(data);
    }
    res.status(200).json({
      success: true,
      data: fainaldata,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'No data created',
    });
  }
};
