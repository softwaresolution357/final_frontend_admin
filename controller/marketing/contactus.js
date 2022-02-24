const contact = require('../../models/extra/contactus');
const constactquerlist = require('../../models/cms/contactquery');
exports.PostContact = async (req, res, next) => {
  try {
    const data = await contact.create(req.body);
    if (!data) {
      res.status(400).json({
        success: true,
        message: 'ther is some error in data base',
      });
    }
    res.status(200).json({
      success: true,
      message:
        ' Our corresponding representative contact through email and phone shortly',
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Error',
    });
  }
};
exports.getContactus = async (req, res, next) => {
  const data = await contact
    .find()
    .populate({ path: 'reason', model: 'contactquerylist', select: 'query' });

  if (!data) {
    res.status(400).json({
      success: false,
      message: 'No data found',
    });
  }
  const contactdata = [];
  for (const {
    _id: _id,
    name: name,
    mobile: mobile,
    email: email,
    reason: reason,
    priority: priority,
  } of data) {
    const data = {
      _id: _id,
      name: name,
      mobile: mobile,
      email: email,
      reason: reason.query,
      priority: priority,
    };

    contactdata.push(data);
  }
  res.status(202).json({
    success: true,
    data: contactdata,
  });
};

exports.postContactquery = async (req, res, next) => {
  console.log(req.body);
  try {
    await constactquerlist.create(req.body);
    res.status(201).json({
      success: true,
      message: 'data create sucessfullr',
    });
  } catch (err) {
    res.status(400).json({
      success: true,
      message: "your can n't create duplicate query",
    });
  }
};
exports.getContactQuery = async (req, res, next) => {
  try {
    const data = await constactquerlist.find().select('-__v -created');
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'data found',
      data: [],
    });
  }
};
exports.putContactquery = async (req, res, next) => {
  try {
    const data = await constactquerlist
      .findByIdAndUpdate({ _id: req.params.id }, req.body)
      .select('-__v -created');
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'data found',
      data: [],
    });
  }
};
exports.deleteContactus = async (req, res, next) => {
  await constactquerlist.findByIdAndDelete(
    { _id: req.params.id },
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
exports.SingleContact=async(req,res,next)=>{
  console.log(req.params.id)
  const data = await constactquerlist.findOne({_id:req.params.id});
  res.status(202).json({
    success:true,
    data:data
  })
}
exports.updateSingleStatus= async(req,res,next)=>{

  await constactquerlist.findByIdAndUpdate({_id:req.params.id},{
    email:req.body.email,
    query:req.body.query,
    status:req.body.status
  },(err,data)=>{
    if(err){

    }
    res.status(202).json({
      success: true
    })
  })
}