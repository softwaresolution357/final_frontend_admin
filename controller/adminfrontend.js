const product_order = require('../models/sales/order');
const transection = require('../models/sales/transection');
const general = require('../models/system/general');
const media_gallery = require('../models/extra/gallery')
const currency = require('../models/system/currency');
const products = require('../models/catlog/products')
const moment = require('moment-timezone');
exports.TotalSales = async (req, res, next) => {
  try {
   const total_amount = await transection.aggregate([
     { $match: { createDate:{$gte:new Date(moment.utc(req.query.start)),$lte:new Date(moment.utc(req.query.end))}}},
      {
        $group: {
          _id: null,
         
          total: { $sum: { $toDouble: '$totaldebitamount' } },
        },
      },
    ]);
    console.log(total_amount)
    const prepaid_amount = await transection.aggregate([
      {
        $match: {
          date:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)},
          $or: [{ paymentgatway: 'pymoney' }],
        },
      },
      {
        $group: {
          _id: null,

          total_prepaid: { $sum: { $toDouble: '$totaldebitamount' } },
        },
      },
    ]);
   
    const total_sales = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}});
 
    const transectionvalue = await transection.find({
      $or: [{ paymentgatway: 'pymoney' }],date:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}
    });
    const transectiondata = [];
    for (const { _id: _id } of transectionvalue) {
      transectiondata.push(_id);
    }
    const prepaid_sales = await product_order.countDocuments({
      refid: { $in: [transectiondata] }, createDate:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)},
    });
    console.log(prepaid_sales);
    const currencydata = await currency
      .findOne({ status: true })
      .select('symbol');
      
    res.status(200).json({
      success: true,
      total_sales: total_sales,
      total_amount: total_amount,
      prepaid_amount: prepaid_amount,

      prepaid_sales: prepaid_sales,
      symbol: currencydata !== null ?currencydata.symbol:''
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
    });
  }
};

exports.OrderCount= async(req,res,next)=>{
  try{
    const order_count = await product_order.aggregate( [ {
      $match: {createDate:{$gte: new Date(moment.utc(req.query.start)),$lte: new Date(moment.utc(req.query.end))}}},
      { $group : { _id : "$productid", count: { $sum: 1 } } },{ $sort : {count: -1} }  ] )
    
     const product_Data = await products.find({_id:{$in:order_count}}).select('name')
     
       const merged =[];
     
     for(let i=0; i < order_count.length; i++) {
       merged.push({
       ...order_count[i], 
        ...product_Data[i]._doc
       });
     }
     const arrayUniqueByKey = [...new Map(merged.map(item =>
       [item['_id'], item])).values()];
       res.status(200).json({
         success:true,
         data:arrayUniqueByKey
       })
  }catch(err){
    console.log(err)
    res.status(400).json({
      success:false,
    })
  }
  
   
}

exports.Header = async (req,res,next)=>{
  let faviocon_logo ='';
  let general_data= '';
 faviocon_logo = await media_gallery.findOne({name:'favicon_logo.png'})
 general_data = await general.findOne();

if(faviocon_logo == null){
  faviocon_logo ='';
}
if(general_data == null){
  general_data ={};
}
res.status(200).json({
success:true,
data:general_data,
favicon:faviocon_logo,
})
}