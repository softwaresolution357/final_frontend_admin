const blogreview = require('../../models/cms/blogreview')
exports.blogreview = async(req,res,next)=>{
   const blogdata = await blogreview.find();
   
   res.status(200).json({
       success:true,
       data:blogdata
   })
}
exports.getSingleBlogReview = async(req,res,next)=>{
  
    const blogdata = await blogreview.findById(req.params.id).populate({path:'blogreviews',model:"reviewsction",select:'name reviewemail reviewmobile reviewrating reviewdate '});
   console.log(blogdata)
    res.status(200).json({
        success:true,
        data:blogdata,
    })
}

exports.deleteReview = async(req,res,next)=>{
    
    const reviewcount = await blogreview.countDocuments({blogreviews:{$in:[req.params.id]}})
        
    if(reviewcount == 0){
        await blogreview.deleteOne({_id:req.params.id},(err,data)=>{
            if(err){
                res.status(400).json({
                    success:false,
                })
            }else{
                res.status(200).json({
                    success:true,
                    message:"Data deleted Successfully"
                })
            }
        })
    }else{
        res.status(400).json({
            success:false,
            message:"You can't deleted Successfully,Because Depending upon other review data"
        })
    }

}
