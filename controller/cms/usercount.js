const moment = require('moment-timezone')
const schedule = require('node-schedule')
const sessionstore = require('../../models/cms/storesession')
const product_order = require('../../models/sales/order');
const transection = require('../../models/sales/transection');
const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;
rule.tz = 'Asia/Calcutta';
let homepage_1 =0;
let homepage_2 =0;
let homepage_3 =0;
let homepage_4 =0;
let homepage_5 =0;
let homepage_6 =0;
let homepage =0;
let productpage_1 =0;
let productpage_2 =0;
let productpage_3 =0;
let productpage_4 =0;
let productpage_5 =0;
let productpage_6 =0;
let productpage =0;
let checkoutpage_1 =0;
let checkoutpage_2 =0;
let checkoutpage_3 =0;
let checkoutpage_4 =0;
let checkoutpage_5 =0;
let checkoutpage_6 =0;
let checkoutpage =0;
let cartpage_1 =0;
let cartpage_2 =0;
let cartpage_3 =0;
let cartpage_4 =0;
let cartpage_5 =0;
let cartpage_6 =0;
let cartpage =0;
let collectionpage_1 =0;
let collectionpage_2 =0;
let collectionpage_3 =0;
let collectionpage_4 =0;
let collectionpage_5 =0;
let collectionpage_6 =0;
let collectionpage =0;
let ordersuccesspage_1 =0;
let ordersuccesspage_2 =0;
let ordersuccesspage_3 =0;
let ordersuccesspage_4 =0;
let ordersuccesspage_5 =0;
let ordersuccesspage_6 =0;
let ordersuccesspage =0;

const job = schedule.scheduleJob(rule, function(fireDate){
 homepage_1 =0;
 homepage_2 =0;
 homepage_3 =0;
 homepage_4 =0;
 homepage_5 =0;
 homepage_6 =0;
 homepage =0;
 productpage_1 =0;
 productpage_2 =0;
 productpage_3 =0;
     productpage_4 =0;
    productpage_5 =0;
    productpage_6 =0;
    productpage =0;
    checkoutpage_1 =0;
    checkoutpage_2 =0;
    checkoutpage_3 =0;
    checkoutpage_4 =0;
     checkoutpage_5 =0;
    checkoutpage_6 =0;
checkoutpage =0;
    cartpage_1 =0;
cartpage_2 =0;
    cartpage_3 =0;
cartpage_4 =0;
    cartpage_5 =0;
    cartpage_6 =0;
    cartpage =0;
    collectionpage_1 =0;
    collectionpage_2 =0;
    collectionpage_3 =0;
    collectionpage_4 =0;
    collectionpage_5 =0;
    collectionpage_6 =0;
    collectionpage =0;
  
    ordersuccesspage_1 =0;
    ordersuccesspage_2 =0;
    ordersuccesspage_3 =0;
    ordersuccesspage_4 =0;
    ordersuccesspage_5 =0;
    ordersuccesspage_6 =0;
    ordersuccesspage =0;


    
});


exports.usercount =async (req,res,next)=>{
    const session_store = await sessionstore.countDocuments({createdate:{$gte: moment.utc(moment().startOf('day')),$lte:moment.utc(moment().endOf('day'))}})
    
    if(session_store == 0){
       await sessionstore.create({totalsession:0,ten:0,twenty:0,thirtey:0,fourty:0,fifty:0,sixty:0,checkout:0,ordersuccess:0,homepage:0,cartpage:0}) 
    }
  
    const session_id = await sessionstore.findOne({createdate:{$gte: moment.utc(moment().startOf('day')),$lte:moment.utc(moment().endOf('day'))}})
 if(req.query.pagetype == 'checkoutpage'){
    await sessionstore.findByIdAndUpdate({_id:session_id._id},{$inc:{checkoutpage:1}})
 }else if(req.query.pagetype == 'ordersuccesspage'){
    await sessionstore.findByIdAndUpdate({_id:session_id._id},{$inc:{ordersuccesspage:1}})
 }else if(req.query.pagetype == 'productpage'){
    await sessionstore.findByIdAndUpdate({_id:session_id._id},{$inc:{productpage:1}})
 }else if(req.query.pagetype == 'homepage'){
    await sessionstore.findByIdAndUpdate({_id:session_id._id},{$inc:{homepage:1}})
}else if(req.query.pagetype == 'cartpage'){
    await sessionstore.findByIdAndUpdate({_id:session_id._id},{$inc:{cartpage:1}})
}else if(req.query.pagetype == 'collectionpage'){
    await sessionstore.findByIdAndUpdate({_id:session_id._id},{$inc:{collectionpage:1}})
    }

    if((moment.tz(Date.now(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss').split(" ")[1].split(':')[1]) >= '00' && (moment.tz(Date.now(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss').split(" ")[1].split(':')[1]) <'10'){
        await sessionstore.findByIdAndUpdate({_id:session_id._id},{$inc:{ten:1}})
        await sessionstore.findByIdAndUpdate({_id:session_id._id},{sixty:1})
        if(req.query.pagetype == 'productpage'){
            productpage_1 +=1
            productpage =productpage_1;
        }else if(req.query.pagetype == 'homepage'){
            homepage_1 +=1
            homepage = homepage_1;
        }else if(req.query.pagetype == 'checkoutpage'){
            checkoutpage_1 +=1
            checkoutpage = checkoutpage_1;
        }else if(req.query.pagetype == 'cartpage'){
            cartpage_1 +=1
            cartpage = cartpage_1;
        }else if(req.query.pagetype == 'collectionpage'){
            collectionpage_1 +=1
            collectionpage = collectionpage_1;
            }else if(req.query.pagetype == 'ordersuccesspage'){
                ordersuccesspage_1 +=1
                ordersuccesspage = ordersuccesspage_1;
                }
     }else if((moment.tz(Date.now(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss').split(" ")[1].split(':')[1]) >= '10' && (moment.tz(Date.now(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss').split(" ")[1].split(':')[1]) < '20'){
        await sessionstore.findByIdAndUpdate({_id:session_id._id},{$inc:{twenty:1}})
        await sessionstore.findByIdAndUpdate({_id:session_id._id},{ten:0})
        if(req.query.pagetype == 'productpage'){
            productpage_2 +=1
            productpage =productpage_2;
        }else if(req.query.pagetype == 'homepage'){
            homepage_2 +=1
            homepage = homepage_2;
        }else if(req.query.pagetype == 'checkoutpage'){
            checkoutpage_2 +=1
            checkoutpage = checkoutpage_2;
        }else if(req.query.pagetype == 'cartpage'){
            cartpage_2 +=1
            cartpage = cartpage_2;
        }else if(req.query.pagetype == 'collectionpage'){
            collectionpage_2 +=1
            collectionpage = collectionpage_2;
            }else if(req.query.pagetype == 'ordersuccesspage'){
                ordersuccesspage_2 +=1
                ordersuccesspage = ordersuccesspage_2;
                }
    }else if((moment.tz(Date.now(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss').split(" ")[1].split(':')[1]) >= '20' && (moment.tz(Date.now(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss').split(" ")[1].split(':')[1]) < '30'){
        await sessionstore.findByIdAndUpdate({_id:session_id._id},{$inc:{thirtey:1}})
        await sessionstore.findByIdAndUpdate({_id:session_id._id},{twenty:0})
        if(req.query.pagetype == 'productpage'){
            productpage_3 +=1
            productpage =productpage_3;
        }else if(req.query.pagetype == 'homepage'){
            homepage_3 +=1
            homepage = homepage_3;
        }else if(req.query.pagetype == 'checkoutpage'){
            checkoutpage_3 +=1
            checkoutpage = checkoutpage_3;
        }else if(req.query.pagetype == 'cartpage'){
            cartpage_3 +=1
            cartpage = cartpage_3;
        }else if(req.query.pagetype == 'collectionpage'){
            collectionpage_3 +=1
            collectionpage = collectionpage_3;
            }else if(req.query.pagetype == 'ordersuccesspage'){
                ordersuccesspage_3 +=1
                ordersuccesspage =ordersuccesspage_3;
                }
    }else if((moment.tz(Date.now(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss').split(" ")[1].split(':')[1]) >= '30' && (moment.tz(Date.now(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss').split(" ")[1].split(':')[1]) < '40'){
        await sessionstore.findByIdAndUpdate({_id:session_id._id},{$inc:{fourty:1}})
        await sessionstore.findByIdAndUpdate({_id:session_id._id},{thirtey:0})
        if(req.query.pagetype == 'productpage'){
            productpage_4 +=1
            productpage =productpage_4;
        }else if(req.query.pagetype == 'homepage'){
            homepage_4 +=1
            homepage = homepage_4;
        }else if(req.query.pagetype == 'checkoutpage'){
            checkoutpage_4 +=1
            checkoutpage = checkoutpage_4;
        }else if(req.query.pagetype == 'cartpage'){
            cartpage_4 +=1
            cartpage = cartpage_4;
        }else if(req.query.pagetype == 'collectionpage'){
            collectionpage_4 +=1
            collectionpage = collectionpage_4;
            }else if(req.query.pagetype == 'ordersuccesspage'){
                ordersuccesspage_4 +=1
                ordersuccesspage = ordersuccesspage_4;
                }
    }else if((moment.tz(Date.now(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss').split(" ")[1].split(':')[1]) >= '40' && (moment.tz(Date.now(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss').split(" ")[1].split(':')[1]) < '50'){
        await sessionstore.findByIdAndUpdate({_id:session_id._id},{$inc:{fifty:1}})
        await sessionstore.findByIdAndUpdate({_id:session_id._id},{fourty:0})
        if(req.query.pagetype == 'productpage'){
            productpage_5 +=1
            productpage =productpage_5;
        }else if(req.query.pagetype == 'homepage'){
            homepage_5 +=1
            homepage = homepage_5;
        }else if(req.query.pagetype == 'checkoutpage'){
            checkoutpage_5 +=1
            checkoutpage = checkoutpage_5;
        }else if(req.query.pagetype == 'cartpage'){
            cartpage_5 +=1
            cartpage = cartpage_5;
        }else if(req.query.pagetype == 'collectionpage'){
            collectionpage_5 +=1
            collectionpage = collectionpage_5;
            }else if(req.query.pagetype == 'ordersuccesspage'){
                ordersuccesspage_5 +=1
                ordersuccesspage = ordersuccesspage_5;
                }
    }else if((moment.tz(Date.now(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss').split(" ")[1].split(':')[1]) >= '50'){
        await sessionstore.findByIdAndUpdate({_id:session_id._id},{$inc:{sixty:1}})
        await sessionstore.findByIdAndUpdate({_id:session_id._id},{fifty:0}) 
        if(req.query.pagetype == 'productpage'){
            productpage_6 +=1
            productpage =productpage_6;
        }else if(req.query.pagetype == 'homepage'){
            homepage_6 +=1
            homepage = homepage_6;
        }else if(req.query.pagetype == 'checkoutpage'){
            checkoutpage_6 +=1
            checkoutpage = checkoutpage_6;
        }else if(req.query.pagetype == 'cartpage'){
            cartpage_6 +=1
            cartpage = cartpage_6;
        }else if(req.query.pagetype == 'collectionpage'){
            collectionpage_6 +=1
            collectionpage = collectionpage_6;
            }else if(req.query.pagetype == 'ordersuccesspage'){
                ordersuccesspage_6 +=1
                ordersuccesspage = ordersuccesspage_6;
                }
    } 
   
         await sessionstore.findByIdAndUpdate({_id:session_id._id},{$inc:{totalsession:1}})
    res.status(200).json({
        success:true,
        homepage:homepage,
        productpage:productpage,
        collectionpage:collectionpage,
        cartpage:cartpage,
        checkoutpage:checkoutpage,
        ordersuccesspage:ordersuccesspage,
    })
}
exports.getUsercount=async(req,res,next)=>{
    const session_store = await sessionstore.countDocuments({createdate:{$gte: moment.utc(moment().startOf('day')),$lte:moment.utc(moment().endOf('day'))}});
    let session_data=''
    if(session_store != 0){
        const session_id = await sessionstore.findOne({createdate:{$gte: moment.utc(moment().startOf('day')),$lte:moment.utc(moment().endOf('day'))}})
         if((moment.tz(Date.now(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss').split(" ")[1].split(':')[1]) >= '00' && (moment.tz(Date.now(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss').split(" ")[1].split(':')[1]) <'10'){
             session_data =session_id.ten
        }else  if((moment.tz(Date.now(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss').split(" ")[1].split(':')[1]) >= '10' && (moment.tz(Date.now(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss').split(" ")[1].split(':')[1]) <'20'){
            session_data =session_id.twenty
        }else  if((moment.tz(Date.now(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss').split(" ")[1].split(':')[1]) >= '20' && (moment.tz(Date.now(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss').split(" ")[1].split(':')[1]) <'30'){
            session_data =session_id.thirtey
        }else  if((moment.tz(Date.now(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss').split(" ")[1].split(':')[1]) >= '30' && (moment.tz(Date.now(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss').split(" ")[1].split(':')[1]) <'40'){
            session_data =session_id.fourty
        }else  if((moment.tz(Date.now(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss').split(" ")[1].split(':')[1]) >= '40' && (moment.tz(Date.now(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss').split(" ")[1].split(':')[1]) <'50'){
            session_data =session_id.fifty
        }else if((moment.tz(Date.now(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss').split(" ")[1].split(':')[1]) >= '50' && (moment.tz(Date.now(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss').split(" ")[1].split(':')[1]) <'60'){
            session_data =session_id.sixty
        }
        const total_amount = await transection.aggregate([
            { $match: { createDate:{$gte: moment.utc(moment().startOf('day')),$lte:moment.utc(moment().endOf('day'))}}},
             {
               $group: {
                 _id: null,
                total: { $sum: { $toDouble: '$totaldebitamount' } },
               },
             },
           ]);
          const totalsales = await product_order.countDocuments({createDate:{$gte: moment.utc(moment().startOf('day')),$lte:moment.utc(moment().endOf('day'))}});
         res.status(200).json({
            success:true,
            totalsession :session_id.totalsession,
            livesission:parseInt(homepage) + parseInt(productpage) + parseInt(collectionpage)+ parseInt(checkoutpage)+ parseInt(ordersuccesspage)+ parseInt(cartpage),
            totalsalesamout: total_amount.length == 0 ? 0 : total_amount[0].total ,
            totalsales :totalsales,
            homepage:homepage,
            productpage:productpage,
            collectionpage:collectionpage,
            cartpage:cartpage,
            checkoutpage:checkoutpage,
            ordersuccesspage:ordersuccesspage
        })
    }else{
            await sessionstore.create({totalsession:0,ten:0,twenty:0,thirtey:0,fourty:0,fifty:0,sixty:0,checkout:0,ordersuccess:0,homepage:0,cartpage:0}) 
        res.status(400).json({
            success:false,
            totalsession :0,
            livesission:0
        })
    }
}