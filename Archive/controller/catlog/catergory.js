const mongodb = require('mongodb');
const categorymodel = require('../../models/catlog/category');
const ObjectId = require('mongodb').ObjectID;
const path = require('path');
const fs = require('fs');
const { uploadFile, deletedFile } = require('../../component/fileUpload');
const product = require('../../models/catlog/products');
// const ErrorResponse = req1uire('../../utils/errorRespons');
const errorHandler = require('../../middleware/error');
// Post the value to the database
// @authors:- A. SUNIL KUMAR
// @Devlopment and testing :- A. Sunil Kumar

exports.postCategory = async (req, res, next) => {
  const categorydata = {};
  const count = await categorymodel.countDocuments({ name: req.body.name });
  if (count == 0) {
    categorydata.name = req.body.name;
    categorydata.description = req.body.description;
    categorydata.slug = req.body.slug;
    categorydata.category = req.body.categorystatus;
    categorydata.metatitle = req.body.metatitle;
    categorydata.metakeyword = req.body.metakeyword;
    categorydata.metadescription = req.body.metadescription;
    categorydata.status = req.body.status;
    if (req.body.image != '') {
      categorydata.photo = req.body.image;
    }

    if (req.body.categorystatus == 1) {
      try {
        const Category = await categorymodel.create(categorydata);
        if (!Category) {
          next(errorHandler(err));
        }
        res.status(201).json({
          success: true,
          data: Category,
        });
      } catch (err) {
        if (err.code === 11000) {
          res.status(400).json({
            success: false,
            message: `This ${req.body.name} category name is already used`,
          });
        }
        if (err.name === 'ValidationError') {
          const message = Object.values(err.errors).map((val) => val.message);
          res.status(400).json({
            success: false,
            message: `validation is failed ${message}`,
          });
        }
      }
    } else {
      categorydata.subcategory = JSON.parse(req.body.subcategoy);

      try {
        const Category = await categorymodel.create(categorydata);
        if (!Category) {
          res.status(500).json({
            success: true,
            data: Category,
          });
        }
        res.status(201).json({
          success: true,
          data: Category,
        });
      } catch (err) {
        if (err.code === 11000) {
          res.status(400).json({
            success: false,
            message: `This ${req.body.name} category name is already used`,
          });
        }
        if (err.name === 'ValidationError') {
          const message = Object.values(err.errors).map((val) => val.message);
          res.status(400).json({
            success: false,
            message: `validation is failed ${message}`,
          });
        }
      }
    }
  } else {
    res.status(400).json({
      success: false,
      message: `This ${req.body.name} category name is already used`,
    });
  }
};

// @desc Get all bootcamp
// @route GET /api/v1/bootcamp
// @acess Public

exports.getCategory = async (req, res, next) => {
  try {
    const categorydata = await categorymodel
      .find()
      .populate({ path: 'subcategory', select: 'name' })
      .select('_id name photo category subcategory status show')
      .sort({ _id: -1 });

    res.status(200).json({
      success: true,
      data: categorydata,
    });
  } catch (err) {
    res.status(400).json({
      success: true,
      message: 'No data found',
    });
  }
};

exports.deleteCatergory = async (req, res, next) => {
  const deletedImage = JSON.parse(req.query.deleteImage);

  for (let i = 0; i < deletedImage.length; i++) {
    if (deletedImage[i] !== 'no-image.jpg') {
      let image_path = './public/image/categorygallery/' + deletedImage[i];

      fs.unlink(image_path, (err) => {
        if (err) {
          throw err;
        }
      });
    }
  }

  await categorymodel.findByIdAndDelete(
    {
      _id: ObjectId(`${req.params.id}`),
    },
    (err, doc) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "data n't deleted",
        });
      }

      return res.status(201).json({
        success: true,
        message: doc,
      });
    }
  );
};

exports.updateCategory = async (req, res, next) => {
  console.log(req.body);

  const categorydata = {};
  categorydata.name = req.body.name;
  categorydata.description = req.body.description;
  categorydata.slug = req.body.slug;
  categorydata.category = req.body.categorystatus;
  categorydata.metatitle = req.body.metatitle;
  categorydata.metakeyword = JSON.parse(req.body.metakeyword);
  categorydata.metadescription = req.body.metadescription;
  if (req.body.image != '') {
    categorydata.photo = req.body.image;
  }
  if (req.body.categorystatus == 1) {
    try {
      const Category = await categorymodel.findByIdAndUpdate(
        req.params.id,
        categorydata,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!Category) {
        res.status(200).json({
          success: true,
          message: "file is n't update",
        });
      }
      res.status(201).json({
        success: true,
        data: Category,
      });
    } catch (err) {
      if (err.code === 11000) {
        res.status(400).json({
          success: false,
          name: `This ${req.body.name} category name is already used`,
        });
      }
      if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message);
        res.status(400).json({
          success: false,
          name: `validation is failed ${message}`,
        });
      }
    }
  } else {
    categorydata.subcategory = JSON.parse(req.body.subcategoy);

    try {
      const Category = await categorymodel.findByIdAndUpdate(
        req.params.id,
        categorydata,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!Category) {
        res.status(500).json({
          success: true,
          data: Category,
        });
      }
      res.status(201).json({
        success: true,
        data: Category,
      });
    } catch (err) {
      if (err.code === 11000) {
        res.status(400).json({
          success: false,
          name: `This ${req.body.name} category name is already used`,
        });
      }
      if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message);
        res.status(400).json({
          success: false,
          name: `validation is failed ${message}`,
        });
      }
    }
  }
};

exports.singlestatusupdate = async (req, res, next) => {
  mongodb.ObjectID.isValid(req.params.id);
  // const count = category.findById(req.params.id);
  if (mongodb.ObjectID.isValid(req.params.id)) {
    const statusData = await categorymodel.findByIdAndUpdate(
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
};
exports.singlecategoryview = async (req, res, next) => {
  try {
    if (mongodb.ObjectID.isValid(req.params.id)) {
      const dropdown = [];
      const data = await categorymodel
        .findById(req.params.id)
        .select('-__v -createDate ');

      const findcategory = await categorymodel.find({ category: 1 });
      for (const { name: name, id: id } of findcategory) {
        const categorydata = {
          label: name,
          value: id,
        };
        dropdown.push(categorydata);
      }

      res.status(200).json({
        success: true,
        data: data,
        category: dropdown,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'no data found',
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'no data found',
    });
  }
};
exports.edtsinglevalue = async (req, res, next) => {
  try {
    const categorydata = {};
    categorydata.name = req.body.name;
    categorydata.description = req.body.description;
    categorydata.slug = req.body.slug;
    categorydata.status = req.body.status;
    categorydata.metatitle = req.body.metatitle;
    categorydata.metakeyword = req.body.metakeyword;
    categorydata.metadescription = req.body.metadescription;
    categorydata.subcategory = JSON.parse(req.body.subcategoy);
    if (req.body.image != '') {
      categorydata.photo = req.body.image;
    }

    await categorymodel.findByIdAndUpdate({ _id: req.params.id }, categorydata);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};
//
//
//
exports.getCategoryData = async (req, res, doc) => {
  const data = [];
  const findcategory = await categorymodel.find({ category: 1 });
  if (!findcategory) {
    res.status(404).json({
      success: false,
      message: 'no data  found',
    });
  }
  for (const { name: name, id: id } of findcategory) {
    const categorydata = {
      label: name,
      value: id,
    };
    data.push(categorydata);
  }
  res.status(202).json({
    success: true,
    data: data,
  });
};

// ------------------------------------------------------------------------------------------------------------------------//
exports.updatestatus = async (req, res, next) => {
  await categorymodel.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    (err, data) => {
      if (err) {
        res.status(400).json({
          success: false,
        });
      }
      res.status(200).json({
        success: true,
      });
    }
  );
};
exports.showcategory = async (req, res, next) => {
  await categorymodel.findByIdAndUpdate(
    { _id: req.params.id },
    { show: req.body.status },
    {
      new: true,
    }
  );
};
exports.deletedCategory = async (req, res, next) => {
  const image = req.query.image;

  const count = await categorymodel
    .find({ subcategory: { $in: [req.params.id] } })
    .countDocuments();
  const data = await categorymodel
    .find({ subcategory: { $in: [req.params.id] } })
    .select('name');

  let name = '';
  for (var i = 0; i < data.length; i++) {
    name += data[i].name + `${i < data.length ? '' : ','}`;
  }

  if (count == 0) {
    await deletedFile(req, res, image, 'category');

    const categorydata = await categorymodel.findByIdAndDelete({
      _id: ObjectId(`${req.params.id}`),
    });
    res.status(200).json({
      success: true,
      message: `you delete main category successfully, Category name is ${categorydata.name} `,
    });
  } else {
    res.status(400).json({
      success: false,
      message: `you cannot delete main category,Because It is depending upon list of subcategory ${name}`,
    });
  }
};
