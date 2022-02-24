const ObjectId = require('mongodb').ObjectID;
const path = require('path');
const blog = require('../../models/cms/blog');
const { uploadFile, deletedFile } = require('../../component/fileUpload');
exports.postBlog = async (req, res, next) => {
  try {
    const { blogname, createdby, shortdescription, description } = req.body;
    const data = {};
    data.blogname = blogname;
    data.createdby = createdby;
    data.shortdescription = shortdescription;
    data.description = description;
    const photo = [];
    if (req.files != null) {
      if (req.files.image.length != 1) {
        for (let i = 0; i < req.files.image.length; i++) {
          let file = `photo_${ObjectId()}${
            path.parse(req.files.image[i].name).ext
          }`;

          await uploadFile(req, res, req.files.image[i], file, 'blog');
          photo.push(file);
        }
        data.image = photo;
      } else {
        const file = `photo_${ObjectId()}${
          path.parse(req.files.image.name).ext
        }`;
        await uploadFile(req, res, req.files.image, file, 'blog');
        photo.push(file);
        data.image = photo;
      }
    }

    const fainal_data = await blog.create(data);
    res.status(201).json({
      success: true,
      data: fainal_data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "data doesn't create",
    });
  }
};
exports.getBlog = async (req, res, next) => {
  try {
    const blog_data = await blog.find();

    res.status(200).json({
      success: true,
      data: blog_data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'no data found',
    });
  }
};
exports.getSingleBlog = async (req, res, next) => {
  try {
    const blog_data = await blog.findById({ _id: req.params.id });

    res.status(200).json({
      success: true,
      data: blog_data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'no data found',
    });
  }
};
exports.deleteSingleData = async (req, res, next) => {
  try {
    console.log(req.query.deletedimage.split(','));
    for (let i = 0; i < req.query.deletedimage.split(',').length; i++) {
      await deletedFile(req, res, req.query.deletedimage.split(',')[i], 'blog');
    }
    await blog.findByIdAndDelete({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: 'file delete successfully',
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'err',
    });
  }
};
