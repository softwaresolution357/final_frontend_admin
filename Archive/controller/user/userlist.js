const guest = require('../../models/user/ordercustomer');
const register = require('../../models/user/customer');
exports.getGuestCustomer = async (req, res, next) => {
  try {
    const guestdata = await guest.find({ usertype: 'guest' }).sort({ _id: -1 });
    if (!guestdata) {
      res.status(400).json({
        success: false,
        data: [],
        message: 'no data found',
      });
    }
    const fainaldata = [];
    for (const {
      _id: _id,
      name: name,
      email: email,
      mobile: mobile,
    } of guestdata) {
      const data = {
        _id: _id,
        name: name,
        email: email,
        mobile: mobile,
      };
      fainaldata.push(data);
    }
    res.status(200).json({
      success: true,
      data: fainaldata,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: [],
      message: 'no data found',
    });
  }
};
exports.getRegisteruser = async (req, res, next) => {
  try {
    let logindata = '';
    if (req.query.type === 'dashboard') {
      logindata = await register
        .find()
        .limit(5)
        .sort({ _id: -1 })
        .select('_id name email mobile');
    } else {
      logindata = await register
        .find()
        .limit(5)
        .sort({ _id: -1 })
        .select('_id name email mobile');
    }
    res.status(200).json({
      success: true,
      data: logindata,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: [],
      message: 'no data found',
    });
  }
};
exports.singlegetRegisteruser=async(req,res,next)=>{
  try{
    console.log(req.params.id)
    const guestdata = await register.findOne({_id:req.params.id }).sort({ _id: -1 });
   console.log(guestdata)
    res.status(202).json({
      success:true,
      data:guestdata
    })
  }catch(err){
    res.status(400).json({
      success:false,
      message:err
    })
  }


}
exports.singlegetGuestCustomer = async(req,res,next)=>{
try{
    const guestdata = await guest.findOne({_id:req.params.id, usertype: 'guest' }).sort({ _id: -1 });
    res.status(202).json({
      success:true,
      data:guestdata
    })
  }catch(err){
    res.status(202).json({
      success:false,
      message:err
    })
  }
}