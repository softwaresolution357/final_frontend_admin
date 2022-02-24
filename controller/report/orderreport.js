const product_order = require('../../models/sales/order');
const requestIp = require('request-ip');
const moment = require('moment-timezone')
exports.OrderReport= async(req,res,next)=>{
    

    const fainaldata=[]
    const statedata =[];
    let onedate =0,twodate =0,threedate =0,fourdate =0,fivedate =0,sixdate =0,sevendate =0,eightdate =0,ninedate =0,tendatet =0,
    elevendate =0,twelvedate =0,thirteendate =0,fourteendate =0,fifteendate =0,sixteendate =0,seventeendate =0,eighteendate =0,ninteendate =0,twentydate =0,
    twentyonedate =0,twentytwodate =0,twentythreedate =0,twentyfourdate =0;
    let AN =[],AP =[],AR =[],AS =[],BR =[],CG =[],CH =[],DD =[],DH =[],DL =[],
    GA =[],GJ =[],HR =[],HP =[],JK =[],JH =[],KA =[],KL =[],LD =[],MP =[],
    MH =[],MN =[],ML =[],MZ =[], NL=[],OR =[],PB =[],PY =[],RJ =[],SK =[],TN =[],TR=[],UK =[],UP =[],WB =[];
 

 const differencedate = moment.utc(req.query.end.split(" ")[0]).diff(req.query.start.split(" ")[0],'days');
    if(differencedate == 0){
        
            let onemomnet ='',twomomnet ='',threemomnet ='',fourmomnet ='',fivemomnet ='',sixmomnet ='',sevenmomnet ='',eightmomnet ='',ninemomnet ='',tenmomnet ='',
            elevenmomnet ='',twelvemomnet ='',thirteenmomnet ='',fourteenmomnet ='',fifteenmomnet ='',sixteenmomnet ='',seventeenmomnet ='',eighteenmomnet ='',ninteenmomnet ='',twentymomnet ='',
            twentyonemomnet ='',twentytwomomnet ='',twentythreemomnet ='',twentyfourmomnet ='';

            onemomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.start).add('1',"h")}});
            twomomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add('1',"h"),$lte: moment.utc(req.query.start).add('2',"h")}});
            threemomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add('2',"h"),$lte: moment.utc(req.query.start).add('3',"h")}});
            fourmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add('3',"h"),$lte: moment.utc(req.query.start).add('4',"h")}});
            fivemomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add('4',"h"),$lte: moment.utc(req.query.start).add('5',"h")}});
            sixmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add('5',"h"),$lte: moment.utc(req.query.start).add('6',"h")}});
            sevenmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add('6',"h"),$lte: moment.utc(req.query.start).add('7',"h")}});
            eightmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add('7',"h"),$lte: moment.utc(req.query.start).add('8',"h")}});
            ninemomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add('8',"h"),$lte: moment.utc(req.query.start).add('9',"h")}});
            tenmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add('9',"h"),$lte: moment.utc(req.query.start).add('10',"h")}});
            elevenmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add('10',"h"),$lte: moment.utc(req.query.start).add('11',"h")}});
            twelvemomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add('11',"h"),$lte: moment.utc(req.query.start).add('12',"h")}});
           thirteenmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add('12',"h"),$lte: moment.utc(req.query.start).add('13',"h")}});
            fourteenmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add('13',"h"),$lte: moment.utc(req.query.start).add('14',"h")}});
            fifteenmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add('14',"h"),$lte: moment.utc(req.query.start).add('15',"h")}});
             sixteenmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add('15',"h"),$lte: moment.utc(req.query.start).add('16',"h")}});
             seventeenmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add('16',"h"),$lte: moment.utc(req.query.start).add('17',"h")}});
             eighteenmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add('17',"h"),$lte: moment.utc(req.query.start).add('18',"h")}});
             ninteenmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add('18',"h"),$lte: moment.utc(req.query.start).add('19',"h")}});
             twentymomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add('19',"h"),$lte: moment.utc(req.query.start).add('20',"h")}});
             twentyonemomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add('20',"h"),$lte: moment.utc(req.query.start).add('21',"h")}});
             twentytwomomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add('21',"h"),$lte: moment.utc(req.query.start).add('22',"h")}});
             twentythreemomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add('22',"h"),$lte: moment.utc(req.query.start).add('23',"h")}});
             twentyfourmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add('22',"h"),$lte: moment.utc(req.query.end)}})
      
             onedate += onemomnet;
             twodate +=twomomnet;
             threedate +=threemomnet;
             fourdate +=fourmomnet;
             fivedate +=fivemomnet;
             sixdate +=sixmomnet;
             sevendate +=sevenmomnet;
             eightdate +=eightmomnet;
             ninedate +=ninemomnet;
             tendatet +=tenmomnet;
    elevendate +=elevenmomnet;
    twelvedate +=twelvemomnet;
    thirteendate +=thirteenmomnet;
    fourteendate +=fourteenmomnet;
    fifteendate +=fifteenmomnet;
    sixteendate +=sixteenmomnet;
    seventeendate +=seventeenmomnet;
    eighteendate +=eighteenmomnet;
    ninteendate+=ninteenmomnet;
    twentydate +=twentymomnet;
    twentyonedate +=twentyonemomnet;
    twentytwodate += twentytwomomnet;
    twentythreedate+= twentythreemomnet;
    twentyfourdate +=twentyfourmomnet;
            
           
    
   
     fainaldata.push(onedate,twodate,threedate,fourdate,fivedate,sixdate,sevendate,eightdate,ninedate,tendatet,
     elevendate,twelvedate,thirteendate,fourteendate,fifteendate,sixteendate,seventeendate,eighteendate,ninteendate,twentydate,
     twentyonedate,twentytwodate,twentythreedate,twentyfourdate)
       
    }else{
        for(let i =0; i < parseInt(differencedate) + parseInt(1);i++){
            let onemomnet ='',twomomnet ='',threemomnet ='',fourmomnet ='',fivemomnet ='',sixmomnet ='',sevenmomnet ='',eightmomnet ='',ninemomnet ='',tenmomnet ='',
            elevenmomnet ='',twelvemomnet ='',thirteenmomnet ='',fourteenmomnet ='',fifteenmomnet ='',sixteenmomnet ='',seventeenmomnet ='',eighteenmomnet ='',ninteenmomnet ='',twentymomnet ='',
            twentyonemomnet ='',twentytwomomnet ='',twentythreemomnet ='',twentyfourmomnet ='';
        
            onemomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days'),$lte: moment.utc(req.query.start).add(i, 'days').add('1',"h")}});
        
            twomomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days').add('1',"h"),$lte: moment.utc(req.query.start).add(i, 'days').add('2',"h").toDate()}});
            threemomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days').add('2',"h"),$lte: moment.utc(req.query.start).add(i, 'days').add('3',"h").toDate()}});
            fourmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days').add('3',"h"),$lte: moment.utc(req.query.start).add(i, 'days').add('4',"h").toDate()}});
            fivemomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days').add('4',"h"),$lte: moment.utc(req.query.start).add(i, 'days').add('5',"h").toDate()}});
            sixmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days').add('5',"h"),$lte: moment.utc(req.query.start).add(i, 'days').add('6',"h").toDate()}});
            sevenmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days').add('6',"h"),$lte: moment.utc(req.query.start).add(i, 'days').add('7',"h").toDate()}});
            eightmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days').add('7',"h"),$lte: moment.utc(req.query.start).add(i, 'days').add('8',"h").toDate()}});
            ninemomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days').add('8',"h"),$lte: moment.utc(req.query.start).add(i, 'days').add('9',"h").toDate()}});
            tenmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days').add('9',"h"),$lte: moment.utc(req.query.start).add(i, 'days').add('10',"h").toDate()}});
        
            elevenmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days').add('10',"h").toDate(),$lte: moment.utc(req.query.start).add(i, 'days').add('11',"h").toDate()}});
        
            twelvemomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days').add('11',"h").toDate(),$lte: moment.utc(req.query.start).add(i, 'days').add('12',"h").toDate()}});
           thirteenmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days').add('12',"h").toDate(),$lte: moment.utc(req.query.start).add(i, 'days').add('13',"h").toDate()}});
            fourteenmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days').add('13',"h").toDate(),$lte: moment.utc(req.query.start).add(i, 'days').add('14',"h").toDate()}});
            fifteenmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days').add('14',"h").toDate(),$lte: moment.utc(req.query.start).add(i, 'days').add('15',"h").toDate()}});
             sixteenmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days').add('15',"h").toDate(),$lte: moment.utc(req.query.start).add(i, 'days').add('16',"h").toDate()}});
             seventeenmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days').add('16',"h").toDate(),$lte: moment.utc(req.query.start).add(i, 'days').add('17',"h").toDate()}});
             eighteenmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days').add('17',"h").toDate(),$lte: moment.utc(req.query.start).add(i, 'days').add('18',"h").toDate()}});
             ninteenmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days').add('18',"h").toDate(),$lte: moment.utc(req.query.start).add(i, 'days').add('19',"h").toDate()}});
             twentymomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days').add('19',"h").toDate(),$lte: moment.utc(req.query.start).add(i, 'days').add('20',"h").toDate()}});
             twentyonemomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days').add('20',"h").toDate(),$lte: moment.utc(req.query.start).add(i, 'days').add('21',"h").toDate()}});
             twentytwomomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days').add('21',"h").toDate(),$lte: moment.utc(req.query.start).add(i, 'days').add('22',"h").toDate()}});
             twentythreemomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days').add('22',"h").toDate(),$lte: moment.utc(req.query.start).add(i, 'days').add('23',"h").toDate()}});
            
             twentyfourmomnet = await product_order.countDocuments({createDate:{$gte: moment.utc(req.query.start).add(i, 'days').add('23',"h").toDate(),$lte: moment.utc(req.query.start).add(i, 'days').add('24',"h").toDate()}})
      
             onedate += onemomnet;
             twodate +=twomomnet;
             threedate +=threemomnet;
             fourdate +=fourmomnet;
             fivedate +=fivemomnet;
             sixdate +=sixmomnet;
             sevendate +=sevenmomnet;
             eightdate +=eightmomnet;
             ninedate +=ninemomnet;
             tendatet +=tenmomnet;
    elevendate +=elevenmomnet;
    twelvedate +=twelvemomnet;
    thirteendate +=thirteenmomnet;
    fourteendate +=fourteenmomnet;
    fifteendate +=fifteenmomnet;
    sixteendate +=sixteenmomnet;
    seventeendate +=seventeenmomnet;
    eighteendate +=eighteenmomnet;
    ninteendate+=ninteenmomnet;
    twentydate +=twentymomnet;
    twentyonedate +=twentyonemomnet;
    twentytwodate += twentytwomomnet;
    twentythreedate+= twentythreemomnet;
    twentyfourdate +=twentyfourmomnet;
            
           }
           fainaldata.push(onedate,twodate,threedate,fourdate,fivedate,sixdate,sevendate,eightdate,ninedate,tendatet,
            elevendate,twelvedate,thirteendate,fourteendate,fifteendate,sixteendate,seventeendate,eighteendate,ninteendate,twentydate,
            twentyonedate,twentytwodate,twentythreedate,twentyfourdate)
              
    }
   
    // if(differencedate == 0){
        
     
        let ANmomnet =0,APmomnet =0,ARmomnet =0,ASmomnet =0,BRmomnet =0,CGmomnet =0,CHmomnet =0,DDmomnet =0,DHmomnet =0,DLmomnet =0,
        GAmomnet =0,GJmomnet =0,HRmomnet =0,HPmomnet =0,JKmomnet =0,JHmomnet =0,KAmomnet =0,KLmomnet =0,LDmomnet =0,MPmomnet =0,
        MHmomnet =0,MNmomnet =0,MLmomnet =0,MZmomnet =0, NLmomnet=0,ORmomnet =0,PBmomnet =0,PYmomnet =0,RJmomnet =0,SKmomnet =0,TNmomnet =0,TRmomnet =0,UKmomnet =0,UPmomnet =0,WBmomnet =0;
        ANmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer',match:{state:{$eq:"ANDAMAN AND NICOBAR ISLANDS"},created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
      
        for(let i = 0; i < ANmomnet.length;i++){
           if(ANmomnet[i].customerid != null){
            AN.push(ANmomnet._id)
           } 
        }
      
        APmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { state:{$eq:'ANDHRA PRADESH'} ,created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < APmomnet.length;i++){
            if(APmomnet[i].customerid != null){
             AP.push(APmomnet._id)
            } 
         }
        ARmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { state:{$eq: 'ARUNACHAL PRADESH' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < ARmomnet.length;i++){
            if(ARmomnet[i].customerid != null){
                AR.push(ARmomnet._id)
            } 
         }
        ASmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { state:{$eq: 'ASSAM' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < ASmomnet.length;i++){
            if(ASmomnet[i].customerid != null){
                AS.push(ASmomnet._id)
            } 
         }
        BRmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { state:{$eq: 'BIHAR' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < BRmomnet.length;i++){
            if(BRmomnet[i].customerid != null){
                BR.push(BRmomnet._id)
            } 
         }
        CGmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { state:{$eq: 'CHHATTISGARH' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < CGmomnet.length;i++){
            if(CGmomnet[i].customerid != null){
                CG.push(CGmomnet._id)
            } 
         }
        CHmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate: {$eq: 'CHANDIGARH' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < CHmomnet.length;i++){
            if(CHmomnet[i].customerid != null){
                CH.push(CHmomnet._id)
            } 
         }
        DDmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate:{$eq: 'DAMAN AND DIU' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < DDmomnet.length;i++){
            if(DDmomnet[i].customerid != null){
                DD.push(DDmomnet._id)
            } 
         }
        DHmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate:{$eq: 'DADRA AND NAGAR HAVELI' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < DHmomnet.length;i++){
            if(DHmomnet[i].customerid != null){
                DH.push(DHmomnet._id)
            } 
         }
        DLmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate:{$eq: 'DELHI' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < DLmomnet.length;i++){
            if(DLmomnet[i].customerid != null){
                DL.push(DLmomnet._id)
            } 
         }
        GAmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate:{$eq: 'GOA' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < GAmomnet.length;i++){
            if(GAmomnet[i].customerid != null){
                GA.push(GAmomnet._id)
            } 
         }
        GJmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate: {$eq:'GUJARAT' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < GJmomnet.length;i++){
            if(GJmomnet[i].customerid != null){
                GJ.push(GJmomnet._id)
            } 
         }
        HRmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate:{$eq: 'HARYANA' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < HRmomnet.length;i++){
            if(HRmomnet[i].customerid != null){
                HR.push(HRmomnet._id)
            } 
         }
        HPmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate:{$eq: 'HIMACHAL PRADESH' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < HPmomnet.length;i++){
            if(HPmomnet[i].customerid != null){
                HP.push(HPmomnet._id)
            } 
         }
        JKmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate:{$eq: 'JAMMU AND KASHMIR' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < JKmomnet.length;i++){
            if(JKmomnet[i].customerid != null){
                JK.push(JKmomnet._id)
            } 
         }
        JHmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate:{$eq: 'JHARKHAND' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < JHmomnet.length;i++){
            if(JHmomnet[i].customerid != null){
                JH.push(JHmomnet._id)
            } 
         }
        KAmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate: {$eq:'KARNATAKA' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < KAmomnet.length;i++){
            if(KAmomnet[i].customerid != null){
                KA.push(KAmomnet._id)
            } 
         }
        KLmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate:{$eq: 'KERALA' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < KLmomnet.length;i++){
            if(KLmomnet[i].customerid != null){
                KL.push(KLmomnet._id)
            } 
         }
        LDmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate:{$eq: 'LAKSHADWEEP' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < LDmomnet.length;i++){
            if(LDmomnet[i].customerid != null){
                LD.push(LDmomnet._id)
            } 
         }
        MPmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate: {$eq:'MADHYA PRADESH' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < MPmomnet.length;i++){
            if(MPmomnet[i].customerid != null){
                MP.push(MPmomnet._id)
            } 
         }
        MHmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate:{$eq: 'MAHARASHTRA' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < MHmomnet.length;i++){
            if(MHmomnet[i].customerid != null){
                MH.push(MHmomnet._id)
            } 
         }
        MNmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate: {$eq:'MANIPUR' }}})
        for(let i = 0; i < MNmomnet.length;i++){
            if(MNmomnet[i].customerid != null){
                MN.push(MNmomnet._id)
            } 
         }
        MLmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate:{$eq: 'MEGHALAYA' }}})
        for(let i = 0; i < MLmomnet.length;i++){
            if(MLmomnet[i].customerid != null){
                ML.push(MLmomnet._id)
            } 
         }
        MZmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate:{$eq: 'MIZORAM' }}})
        for(let i = 0; i < MZmomnet.length;i++){
            if(MZmomnet[i].customerid != null){
                MZ.push(MZmomnet._id)
            } 
         }
        NLmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate:{$eq: 'NAGALAND' }}})
        for(let i = 0; i < NLmomnet.length;i++){
            if(NLmomnet[i].customerid != null){
                NL.push(NLmomnet._id)
            } 
         }
        ORmomnet = await product_order.find({createDate:{$gte: moment.utc(req.query.start).toDate(),$lte: moment.utc(req.query.end)}}).populate({path:'customerid',ref:'ordercustomer', match: { shippingstate:{$eq: 'ODISHA' }}})
    
        for(let i = 0; i < ORmomnet.length;i++){
            if(ORmomnet[i].customerid != null){
                OR.push(ORmomnet._id)
            } 
         }
        PBmomnet = await product_order.find({createDate:{$gte: moment.utc(req.query.start).toDate(),$lte: moment.utc(req.query.end)}}).populate({path:'customerid',ref:'ordercustomer', match: { shippingstate:{$eq: 'PUNJAB' }}})
        for(let i = 0; i < PBmomnet.length;i++){
            if(PBmomnet[i].customerid != null){
                PB.push(PBmomnet._id)
            } 
         }
        PYmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate:{$eq: 'PONDICHERRY' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < PYmomnet.length;i++){
            if(PYmomnet[i].customerid != null){
                PY.push(PYmomnet._id)
            } 
         }
        RJmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate:{$eq: 'RAJASTHAN' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < RJmomnet.length;i++){
            if(RJmomnet[i].customerid != null){
                RJ.push(RJmomnet._id)
            } 
         }
        SKmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate:{$eq: 'SIKKIM' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < SKmomnet.length;i++){
            if(SKmomnet[i].customerid != null){
                SK.push(SKmomnet._id)
            } 
         }
        TNmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate:{$eq: 'TAMIL NADU' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < TNmomnet.length;i++){
            if(TNmomnet[i].customerid != null){
                TN.push(TNmomnet._id)
            } 
         }
        TRmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate:{$eq: 'TRIPURA' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < TRmomnet.length;i++){
            if(TRmomnet[i].customerid != null){
                TR.push(TRmomnet._id)
            } 
         }
        UKmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate:{$eq: 'UTTARAKHAND' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < UKmomnet.length;i++){
            if(UKmomnet[i].customerid != null){
                UK.push(UKmomnet._id)
            } 
         }
        UPmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: { shippingstate:{$eq: 'UTTAR PRADESH' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < UPmomnet.length;i++){
            if(UPmomnet[i].customerid != null){
                UP.push(UPmomnet._id)
            } 
         }
        WBmomnet = await product_order.find().populate({path:'customerid',ref:'ordercustomer', match: {shippingstate
            :{$eq: 'WEST BENGAL' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
        for(let i = 0; i < WBmomnet.length;i++){
            if(WBmomnet[i].customerid != null){
                WB.push(WBmomnet._id)
            } 
         }
        // AN += ANmomnet;
        // AP +=APmomnet;
        // AR +=ARmomnet;
        // AS +=ASmomnet;
        // BR +=BRmomnet;
        // CG +=CGmomnet;
        // CH +=CHmomnet;
        // DD +=DDmomnet;
        // DH +=DHmomnet;
        // DL +=DLmomnet;
        // GA +=GAmomnet;
        // GJ +=GJmomnet;
        // HR +=HRmomnet;
        // HP +=HPmomnet;
        // JK +=JKmomnet;
        // JH +=JHmomnet;
        // KA +=KAmomnet;
        // KL +=KLmomnet;
        // LD+=LDmomnet;
        // MP +=MPmomnet;
        // MH +=MHmomnet;
        // MN += MNmomnet;
        // ML+= MLmomnet;
        // MZ +=MZmomnet;

        // NL +=NLmomnet;
        // OR +=ORmomnet;
        // PB +=PBmomnet;
        // PY  +=PYmomnet;
        // RJ+=RJmomnet;
        // SK +=SKmomnet;
        // TN +=TNmomnet;
        // TR +=TRmomnet;
        // UK += UKmomnet;
        // UP+= UPmomnet;
        // WB +=WBmomnet;

   
// }else{
    // for(let i =0; i < parseInt(differencedate) + parseInt(1);i++){
    //     let ANmomnet =0,APmomnet =0,ARmomnet =0,ASmomnet =0,BRmomnet =0,CGmomnet =0,CHmomnet =0,DDmomnet =0,DHmomnet =0,DLmomnet =0,
    //     GAmomnet =0,GJmomnet =0,HRmomnet =0,HPmomnet =0,JKmomnet =0,JHmomnet =0,KAmomnet =0,KLmomnet =0,LDmomnet =0,MPmomnet =0,
    //     MHmomnet =0,MNmomnet =0,MLmomnet =0,MZmomnet =0, NLmomnet=0,ORmomnet =0,PBmomnet =0,PYmomnet =0,RJmomnet =0,SKmomnet =0,TNmomnet =0,TRmomnet =0,UKmomnet =0,UPmomnet =0,WBmomnet =0;

    //    ANmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'ANDAMAN AND NICOBAR ISLANDS' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     APmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'ANDHRA PRADESH' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     ARmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'ARUNACHAL PRADESH' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     ASmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'ASSAM' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     BRmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'BIHAR' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     CGmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'CHHATTISGARH' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     CHmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'CHANDIGARH' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     DDmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'DAMAN AND DIU' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     DHmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'DADRA AND NAGAR HAVELI' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     DLmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'DELHI' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     GAmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'GOA' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     GJmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'GUJARAT' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     HRmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'HARYANA' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     HPmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'HIMACHAL PRADESH' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     JKmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'JAMMU AND KASHMIR' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     JHmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'JHARKHAND' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     KAmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'KARNATAKA' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     KLmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'KERALA' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     LDmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'LAKSHADWEEP' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     MPmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'MADHYA PRADESH' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     MHmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'MAHARASHTRA' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     MNmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'MANIPUR' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     MLmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'MEGHALAYA' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     MZmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'MIZORAM' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     NLmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'NAGALAND' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     ORmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'ORISSA' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     PBmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'PUNJAB' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     PYmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'PONDICHERRY' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     RJmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'RAJASTHAN' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     SKmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'SIKKIM' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     TNmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'TAMIL NADU' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     TRmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'TRIPURA' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     UKmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'UTTARAKHAND' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     UPmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'UTTAR PRADESH' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
    //     WBmomnet = await product_order.countDocuments().populate({path:'customerid',ref:'ordercustomer', match: { state: 'WEST BENGAL' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}})
  
        // AN += ANmomnet;
        // AP +=APmomnet;
        // AR +=ARmomnet;
        // AS +=ASmomnet;
        // BR +=BRmomnet;
        // CG +=CGmomnet;
        // CH +=CHmomnet;
        // DD +=DDmomnet;
        // DH +=DHmomnet;
        // DL +=DLmomnet;
        // GA +=GAmomnet;
        // GJ +=GJmomnet;
        // HR +=HRmomnet;
        // HP +=HPmomnet;
        // JK +=JKmomnet;
        // JH +=JHmomnet;
        // KA +=KAmomnet;
        // KL +=KLmomnet;
        // LD+=LDmomnet;
        // MP +=MPmomnet;
        // MH +=MHmomnet;
        // MN += MNmomnet;
        // ML+= MLmomnet;
        // MZ +=MZmomnet;

        // NL +=NLmomnet;
        // OR +=ORmomnet;
        // PB +=PBmomnet;
        // PY  +=PYmomnet;
        // RJ+=RJmomnet;
        // SK +=SKmomnet;
        // TN +=TNmomnet;
        // TR +=TRmomnet;
        // UK += UKmomnet;
        // UP+= UPmomnet;
        // WB +=WBmomnet;
        
    //    }
     
// }
statedata.push( AN.length,AP.length,AR.length,AS.length,BR.length,CG.length,CH.length,DD.length,DH.length,DL.length,GA.length,GJ.length,HR.length,HP.length,JK.length,JH.length,KA.length,KL.length,LD.length,MP.length,
    MH.length,MN.length,ML.length,MZ.length, NL.length,OR.length,PB.length,PY.length,RJ.length,SK.length,TN.length,TR.length,UK.length,UP.length,WB.length)
 const Total_Order= await product_order.countDocuments();
 const cancelled = await product_order.find().populate({path:'orderstatusdescription',ref:'orderstatus', match: { name:{$eq: 'cancelled' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
  const total_cancelled = [];
  for(let i =0; i < cancelled.length;i++){
      if(cancelled[i].orderstatusdescription != null){
        total_cancelled.push(cancelled[i]._id)
      }
  }  
  const delivered = await product_order.find().populate({path:'orderstatusdescription',ref:'orderstatus', match: { name:{$eq: 'delivered' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
  const total_delivered = [];
  for(let i =0; i < delivered.length;i++){
      if(delivered[i].orderstatusdescription != null){
        total_delivered.push(delivered[i]._id)
      }
  }  
  const shipped = await product_order.find().populate({path:'orderstatusdescription',ref:'orderstatus', match: { name:{$eq: 'shipped' },created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
  const total_shipped = [];
  for(let i =0; i < shipped.length;i++){
      if(shipped[i].orderstatusdescription != null){
        total_shipped.push(shipped[i]._id)
      }
  }  
  const cod = await product_order.find().populate({path:'refid',ref:'transection', match: { paymentgatway:{$eq: 'COD' },createDate:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})

  const total_cod = [];
  for(let i =0; i < cod.length;i++){
      if(cod[i].refid != null){
        total_cod.push(cod[i]._id)
      }
  }  
  const prepaid = await product_order.find().populate({path:'refid',ref:'transection', match: {  $or :[{name: 'paumoney' }],created:{$gte: moment.utc(req.query.start),$lte: moment.utc(req.query.end)}}})
  const total_prepaid = [];
  for(let i =0; i < prepaid.length;i++){
      if(prepaid[i].refid != null){
        total_prepaid.push(prepaid[i]._id)
      }
  }
  
 res.status(200).json({
        success:true,
        hourdata:fainaldata,
        statedata:statedata,
        TotalOrder:Total_Order,
        TotalCancelled:total_cancelled.length,
        TotalDelivered:total_delivered.length,
        TotalShipped:total_shipped.length,
        TotalCod:total_cod.length,
        TotalPrepaid:total_prepaid.length
    })
    }
