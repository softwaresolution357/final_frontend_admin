const mongodb = require('mongodb');
const currency = require('../../models/system/currency');

exports.postCurrency = async (req, res, next) => {
  try {
    console.log(req.body);
    const currencydata = await currency.create(req.body);
    if (!currencydata) {
      res.status(400).json({
        success: false,
        message: "data doesn't created",
      });
    }
    res.status(200).json({
      success: true,
      data: currencydata,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      success: true,
      message: "don't created",
    });
  }
};

exports.getCurrrency = async (req, res, next) => {
  const data = [];
  try {
    const currencyData = await currency.find();

    res.status(200).json({
      success: true,
      data: currencyData,
    });
  } catch (e) {
    res.status(204).json({
      success: false,
      message: "data dosn't send ",
    });
  }
};
exports.updataCurrencyStatus = async (req, res, next) => {
  const status = await currency.findById({ _id: req.params.id });
  if (status.status == true) {
    await currency.findOneAndUpdate({ _id: req.params.id }, { status: false });
  }
  // const count = category.findById(req.params.id);
  const count = await currency.countDocuments({ status: true });
  console.log(count);
  if (count == 0) {
    if (mongodb.ObjectID.isValid(req.params.id)) {
      const statusData = await currency.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!statusData) {
        return new ErrorResponse("Category n't update successfully", 404);
      }
      res.status(200).json({
        success: true,
        message: 'Update data successfully',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'no such id found',
      });
    }
  } else {
    res.status(400).json({
      success: false,
      status: false,
      message: "you cann't active more then one documet",
    });
  }
};
exports.updateCurrencyData = async (req, res, next) => {
  if (mongodb.ObjectID.isValid(req.params.id)) {
    await currency.findByIdAndUpdate(
      { _id: req.params.id },
      {
        symbol: req.body.symbol,
      },
      {
        new: true,
        runValidators: true,
      },
      (err, data) => {
        console.log(err);
        if (err) {
          res.status(400).json({
            success: false,
            messagge: "data doesn't update",
          });
        }
        res.status(200).json({
          success: true,
          data: data,
          messagge: 'data upadate successfulle',
        });
      }
    );
  } else {
    res.status(400).json({
      success: false,
      messagge: "data doesn't update",
    });
  }
};
exports.deletedCurrency = async (req, res, next) => {
  await currency.findByIdAndDelete({ _id: req.params.id }, (err, data) => {
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
