const integration = require('../../models/system/integration');
exports.postIntegration = async (req, res, next) => {
  const count = await integration.countDocuments();
  if (count === 0) {
    try {
      const data = await integration.create(req.body);
      if (!data) {
        res.status(400).json({
          success: false,
          message: "data n't created",
        });
      }
      res.status(200).json({
        success: true,
      });
    } catch (e) {
      res.status(400).json({
        success: false,
        message: "data n't created",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "you can't create more than one document",
    });
  }
};
exports.getIntegration = async (req, res, next) => {
  const count = await integration.countDocuments();
  if (count != 0) {
    const finaldata = {};
    const data = await integration.findOne();
    finaldata.id = data.id;
    finaldata.facebook = data.facebook;
    finaldata.google = data.google;
    finaldata.googleconversion = data.googleconversion;
    finaldata.external = data.external;

    res.status(200).json({
      success: true,
      data: finaldata,
    });
  } else {
    res.status(400).json({
      success: false,
      data: {},
    });
  }
};
exports.putIntegration=async(req,res,next)=>{
  const{id,facebook,google,googleconversion,external} = req.body;
  await integration.findByIdAndUpdate({
    _id:id  
  },{facebook:facebook,google:google,googleconversion:googleconversion,external},(err,data)=>{
    if(err){
      res.status(400).json({
        success:false
      })
    }
    res.status(200).json({
      success:true
    })
  })
}