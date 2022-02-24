const ObjectId = require('mongodb').ObjectID;
const path = require('path');
const home = require('../../models/cms/home');
const top = require('../../models/cms/top');
const banner = require('../../models/cms/banner');

const categorymodel = require('../../models/catlog/category');
const brandmodel = require('../../models/catlog/brand');
const homepageseo = require('../../models/cms/homeseo');
exports.postHomePage = async (req, res, next) => {
  const data = {};
  const {
    header,
    fotter,
    favicon,
    parallex,
    parallexdescription,
    headerbanner,
    topselection,
  } = req.body;
  const count = await home.countDocuments();

  if (count == 0) {
    try {
      if (header != '') {
        data.header = header;
      }
      if (fotter != '') {
        data.fotter = fotter;
      }
      if (favicon != '') {
        data.favicon = favicon;
      }

      

      data.banner = JSON.parse(headerbanner);

      data.top = JSON.parse(topselection);
      data.parallex = JSON.parse(parallex);
      if (!Object.keys(data).length) {
        res.status(400).json({
          success: false,
          message: 'home page upade',
        });
      } else {
        await home.create(data);

        res.status(200).json({
          success: true,
          message: 'home page upade',
        });
      }

      //--------------------------------------------------------------//
    } catch (err) {
      console.log(err)
      res.status(400).json({
        success: false,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "you can't create more than one document",
    });
  }
};
//---------------------------------------------------------------------------------------------//
exports.getHomePage = async (req, res, next) => {
  try {
    const data = await home.findOne();

    const categorydata = await categorymodel.find({ status: true });
    const brantdata = await brandmodel.find({ status: true });
    let category = [];
    let categoryvalue = {};
    let brand = [];
    let brandvalue = {};

    for (const { slug: slug, name: name } of categorydata) {
      categoryvalue = {
        label: name,
        value: `collection?name=${slug}`,
      };
      category.push(categoryvalue);
    }
    for (const { slug: slug, name: name } of brantdata) {
      brandvalue = {
        label: name,
        value: `brands?name=${slug}`,
      };
      brand.push(brandvalue);
    }

    if (data == null) {
      res.status(200).json({
        success: true,
        data: {
          categories: category,
          brands: brand,
        },
      });
    } else {
      res.status(200).json({
        success: true,
        data: {
          id: data.id,
          header:data.header,
          fotter:data.fotter,
          favicon:data.favicon,
          parallex: data.parallex,
          parallexdescription: data.parallexdescription,
          top: data.top,
          banner: data.banner,
          categories: category,
          brands: brand,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'No Data Fount',
      data: {},
    });
  }
};
exports.updateHomePage = async (req, res, next) => {
  const data = {};
  const {
    header,
    fotter,
    favicon,
    parallex,
 
    parallexdescription,
    headerbanner,
    topselection,
  } = req.body;

  const count = await home.countDocuments();
 
  if (count == 1) {
    try {
      if(header != undefined){
        data.header = header;
      }else{
        await home.findByIdAndUpdate({ _id: req.params.id }, {$unset:{header:1}}, { new: true });
      }
      if(fotter != undefined){
        data.fotter = fotter;
      }else{
        await home.findByIdAndUpdate({ _id: req.params.id }, {$unset:{fotter:1}}, { new: true });
      }
      if(favicon != undefined){
        data.favicon = favicon;
      }else{
        await home.findByIdAndUpdate({ _id: req.params.id }, {$unset:{favicon:1}}, { new: true });
      }
      
      
     

      data.banner = JSON.parse(headerbanner);
      data.top = JSON.parse(topselection);
      data.parallex = JSON.parse(parallex);
      await home.findByIdAndUpdate({ _id: req.params.id }, data, { new: true });

      res.status(200).json({
        success: true,
        message: 'home page upade',
      });
      //--------------------------------------------------------------//
    } catch (err) {
    
      res.status(400).json({
        success: false,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "you can't create more than one document",
    });
  }
};
exports.postHomePageSEO = async (req, res, next) => {
  const count = await homepageseo.countDocuments();
  if (count == 0) {
    try {
      await homepageseo.create(req.body);
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
      });
    }
  }
};
exports.getHomePageSEO = async (req, res, next) => {
  const count = await homepageseo.countDocuments();
  if (count == 1) {
    try {
      const data = await homepageseo.findOne(req.body);
      res.status(200).json({
        success: true,
        data: {
          id: data._id,
          metatitle: data.metatitle,
          metakeyword: data.metakeyword,
          metadescription: data.metadescription,
        },
      });
    } catch (err) {
      res.status(400).json({
        success: false,
      });
    }
  }
};
exports.putHomePageSEO = async (req, res, next) => {
  await homepageseo.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
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
