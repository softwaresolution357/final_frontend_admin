const fotters = require('../../models/cms/footer');
exports.postFotter = async (req, res, next) => {
  try {
    const data = await fotters.create(req.body);
    if (!data) {
      res.status(400).json({
        success: false,
        message: 'No data created',
      });
    }
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'No data created',
    });
  }
};
exports.getFooterName = async (req, res, next) => {
  try {
    const data = await fotters.find();
    const fainaldata = [];
    for (const { id: id, name: name } of data) {
      const fotters = {
        id: id,
        name: name,
      };
      fainaldata.push(fotters);
    }
    res.status(200).json({
      success: true,
      data: fainaldata,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: [],
    });
  }
};
