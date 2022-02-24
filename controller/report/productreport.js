const moment = require('moment-timezone');
const product_order = require('../../models/sales/order');
const products = require('../../models/catlog/products')

exports.PrderReport= async(req,res,next)=>{
  const order_count = await product_order.aggregate( [ {
    $match: {createDate:{$gte: new Date(moment.utc(req.query.start)),$lte: new Date(moment.utc(req.query.end))}}},
    { $group : { _id : "$productid", count: { $sum: 1 } } },{ $sort : {count: -1} }  ] )
 
  let  total_COD =''
  let  total_Prepaid=''
  let COD=[];
  let prepaid=[];
  let total=[];
  let total_COD_price=0;
  let total_prepaid_price=0;
  let shipped_order='';
  let shipped=[];
  let delivered_order='';
  let delivered=[]
    for(let i = 0 ;i < order_count.length;i++ ){
       total_COD = await product_order.find({productid :order_count[i]._id,createDate:{$gte: new Date(moment.utc(req.query.start)),$lte: new Date(moment.utc(req.query.end))} }).populate({path:'refid',model:'transection',match:{paymentgatway:'COD'}})
     
        for(let i = 0; i < total_COD.length;i++){
          if(total_COD[i].refid != null){
            COD.push(total_COD[i].refid._id)
            total_COD_price += parseFloat(total_COD[i].refid.totaldebitamount)
          }
        
        }
      
       
      total_Prepaid = await product_order.find({productid :order_count[i]._id,createDate:{$gte: new Date(moment.utc(req.query.start)),$lte: new Date(moment.utc(req.query.end))} }).populate({path:'refid',model:'transection',match:{$or:[{paymentgatway:'payumoney'},{paymentgatway:'rozorpay'},{paymentgatway:"paytm"}]}})

      for(let i = 0; i < total_Prepaid.length;i++){
       if(total_Prepaid[i].refid != null){
        prepaid.push(total_Prepaid[i].refid._id)
        total_prepaid_price += parseFloat(total_Prepaid[i].refid.totaldebitamount)
       }
     }
     shipped_order = await product_order.find({productid :order_count[i]._id,createDate:{$gte: new Date(moment.utc(req.query.start)),$lte: new Date(moment.utc(req.query.end))} }).populate({path:'orderstatusdescription',model:'orderstatus',match:{name:{$eq:'shipped'}}})
      for(let i = 0; i < shipped_order.length;i++){
       if(shipped_order[i].orderstatusdescription != null){
        shipped.push(shipped_order[i].orderstatusdescription._id)
      
       }
     }
     delivered_order = await product_order.find({productid :order_count[i]._id,createDate:{$gte: new Date(moment.utc(req.query.start)),$lte: new Date(moment.utc(req.query.end))} }).populate({path:'orderstatusdescription',model:'orderstatus',match:{name:{$eq:'delivered'}}})
      for(let i = 0; i < delivered_order.length;i++){
       if(delivered_order[i].orderstatusdescription != null){
        delivered.push(delivered_order[i].orderstatusdescription._id)
      }
     }
      const object={
        _id:order_count[i]._id,
        total:order_count[i].count,
        COD:COD.length,
        prepaid:prepaid.length,
        shipped: shipped.length,
        delivered:delivered.length,
        prepaidpersentage:parseFloat(prepaid.length/order_count[i].count *100)
      }
      total.push(object)
      }
      const product_Data = await products.find({_id:{$in:order_count}}).select('name photo')
  
    
     const merged =[];
     for(let i=0; i < order_count.length; i++) {
      merged.push({
      ...total[i], 
       ...product_Data[i]._doc
      });
    }
    
   
 
     res.status(200).json({
       success:true,
       data:merged
     })
}
exports.ProductSalesReport=async(req,res,next)=>{
  const order_count = await product_order.aggregate( [ {
    $match: {createDate:{$gte: new Date(moment.utc(req.query.start)),$lte: new Date(moment.utc(req.query.end))}}},
    { $group : { _id : "$productid", count: { $sum: 1 } } },{ $sort : {count: -1} }  ] )
 
  let  total_COD =''
  let  total_Prepaid=''
  let COD=[];
  let prepaid=[];
  let total=[];
  let total_COD_price=0;
  let total_prepaid_price=0;
  let shipped_order='';
  let shipped=[];
  let delivered_order='';
  let delivered=[]
  let total_amount ='';
  let total_collection_amount=0;
  let total_cancel ='';
  let total_cancel_amount=0;
    for(let i = 0 ;i < order_count.length;i++ ){
      total_amount = await product_order.find({productid :order_count[i]._id,createDate:{$gte: new Date(moment.utc(req.query.start)),$lte: new Date(moment.utc(req.query.end))} }).populate({path:'refid',model:'transection'})
      for(let i = 0; i <  total_amount.length;i++){
        if( total_amount[i].refid != null){
        
          total_collection_amount += parseFloat(total_amount[i].refid.totaldebitamount)
        }
      
      }
      console.log(total_collection_amount)
      total_COD = await product_order.find({productid :order_count[i]._id,createDate:{$gte: new Date(moment.utc(req.query.start)),$lte: new Date(moment.utc(req.query.end))} }).populate({path:'refid',model:'transection',match:{paymentgatway:'COD'}})
     
        for(let i = 0; i < total_COD.length;i++){
          if(total_COD[i].refid != null){
            COD.push(total_COD[i].refid._id)
            total_COD_price += parseFloat(total_COD[i].refid.totaldebitamount)
          }
        
        }
        total_cancel = await product_order.find({productid :order_count[i]._id,createDate:{$gte: new Date(moment.utc(req.query.start)),$lte: new Date(moment.utc(req.query.end))} }).populate({path:'refid',model:'transection',match:{paymentgatway:'cancelled'}})
     
        for(let i = 0; i < total_cancel.length;i++){
          if(total_cancel[i].refid != null){
            total_cancel_amount += parseFloat(total_cancel[i].refid.totaldebitamount)
          }
         }
       
      total_Prepaid = await product_order.find({productid :order_count[i]._id,createDate:{$gte: new Date(moment.utc(req.query.start)),$lte: new Date(moment.utc(req.query.end))} }).populate({path:'refid',model:'transection',match:{$or:[{paymentgatway:'payumoney'},{paymentgatway:'rozorpay'},{paymentgatway:"paytm"}]}})

      for(let i = 0; i < total_Prepaid.length;i++){
       if(total_Prepaid[i].refid != null){
        prepaid.push(total_Prepaid[i].refid._id)
        total_prepaid_price += parseFloat(total_Prepaid[i].refid.totaldebitamount)
       }
     }
     shipped_order = await product_order.find({productid :order_count[i]._id,createDate:{$gte: new Date(moment.utc(req.query.start)),$lte: new Date(moment.utc(req.query.end))} }).populate({path:'orderstatusdescription',model:'orderstatus',match:{name:{$eq:'shipped'}}})
      for(let i = 0; i < shipped_order.length;i++){
       if(shipped_order[i].orderstatusdescription != null){
        shipped.push(shipped_order[i].orderstatusdescription._id)
      
       }
     }
     delivered_order = await product_order.find({productid :order_count[i]._id,createDate:{$gte: new Date(moment.utc(req.query.start)),$lte: new Date(moment.utc(req.query.end))} }).populate({path:'orderstatusdescription',model:'orderstatus',match:{name:{$eq:'delivered'}}})
      for(let i = 0; i < delivered_order.length;i++){
       if(delivered_order[i].orderstatusdescription != null){
        delivered.push(delivered_order[i].orderstatusdescription._id)
      }
     }
      const object={
        _id:order_count[i]._id,
        Total:order_count[i].count,
        Total_Amount:total_collection_amount,
        COD:total_COD_price,
        Prepaid: total_prepaid_price,
        cancelled:total_cancel_amount,
        prepaidpersentage:parseFloat(prepaid.length/order_count[i].count *100)
      }
      total.push(object)
      }
      const product_Data = await products.find({_id:{$in:order_count}}).select('name photo')
  
    
     const merged =[];
     for(let i=0; i < order_count.length; i++) {
      merged.push({
      ...total[i], 
       ...product_Data[i]._doc
      });
    }
    
   
 
     res.status(200).json({
       success:true,
       data:merged
     })
}