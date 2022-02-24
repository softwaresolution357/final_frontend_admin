const path = require('path');
const moment = require('moment-timezone');
const product = require('../../models/catlog/products');
const transectioncreate = require('../../models/sales/transection');
const ordercustomer = require('../../models/user/ordercustomer');
const product_order = require('../../models/sales/order');
const register = require('../../models/user/customer');
const currency = require('../../models/system/currency');
const { createInvoice } = require('../invoice/createInvoice');
const status = require('../../models/catlog/status');
const order_status = require('../../models/sales/orderstatus');
const { sendEmailTemplate } = require('../../common/common');
const homepageseo = require('../../models/cms/homeseo');
const integration = require('../../models/system/integration');
const cancelrefundreplace = require('../../models/catlog/cancel_refund_replace');
const address = require('../../models/user/address');
exports.OrderSuccess = async (req, res, next) => {

  const transection = await transectioncreate.findOne({
    refid: req.params.refid,
  });
  const currencydata = await currency
    .findOne({ status: true })
    .select('symbol');
    
  const customer = await ordercustomer
    .findOne({ transection: transection._id })
    .populate({
      path: 'orderid',
      model: 'order',
      populate: [
        {
          path: 'productid',
          model: 'products',
          select: 'name slug photo',
        },
        {
          path: 'orderstatusdescription',
          model: 'orderstatus',
          select: 'deliverdate',
        },
      ],
    });
  
  // await sendEmailTemplate(
  //   customer,
  //   customer.orderid,
  //   transection,
  //   currencydata.symbol !=  null ? currencydata.symbol :''
  // );

  res.status(200).json({
    success: true,
    customer: customer,
    invoice: customer.orderid,
    order: transection,
    symbol:currencydata !=null ?currencydata.symbol :'',
  });
};
exports.ListOrder = async (req, res, next) => {
  console.log(req.id)
  const data = await register.findOne({ _id: req.id });
  
  const listofOrder = await product_order
    .find({ _id: { $in: data.order } })
    .select('totalamount ')
    .populate({
      path: 'refid',
      model: 'transection',
      select: 'refid',
    })
    .populate({
      path: 'productid',
      model: 'products',
      select: 'photo name brand',
    })
    .populate({
      path: 'customerid',
      model: 'ordercustomer',
      select: 'deliverdate ',
    })
    .populate({
      path: 'orderstatusdescription',
      model: 'orderstatus',
      select: 'description',
    });
  const currencydata = await currency
    .findOne({ status: true })
    .select('symbol');
  res.status(200).json({
    success: true,
    list: listofOrder,
    symbol: currencydata.symbol,
  });
};
exports.SingleOrder = async (req, res, next) => {
  const listofOrder = await product_order
    .findOne({ _id: req.params.id })

    .populate({
      path: 'refid',
      model: 'transection',
    })
    .populate({
      path: 'productid',
      model: 'products',
    })
    .populate({
      path: 'customerid',
      model: 'ordercustomer',
    })
    .populate({
      path: 'orderstatusdescription',
      model: 'orderstatus',
    });
  const currencydata = await currency
    .findOne({ status: true })
    .select('symbol');
  res.status(200).json({
    success: true,
    list: listofOrder,
    symbol: currencydata.symbol,
  });
};
exports.CancelReason = async (req, res, next) => {
  const cancel = await status.findOne({ name: req.query.type });
  
  res.status(202).json({
    success: true,
    dropdown: cancel === null ? [] : cancel.dropdown,
  });
};
exports.CancelProduct = async (req, res, next) => {
  try {
    const cancel_data = await product_order.findOne({ _id: req.params.id });
    
    // const order_status_product = await order_status.findOne({
    //   _id: cancel_data.orderstatusdescription,
    // });
    await cancelrefundreplace.create({
      cancelby: req.id,
      orderid: req.params.id,
      ordertype: req.body.type,
      reason: req.body.reason,
      description: req.body.description,
      lastupdatetime: moment
        .tz(Date.now(), 'Asia/Kolkata')
        .format('DD/MM/YYYY HH:mm:ss'),
      image: req.body.photo,
    });
    
    await order_status.findByIdAndUpdate(
      { _id: cancel_data.orderstatusdescription },
      {
        name: req.body.type,
        currentstatus: req.body.reason,
        statusdata: moment
          .tz(Date.now(), 'Asia/Kolkata')
          .format('DD/MM/YYYY HH:mm:ss'),
      }
    );
    await order_status.findByIdAndUpdate(
      { _id: cancel_data.orderstatusdescription },
      {
        $push: {
          description: {
            name: req.body.type,
            lastupdatetime: moment
              .tz(Date.now(), 'Asia/Kolkata')
              .format('DD/MM/YYYY HH:mm:ss'),
            description: req.body.reason,
          },
        },
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.GetTesData = async (req, res, next) => {
  const product_data = await product
    .find()
    .skip(req.params.skip * 1)
    .limit(15)
    .select('name');

  const count = await product.countDocuments();

  res.status(200).json({
    success: true,
    count: count,
    data: product_data,
  });
};

exports.integrationData = async(req,res,next)=>{
    const integration_data = await integration.findOne()
    const home_seo = await homepageseo.findOne()
   
    res.status(200).json({
      success:true,
      home:home_seo == null ?{} :home_seo,
      integration: integration_data == null ? {} :integration_data ,
    })
}
exports.deletedAddess = async (req,res,next)=>{
 const delete_address_data = await register.findByIdAndUpdate({_id:req.id},{$pull:{address:req.params.id}})
 const data = await address.findByIdAndDelete({_id:req.params.id})
 res.status(200).json({
   success:true
 })
}