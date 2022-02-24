const order = require('../../models/user/ordercustomer');
exports.getAllMobile = async (req, res, next) => {
  try {
    const fainaldata = [];
    const data = await order.find().distinct('mobile')
    
    if (!data) {
      res.status(400).json({
        success: false,
        message: 'No data found',
      });
    }
    for (let i=0;i < data.length;i++ ){
      const smsdata={
        id:i,
        mobile:data[i]
      }
      fainaldata.push(smsdata)
    }
    
    
    res.status(202).json({
      success: true,
      data: fainaldata,
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      message: 'No data found',
    });
  }
};
