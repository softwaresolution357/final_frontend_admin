const pincode = require('../../../models/system/pincode');

const path = require('path');
const fs = require('fs');
const excelToJson = require('convert-excel-to-json');

exports.pincodefileuplad = (req, res, next) => {
  req.files.pincode.mv(
    path.join(__dirname, req.files.pincode.name),
    async (err) => {
      if (err) {
        console.log('file Upload err');
      }
      await importExcelData2MongoDB(
        path.join(__dirname, req.files.pincode.name)
      )
        .then((result) => {
          res.status(200).json({
            success: true,
            message: 'file upload successfully',
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({
            success: true,
            message: "file n't upload",
          });
        });
    }
  );
};

function importExcelData2MongoDB(filePath) {
  // -> Read Excel File to Json Data
  const excelData = excelToJson({
    sourceFile: filePath,
    sheets: [
      {
        // Excel Sheet Name
        name: 'Final_data',

        // Header Row -> be skipped and will not be present at our result object.
        header: {
          rows: 1,
        },

        // Mapping columns to keys
        columnToKey: {
          A: 'City',
          B: 'State',
          C: 'Country',
          D: 'Pincode',
          E: 'COD',
          F: 'Prepaid',
          G: 'Delivery_Date',
        },
      },
    ],
  });

  const data = pincode.insertMany(excelData.Final_data);
  return data;
}

exports.getFileData = async (req, res, next) => {
  const pincodeData = await pincode.find().select('-__v ');

  res.status(200).json({
    success: true,
    data: pincodeData,
  });
};
exports.validationPincode = async (req, res, next) => {
  try {
    const data = await pincode.findOne({ Pincode: req.query.pincode });

    if (!data) {
      res.status(200).json({
        status: false,
        data: [],
        message: "Product is n't deliver this pincode",
      });
    }
    res.status(200).json({
      status: true,
      data: {
        City: data.City,
        State: data.State,
        Pincode: data.Pincode,
        Country: data.Country,
        COD: data.COD,
        Prepaid: data.Prepaid,
        deliver: data.Delivery_Date,
      },
      message: 'Product is deliver This address',
    });
  } catch (e) {}
};
exports.postPincode = async (req, res, next) => {
  const count = await pincode.countDocuments({ Pincode: req.body.Pincode });

  if (count == 0) {
    try {
      const data = await pincode.create(req.body);
      if (!data) {
        res.status(400).json({
          success: false,
          message: "pincode desn't create",
        });
      }
      res.status(200).json({
        success: true,
        data: data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Duplicate Pincode Doesn't create",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Duplicate Pincode Doesn't create",
    });
  }
};
exports.getSinglepincode = async (req, res, next) => {
  try {
    const data = await pincode.findById({ _id: req.params.id });
    res.status(200).json({
      success: true,
      data: {
        id: data.id,
        City: data.City,
        State: data.State,
        Country: data.Country,
        COD: data.COD,
        Prepaid: data.Prepaid,
        Pincode: data.Pincode,
        Delivery_Date: data.Delivery_Date,
      },
    });
  } catch (err) {}
};
exports.updateCOD = async (req, res, next) => {
  console.log(req.body);
  await pincode.findByIdAndUpdate(
    { _id: req.params.id },
    {
      COD: req.body.status,
    },
    {
      new: true,
    },
    (err, data) => {
      console.log(err);
      if (err) {
        res.status(400).json({
          success: false,
        });
      }
      res.status(202).json({
        success: true,
      });
    }
  );
};
exports.updateCODPrepaid = async (req, res, next) => {
  await pincode.findByIdAndUpdate(
    { _id: req.params.id },
    {
      Prepaid: req.body.Prepaid,
      COD: req.body.COD,
      Delivery_Date: req.body.Delivery_Date,
    },
    {
      new: true,
    },
    (err, data) => {
      if (err) {
        res.status(400).json({
          success: true,
        });
      }
      res.status(202).json({
        success: true,
      });
    }
  );
};
