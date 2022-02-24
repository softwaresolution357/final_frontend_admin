const blogmenu = require('../../models/cms/blogmenu')
const blog = require('../../models/cms/blog')
const category = require('../../models/catlog/category')
exports.getblogmenu = async (req,res,next)=>{
    try{
        console.log('hello')
        const categorydrop =[];
        const blogdata = await  blogmenu.find();
        const category_data = await category.find({status:true})
        for(const {_id:id,name:name} of category_data ){
          const data={
            label:name,
            value:id,
          }
          categorydrop.push(data)
        }
        res.status(200).json({
            success:true,
            data:blogdata,
            categorydrop:categorydrop,
        })
    }catch(err){
        console.log(err)
        res.status(400).json({
            success:true,
            data:[]
        })
    }
}
exports.postblogmenu = async(req,res,next)=>{
    const blog_count = await  blogmenu.countDocuments({name :  req.body.name ,slug:req.body.slug});
    if(blog_count == 0){
        try{
            const blogdata = await  blogmenu.create(req.body);
            res.status(200).json({
                success:true,
                data:blogdata
            })
        }catch(err){
    
        }
    }else{
        res.status(400).json({
            success:false,

        })

    }
    
}

exports.deleteblogmenu = async (req,res,next)=>{
    const blogmenu_cout = await blog.countDocuments({bloglink:{$in :req.params.id}})
  if(blogmenu_cout == 0){
    await blogmenu.findByIdAndDelete({_id:req.params.id},(err,data)=>{
        if(err){
            res.status(400).json({
                success:false
            })
        }else{
            res.status(200).json({
                success:true
            })
        }
    })
  }else{
      res.status(400).json({
          success:false
      })
  }
    
}
 exports.getSingleBlog = async (req,res,next)=>{
     
  const find_single = await blogmenu.findOne({slug:req.params.slug});
  
  res.status(200).json({
      success:true,
      data:find_single
  })
 }
 exports.putSingleblogmenu = async(req,res,next)=>{

     await blogmenu.findByIdAndUpdate({_id:req.params.id},req.body,(err,data)=>{
         if(err){
        

         }else{
             res.status(200).json({
                 success:true
             })
         }
     })
 }