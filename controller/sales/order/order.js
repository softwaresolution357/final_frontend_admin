let path = require('path');
const mime = require('mime');
let fs = require('fs');
let mongoXlsx = require('mongo-xlsx');
const moment = require('moment-timezone');
const orders = require('../../../models/sales/order');
const ordercustomer = require('../../../models/user/ordercustomer');
const currency = require('../../../models/system/currency');
const status = require('../../../models/catlog/status');
const order = require('../../../models/sales/order');
const orderstatus = require('../../../models/sales/orderstatus');
exports.getAllOrder = async (req, res, next) => {
  try {
    const currencydata = await currency
    .findOne({ status: true })
    .select('symbol');
    let orderda = '';
    if (req.query.type === 'dashboard') {
      orderda = await order
        .find()
        .sort({ _id: -1 })
        .limit(10)
        .select('-__v -createDate')
        .populate({
          path: 'customerid',
          model: 'ordercustomer',
          select: 'name mobile',
        })
        .populate({
          path: 'refid',
          model: 'transection',
          select: 'paymentgatway refid paymentstatus',
        })
        .populate({
          path: 'orderstatusdescription',
          model: 'orderstatus',
          select: 'name',
        });
    } else {
      orderda = await order
        .find()
        .sort({ _id: -1 })
        .select('-__v -createDate')
        .populate({
          path: 'customerid',
          model: 'ordercustomer',
          select: 'name mobile',
        })
        .populate({
          path: 'refid',
          model: 'transection',
          select: 'paymentgatway refid paymentstatus',
        })
        .populate({
          path: 'orderstatusdescription',
          model: 'orderstatus',
          select: 'name',
        });
    }

    const orderData = [];

    for (const {
      _id: _id,
      order: order,
      orderdate: orderdate,
      customerid: customerid,
      refid: transection,
      orderstatusdescription: orderstatus,
    } of orderda) {
      const data = {
        _id: _id,
        id: order,
        date: orderdate,
        Refid: transection != null ? transection.refid : '',
        name: customerid != null ? customerid.name : '',
        mobile: customerid != null ? customerid.mobile : '',
        payment: transection != null ? transection.paymentgatway : '',
        paymentstatus: transection != null ? transection.paymentstatus : '',
        status: orderstatus != null ? orderstatus.name : '',
        // status: transection != null ? transection.paymentstatus : '',
      };
      orderData.push(data);
    }

    if (!orderda) {
      res.status(400).json({
        success: false,
        message: `No record found`,
      });
    }

    res.status(200).json({
      success: true,
      data: orderData,
      symbol: currencydata !== null ?currencydata.symbol:''
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      // data: orderdata,
    });
  }
};

exports.viewOrder = async (req, res, next) => {
  const order = await orders.findOne({
    _id: req.params.id,
    customerid: req.id,
  });
  const data = order.order;
  const customer = await ordercustomer.findOne({ order: data });
};

exports.getExcelorder = async (req, res, next) => {
  try {
    const orderdata = await order
      .find()
      .lean()
      .select('-_id -__v')
      .populate({
        path: 'customerid',
        model: 'ordercustomer',
      })
      .populate({
        path: 'productid',
        model: 'products',
        select: 'name mrp model SKU',
      })
      .populate({ path: 'refid', model: 'transection', select: 'refid' })
      .populate({
        path: 'orderstatusdescription',
        model: 'orderstatus',
        select: 'name',
      });

    const order_data = [];
    let i = 0;
    for (const {
      customerid: customer,
      order: order,
      invoice: invoice,
      refid: transection,
      orderdate: orderdate,
      orderstatusdescription: orderstatus,
      productid: product,
      quantity: quantity,
      unitprice: unitprice,
      tax: tax,
      deliver: deliver,
      totalamount: totalamount,
      varient1: varient1,
      varient2: varient2,
      varient3: varient3,
      taxamout: taxamout,
    } of orderdata) {
      const data = {
        'SL No': ++i,
        'Order Id': order,
        invoice: invoice,
        'Order Time': orderdate,
        Name: customer.name,
        Mobile: customer.mobile,
        Email: customer.email,
        'Payment Reference': transection != undefined ? transection.refid : '',
        'Order Status': orderstatus != undefined ? orderstatus.name : '',
        Currency: 'INR',
        'Billing Name': customer.name,
        'Billing Address': customer.billingaddress,
        'Billing City': customer.billingcity,
        'Billing Zip': customer.billingpincode,
        'Billing Province': customer.billingstate,
        'Billing Country': customer.billingcountry,
        'Billing Phone': customer.mobile,
        'Shipping Name': customer.name,
        'Shipping Address': customer.shippingaddress,
        'Shipping City': customer.shippingcity,
        'Shipping Zip': customer.shippingpincode,
        'Shipping Province': customer.shippingstate,
        'Shipping Country': customer.shippingcountry,
        'Shipping Phone': customer.mobile,
        'Shipping Method': 'Standard',
        'item sku': product.SKU,
        'Item Model': product.model,
        'Item name': product.name,
        'Item quantity': quantity,
        'Item Unit price': unitprice,
        Shipping: deliver,
        'Taxt Rate': tax,
        Taxes: taxamout,
        Amount: totalamount,
        'Item MRP': product.mrp,
        'Product Vatiants 1': varient1,
        'Product Vatiants 2': varient2,
        'Product Vatiants 3': varient3,
      };

      order_data.push(data);
    }
  
    if(process.env.NODE_ENV !== 'development'){
    var model = mongoXlsx.buildDynamicModel(order_data);
    const option = {
      // fileName: 'order-' + Date.now().toString() + '.xlsx',
        fileName: 'order-export.xlsx',
      path: '/tmp',
      defaultSheetName: 'order-export',
    };
  await  mongoXlsx.mongoData2Xlsx(order_data, model, option, function (err, data) {
      if (err) {
       res.status(400).json({
         success:false,
         message:"download error"
       })
      
      }
      
     
    });
    var filename = path.basename(path.join('/tmp' + '/' + option.fileName));
    var mimetype = mime.getType(path.join('/tmp' + '/' + option.fileName));

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);
   
    var filestream = fs.createReadStream(path.join('/tmp' + '/' + option.fileName));
    filestream.pipe(res);
  }else{
    var model = mongoXlsx.buildDynamicModel(order_data);
    const option = {
      // fileName: 'order-' + Date.now() + '.xlsx',
      fileName: 'order-export.xlsx',
      path: './controller/sales/order/',
      defaultSheetName: 'order-export',
    };
    mongoXlsx.mongoData2Xlsx(order_data, model, option, function (err, data) {
      if (err) {
        res.status(400).json({
          success:false,
          message:"download error"
        })
      }
    });
    var filename = path.basename(__dirname + '/' + option.fileName);
    var mimetype = mime.getType(__dirname + '/' + option.fileName);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(__dirname + '/' + option.fileName);
    filestream.pipe(res);
  }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'no data fount',
    });
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const data = await orders.findByIdAndUpdate(
      { _id: req.params.id },
      {
        orderstatus: req.body.orderstatus,
        description: req.body.description,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: 'data update successfully',
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "data doesn't update",
    });
  }
};
exports.getSingleOrder = async (req, res, next) => {
  const status_data = await status.find().sort({ _id: -1 });

  const single_order_data = await orders
    .findById({ _id: req.params.id })
    .populate({ path: 'customerid', model: 'ordercustomer' })
    .populate({ path: 'orderstatusdescription', model: 'orderstatus' })
    .populate({
      path: 'refid',
      model: 'transection',
      select: 'refid totaldebitamount paymentgatway',
    })
    .populate({ path: 'productid', model: 'products', select: 'name' });

  if (!single_order_data) {
    res.status(400).json({
      success: false,
    });
  }
  res.status(202).json({
    success: true,
    status: status_data,
    sigledata: {
      refid: single_order_data.refid.refid,
      order: single_order_data.order,
      invoice: single_order_data.invoice,
      date: single_order_data.orderdate,
      totalamount: single_order_data.refid.totaldebitamount,
      paymentgatway: single_order_data.refid.paymentgatway,
      status: single_order_data.orderstatusdescription.name,
      currentdescription:
        single_order_data.orderstatusdescription.currentstatus,
      description: single_order_data.orderstatusdescription.description,
      name: single_order_data.customerid.name,
      email: single_order_data.customerid.email,
      mobile: single_order_data.customerid.mobile,
      billing: single_order_data.customerid.billing,
      shipping: single_order_data.customerid.shipping,
      pincode: single_order_data.customerid.pincode,
      city: single_order_data.customerid.city,
      state: single_order_data.customerid.state,
      country: single_order_data.customerid.country,
      product_name: single_order_data.productid.name,
      unitprice: single_order_data.unitprice,
      quantity: single_order_data.quantity,
      tax: single_order_data.tax,
      taxtamount: single_order_data.taxamout,
      deliveramount: single_order_data.deliver,
      grandtotalamount: single_order_data.totalamount,
      color: single_order_data.varient1,
      size: single_order_data.varient2,
      other: single_order_data.varient3,
    },
  });
};
exports.putSingleOrder = async (req, res, next) => {
  const data = await order.findOneAndUpdate(
    { _id: req.params.id },
    {
      invoice: req.body.invoice,
    }
  );
  const stausUpdata = await orderstatus.findOne({
    _id: data.orderstatusdescription,
  });
  if (req.body.status != '') {
    stausUpdata.description.push({
      name: req.body.status,
      lastupdatetime: moment
        .tz(Date.now(), 'Asia/Kolkata')
        .format('DD/MM/YYYY HH:mm:ss'),

      description: req.body.tracingdescription,
    });

    await orderstatus.findByIdAndUpdate(
      { _id: data.orderstatusdescription },
      {
        name: req.body.status,
        currentstatus: req.body.tracingdescription,
        statusdata: moment
          .tz(Date.now(), 'Asia/Kolkata')
          .format('DD/MM/YYYY HH:mm:ss'),
        description: stausUpdata.description,
      }
    );
  }

  if (req.body.status == 'shipped') {
    await ordercustomer.findByIdAndUpdate(
      { _id: data.customerid },
      {
        billing: req.body.billing,
        shipping: req.body.shipping,
        mobile: req.body.mobile,
        courier: req.body.courier,
        tracking: req.body.tracking,
      }
    );
  } else {
    await ordercustomer.findByIdAndUpdate(
      { _id: data.customerid },
      {
        billing: req.body.billing,
        shipping: req.body.shipping,
        mobile: req.body.mobile,
      }
    );
  }

  res.status(200).json({
    success: true,
  });
};
exports.getAllOrderid=async(req,res,next)=>{
 
try {
  const orderdata = await order
  .find({order:{$gte:req.params.startid,$lte:req.params.endid}})
    .lean()
    .select('-_id -__v')
    .populate({
      path: 'customerid',
      model: 'ordercustomer',
    })
    .populate({
      path: 'productid',
      model: 'products',
      select: 'name mrp model SKU',
    })
    .populate({ path: 'refid', model: 'transection', select: 'refid' })
    .populate({
      path: 'orderstatusdescription',
      model: 'orderstatus',
      select: 'name',
    });

  const order_data = [];
  let i = 0;
  for (const {
    customerid: customer,
    order: order,
    invoice: invoice,
    refid: transection,
    orderdate: orderdate,
    orderstatusdescription: orderstatus,
    productid: product,
    quantity: quantity,
    unitprice: unitprice,
    tax: tax,
    deliver: deliver,
    totalamount: totalamount,
    varient1: varient1,
    varient2: varient2,
    varient3: varient3,
    taxamout: taxamout,
  } of orderdata) {
    const data = {
      'SL No': ++i,
      'Order Id': order,
      invoice: invoice,
      'Order Time': orderdate,
      Name: customer.name,
      Mobile: customer.mobile,
      Email: customer.email,
      'Payment Reference': transection != undefined ? transection.refid : '',
      'Order Status': orderstatus != undefined ? orderstatus.name : '',
      Currency: 'INR',
      'Billing Name': customer.name,
      'Billing Address': customer.billing,
      'Billing City': customer.city,
      'Billing Zip': customer.pincode,
      'Billing Province': customer.state,
      'Billing Country': customer.country,
      'Billing Phone': customer.mobile,
      'Shipping Name': customer.name,
      'Shipping Address': customer.shipping,
      'Shipping City': customer.city,
      'Shipping Zip': customer.pincode,
      'Shipping Province': customer.state,
      'Shipping Country': customer.country,
      'Shipping Phone': customer.mobile,
      'Shipping Method': 'Standard',
      'item sku': product.SKU,
      'Item Model': product.model,
      'Item name': product.name,
      'Item quantity': quantity,
      'Item Unit price': unitprice,
      Shipping: deliver,
      'Taxt Rate': tax,
      Taxes: taxamout,
      Amount: totalamount,
      'Item MRP': product.mrp,
      'Product Vatiants 1': varient1,
      'Product Vatiants 2': varient2,
      'Product Vatiants 3': varient3,
    };

    order_data.push(data);
  }

  if(process.env.NODE_ENV !== 'development'){
  var model = mongoXlsx.buildDynamicModel(order_data);
  const option = {
    // fileName: 'order-' + Date.now().toString() + '.xlsx',
      fileName: 'order-export.xlsx',
    path: '/tmp',
    defaultSheetName: 'order-export',
  };
await  mongoXlsx.mongoData2Xlsx(order_data, model, option, function (err, data) {
    if (err) {
     res.status(400).json({
       success:false,
       message:"download error"
     })
    
    }
    
   
  });
  var filename = path.basename(path.join('/tmp' + '/' + option.fileName));
  var mimetype = mime.getType(path.join('/tmp' + '/' + option.fileName));

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);
 
  var filestream = fs.createReadStream(path.join('/tmp' + '/' + option.fileName));
  filestream.pipe(res);
}else{
  var model = mongoXlsx.buildDynamicModel(order_data);
  const option = {
    // fileName: 'order-' + Date.now() + '.xlsx',
    fileName: 'order-export.xlsx',
    path: './controller/sales/order/',
    defaultSheetName: 'order-export',
  };
  mongoXlsx.mongoData2Xlsx(order_data, model, option, function (err, data) {
    if (err) {
      res.status(400).json({
        success:false,
        message:"download error"
      })
    }
  });
  var filename = path.basename(__dirname + '/' + option.fileName);
  var mimetype = mime.getType(__dirname + '/' + option.fileName);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(__dirname + '/' + option.fileName);
  filestream.pipe(res);
}
} catch (err) {
  res.status(400).json({
    success: false,
    message: 'no data fount',
  });
}
}

exports.getAllOrderdate = async(req,res,next)=>{
    console.log('hello')
    try {
      const orderdata = await order
      .find({createDate:{$gte: moment.utc(`${req.params.startdate} 00:00:00`),$lte: moment.utc(`${req.params.enddate} 23:59:59`)}})
        .lean()
        .select('-_id -__v')
        .populate({
          path: 'customerid',
          model: 'ordercustomer',
        })
        .populate({
          path: 'productid',
          model: 'products',
          select: 'name mrp model SKU',
        })
        .populate({ path: 'refid', model: 'transection', select: 'refid' })
        .populate({
          path: 'orderstatusdescription',
          model: 'orderstatus',
          select: 'name',
        });
    
      const order_data = [];
      console.log(customerid)
      process.exit(0)
      let i = 0;
      for (const {
        customerid: customer,
        order: order,
        invoice: invoice,
        refid: transection,
        orderdate: orderdate,
        orderstatusdescription: orderstatus,
        productid: product,
        quantity: quantity,
        unitprice: unitprice,
        tax: tax,
        deliver: deliver,
        totalamount: totalamount,
        varient1: varient1,
        varient2: varient2,
        varient3: varient3,
        taxamout: taxamout,
      } of orderdata) {
        const data = {
          'SL No': ++i,
          'Order Id': order,
          invoice: invoice,
          'Order Time': orderdate,
          Name: customer.name,
          Mobile: customer.mobile,
          Email: customer.email,
          'Payment Reference': transection != undefined ? transection.refid : '',
          'Order Status': orderstatus != undefined ? orderstatus.name : '',
          Currency: 'INR',
          'Billing Name': customer.name,
          'Billing Address': customer.billingaddress,
          'Billing City': customer.billingcity,
          'Billing Zip': customer.billingpincode,
          'Billing Province': customer.billingstate,
          'Billing Country': customer.billingcountry,
          'Billing Phone': customer.mobile,
          'Shipping Name': customer.name,
          'Shipping Address': customer.shippingaddress,
          'Shipping City': customer.shippingcity,
          'Shipping Zip': customer.shippingpincode,
          'Shipping Province': customer.shippingstate,
          'Shipping Country': customer.shippingcountry,
          'Shipping Phone': customer.mobile,
          'Shipping Method': 'Standard',
          'item sku': product.SKU,
          'Item Model': product.model,
          'Item name': product.name,
          'Item quantity': quantity,
          'Item Unit price': unitprice,
          Shipping: deliver,
          'Taxt Rate': tax,
          Taxes: taxamout,
          Amount: totalamount,
          'Item MRP': product.mrp,
          'Product Vatiants 1': varient1,
          'Product Vatiants 2': varient2,
          'Product Vatiants 3': varient3,
        };
    
        order_data.push(data);
      }
    
      if(process.env.NODE_ENV !== 'development'){
      var model = mongoXlsx.buildDynamicModel(order_data);
      const option = {
        // fileName: 'order-' + Date.now().toString() + '.xlsx',
          fileName: 'order-export.xls',
        path: '/tmp',
        defaultSheetName: 'order-export',
      };
    await  mongoXlsx.mongoData2Xlsx(order_data, model, option, function (err, data) {
        if (err) {
         res.status(400).json({
           success:false,
           message:"download error"
         })
        
        }
        
       
      });
      var filename = path.basename(path.join('/tmp' + '/' + option.fileName));
      var mimetype = mime.getType(path.join('/tmp' + '/' + option.fileName));
    
      res.setHeader('Content-disposition', 'attachment; filename=' + filename);
      res.setHeader('Content-type', mimetype);
     
      var filestream = fs.createReadStream(path.join('/tmp' + '/' + option.fileName));
      filestream.pipe(res);
    }else{
      var model = mongoXlsx.buildDynamicModel(order_data);
      const option = {
        // fileName: 'order-' + Date.now() + '.xlsx',
        fileName: 'order-export.xls',
        path: './controller/sales/order/',
        defaultSheetName: 'order-export',
      };
      mongoXlsx.mongoData2Xlsx(order_data, model, option, function (err, data) {
        if (err) {
          res.status(400).json({
            success:false,
            message:"download error"
          })
        }
      });
      var filename = path.basename(__dirname + '/' + option.fileName);
      var mimetype = mime.getType(__dirname + '/' + option.fileName);
    
      res.setHeader('Content-disposition', 'attachment; filename=' + filename);
      res.setHeader('Content-type', mimetype);
    
      var filestream = fs.createReadStream(__dirname + '/' + option.fileName);
      filestream.pipe(res);
    }
    } catch (err) {
      res.status(400).json({
        success: false,
        message: 'no data fount',
      });
    }
}