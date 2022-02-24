const category = require('../../models/catlog/category')
const blog = require('../../models/cms/blog');
const blogmenu = require('../../models/cms/blogmenu')
const { uploadFile, deletedFile } = require('../../component/fileUpload');

exports.postBlog = async (req, res, next) => {
  try {
    const { blogname, createdby, categorylink,shortdescription, description,bloglink,blogimage,status,blogdate,metatitle,metakeyword,metadescription,slug,blogstatus } = req.body;
    
    const data = {};
    data.blogname = blogname;
    data.createdby = createdby;
    data.shortdescription = shortdescription;
    data.description = description;
    data.blogimage = JSON.parse(blogimage);
    data.bloglink = JSON.parse(bloglink)
    data.categorylink=JSON.parse(categorylink)
    data.blogdate =blogdate;
    data.slug = slug;
    data.metatitle = metatitle;
    data.metakeyword = metakeyword;
    data.metadescription = metadescription;
    data.blogstatus = blogstatus;
    const fainal_data = await blog.create(data);
    res.status(201).json({
      success: true,
      data: fainal_data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "data doesn't create",
    });
  }
};
exports.getBlog = async (req, res, next) => {
  try {
    const blog_data = await blog.find();
    res.status(200).json({
      success: true,
      data: blog_data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'no data found',
    });
  }
};
exports.getSingleBlog = async (req, res, next) => {
  try {
    const blogdrop = [];
    const categorydrop =[]
    const blog_data = await blog.findById({ _id: req.params.id }).populate({path:'blogreviews', model:'reviewsction',match:{reviewstatus:true},select:'name reviewemail reviewmobile reviewrating reviewdate'})
    
    const blog_menu = await blogmenu.find({status:true}); 
    const category_data = await category.find({status:true})
    for(const {_id:id,name:name} of blog_menu ){
      const data={
        label:name,
        value:id,
      }
      blogdrop.push(data)
    }
    for(const {_id:id,name:name} of category_data ){
      const data={
        label:name,
        value:id,
      }
      categorydrop.push(data)
    }
    res.status(200).json({
      success: true,
      data: blog_data,
      blogdrop:blogdrop,
      categorydrop:categorydrop
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'no data found',
    });
  }
};
exports.deleteSingleData = async (req, res, next) => {
  try {
    console.log(req.query.deletedimage.split(','));
    for (let i = 0; i < req.query.deletedimage.split(',').length; i++) {
      await deletedFile(req, res, req.query.deletedimage.split(',')[i], 'blog');
    }
    await blog.findByIdAndDelete({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: 'file delete successfully',
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'err',
    });
  }
};
exports.putSingleBlog = async(req,res,next)=>{
   
  const { blogname,categorylink, createdby, shortdescription, description,bloglink,blogimage,blogstatus,blogdate,slug,metatitle,metakeyword,metadescription } = req.body;
 
  const data = {};
  data.blogname = blogname;
  data.createdby = createdby;
  data.shortdescription = shortdescription;
  data.description = description;
  data.blogimage = JSON.parse(blogimage);
  data.bloglink = JSON.parse(bloglink)
   data.blogstatus = blogstatus;
   data.blogdate =blogdate;
   data.slug = slug;
     data.metatitle = metatitle;
    data.metakeyword = metakeyword;
     data.metadescription = metadescription;
     data.categorylink = JSON.parse(categorylink)
   await blog.findByIdAndUpdate({ _id: req.params.id },data,(err,data)=>{
    if(err){
      console.log(err)
      res.status(400).json({
        success:false
      })
    }else{
      res.status(200).json({
        success:true
      })
    }
  });
}