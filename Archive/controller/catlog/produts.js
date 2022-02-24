const productModel = require('../../models/catlog/products');
const categorymodel = require('../../models/catlog/category');
const brandmodel = require('../../models/catlog/brand');
const sizedropdown = require('../../models/catlog/sizes');
const colordropdwon = require('../../models/catlog/colors');


// const fotter = require('../../models/cms/footer');
const { uploadFile, deletedFile } = require('../../component/fileUpload');
exports.postProducts = async (req, res, next) => {
  const {
    name,
    model,
    SKU,
    description,
    quantity,
    stock,
    weight,
    unit,
    COD,
    status,
    MRP,
    special_price,
    prepaid_price,
    prepaid_ship_amount,
    cod_ship_amount,
    tax_percentage,
    colors,
    others,
    size,
    metaname,
    metadescription,
    metakeyword,
    slug,
    category,
    brands,
    specification,
    video,
    photo,
    descriptionphoto,
  } = req.body;

  const data = {};
  const productImage = [];
  const descrptionImage=[];
  data.name = name;
  data.model = model;
  data.SKU = SKU;
  data.description = description;
  data.quantity = quantity;
  data.OutofStock = stock;
  data.weight = weight;
  data.unit = unit;
  data.COD = COD;
  data.status = status;

  const image = JSON.parse(photo);
  for (let i = 0; i < image.length; i++) {
    productImage.push(image[i]);
  }
  const descriptionimage= JSON.parse(descriptionphoto)
  for (let i = 0; i < descriptionimage.length; i++) {
    descrptionImage.push(descriptionimage[i]);
  }
  data.photo = productImage;
  data.descriptionphoto = descrptionImage;
  data.photo = productImage;
  data.mrp = MRP;
  data.specialprice = special_price;
  data.prepaidprice = prepaid_price;
  data.tax = tax_percentage;
  data.codshipamount = cod_ship_amount;
  data.prepaidshipmentprice = prepaid_ship_amount;

  //------------------------------------------------------------------------//
  data.colors = JSON.parse(colors);

  //------------------------------------------------------//
  data.sizes = JSON.parse(size);

  //-------------------------------------------------------------//
  data.others = JSON.parse(others);

  //------------------------------------------------------------------------------------------------------------------------//
  data.metaname = metaname;
  data.metadescription = metadescription;
  data.metakeyword = metakeyword;
  data.slug = slug;
  data.category = JSON.parse(category);
  data.brand = JSON.parse(brands);

  data.specification = JSON.parse(specification);

  data.videolink = video;
  console.log(data);
  try {
    const product = await productModel.create(data);
    if (!product) {
      res.status(404).json({
        sucess: false,
        message: "Data n't update the value",
      });
    }
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
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
};

// --------------------------------------------------------------------------------------//
exports.getPrduct = async (req, res, next) => {
  try {
    const getPrduct = await productModel
      .find()
      .sort({ _id: -1 })
      .select(
        '_id name model SKU quantity mrp specialprice prepaidprice prepaidshipmentprice codshipamount status COD photo'
      );

    res.status(202).json({
      sucess: true,
      data: getPrduct,
    });
  } catch (err) {
    res.status(400).json({
      sucess: false,
    });
  }
};
exports.updateStatus = async (req, res, next) => {
  const statusUpdate = await productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!statusUpdate) {
    req.status(400).json({
      sucess: false,
      message: "status n't update",
    });
    req.status(202).json({
      sucess: true,
      data: 'data update',
    });
  }
};
exports.codupdateStatus = async (req, res, next) => {
  const statusUpdate = await productModel.findByIdAndUpdate(
    req.params.id,
    { COD: req.body.status },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!statusUpdate) {
    req.status(400).json({
      sucess: false,
      message: "status n't update",
    });
    req.status(202).json({
      sucess: true,
      data: 'data update',
    });
  }
};
//
exports.singleProduct = async (req, res, next) => {
  const data = await productModel
    .findOne({ _id: req.params.id })
    
 
  
  res.status(200).json({
    success: true,
    data: {
      product_name: data.name,
      model: data.model,
      SKU: data.SKU,
      description: data.description,
      quantity: data.quantity,
      OutofStock: data.OutofStock,
      unit: data.unit,
      weight: data.weight,
      photo: data.photo,
      descriptionphoto:data.descriptionphoto,
      MRP: data.mrp,
      special_price: data.specialprice,
      prepaid_price: data.prepaidprice,
      prepaid_ship_amount: data.prepaidshipmentprice,
      cod_ship_amount: data.codshipamount,
      tax_percentage: data.tax,
      sizes: data.sizes,
      colors: data.colors,
      others: data.others,
      metaname: data.metaname,
      metakeyword: data.metakeyword,
      metadescription: data.metadescription,
      slug: data.slug,
      category: data.category,
      brands: data.brand,
      specification: data.specification,
      videolink: data.videolink,
    },
  });
};
exports.dropdown = async (req, res, next) => {
  const categorydata = await categorymodel.find({ status: true });
  const brantdata = await brandmodel.find({ status: true });
  const color = await colordropdwon.find({ status: true }).select('_id name');
  const size = await sizedropdown.find({ status: true }).select('_id name');
  let category = [];
  let categoryvalue = {};
  let brand = [];
  let brandvalue = {};

  for (const { id: id, name: name } of categorydata) {
    categoryvalue = {
      label: name,
      value: id,
    };
    category.push(categoryvalue);
  }
  for (const { id: id, name: name } of brantdata) {
    brandvalue = {
      label: name,
      value: id,
    };
    brand.push(brandvalue);
  }
  if (!categorydata || !brantdata) {
    res.status(400).JSON({
      sucess: false,
      message: 'No data found',
    });
  }
  res.status(200).json({
    success: true,
    categories: category,
    brands: brand,
    size: size,
    color: color,
  });
};
exports.postSingleProduct = async (req, res, next) => {
  try {
    const {
      name,
      model,
      SKU,
      description,
      quantity,
      stock,
      weight,

      color,
      COD,
      status,
      MRP,
      special_price,
      prepaid_price,
      prepaid_ship_amount,
      cod_ship_amount,
      tax_percentage,
      colors,
      others,
      size,
      metaname,
      metadescription,
      metakeyword,
      slug,
      category,
      brands,
      specification,
      file,
      photo,
      imageurl,
      descriptionphoto
    } = req.body;

    const data = {};
    const productImage = [];
    const descrptionImage = [];
    data.name = name;
    data.model = model;
    data.SKU = SKU;
    data.description = description;
    data.quantity = quantity;
    data.weight = weight;
    data.COD = COD;
    data.status = status;
    const image = JSON.parse(photo);
    for (let i = 0; i < image.length; i++) {
      productImage.push(image[i]);
    }
    const descriptionimage= JSON.parse(descriptionphoto)
    for (let i = 0; i < descriptionimage.length; i++) {
      descrptionImage.push(descriptionimage[i]);
    }
    data.photo = productImage;
    data.descriptionphoto = descrptionImage
    data.mrp = MRP;
    data.specialprice = special_price;
    data.prepaidprice = prepaid_price;
    data.prepaidshipmentprice = prepaid_ship_amount;
    data.codshipamount = cod_ship_amount;

    data.tax = tax_percentage;
    data.colors = JSON.parse(colors);

    //------------------------------------------------------//
    data.sizes = JSON.parse(size);
  
    //-------------------------------------------------------------//
    data.others = JSON.parse(others);
//--------------------------------------------------------//
    data.metaname = metaname;
    data.metadescription = metadescription;
    data.metakeyword = metakeyword;
    data.slug = slug;
    data.category = JSON.parse(category);
    data.brand = JSON.parse(brands);

    data.specification = JSON.parse(specification);

   

    const product = await productModel.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      res.status(404).json({
        sucess: false,
        message: "Data n't update the value",
      });
    }
    res.status(202).json({
      success: true,
      // data: product,
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
    });
  }
};
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// frontend Details Product
exports.InlineProductediting = async (req, res, next) => {
  await productModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      quantity: req.body.stock.replace(/(&nbsp;|<([^>]+)>)/gi, ''),
      mrp: req.body.MRP.replace(/(&nbsp;|<([^>]+)>)/gi, ''),
      specialprice: req.body.special.replace(/(&nbsp;|<([^>]+)>)/gi, ''),
      prepaidprice: req.body.prepaid.replace(/(&nbsp;|<([^>]+)>)/gi, ''),
    },
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
// ----------------------------------------------------------------------//
exports.deletedProducts = async (req, res, next) => {
  const image = JSON.parse(req.query.deleteImage);
  for (let i = 0; i < image.length; i++) {
    await deletedFile(req, res, image[i], 'products');
  }
  await productModel.findByIdAndDelete({ _id: req.params.id }, (err, data) => {
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
