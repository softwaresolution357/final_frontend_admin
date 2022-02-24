const category = require('../../models/catlog/category');
const brands = require('../../models/catlog/brand');
const page = require('../../models/cms/information');
const menu = require('../../models/cms/menu')
exports.getDropDown = async(req,res,next)=>{
    let common_data = ''
  if(req.query.query == 'category'){
    common_data = await category.find({status:true});
  }else if(req.query.query == 'brand'){
    common_data = await brands.find({status:true});
  }else if(req.query.query == 'page'){
    common_data = await page.find({status:true});
  }
  
  res.status(200).json({
      success:true,
      data:common_data
  })
}

exports.postDropDown = async(req,res,next)=>{
    
   
    const {title,link,type,children} = req.body;

  const menu_count = await menu.countDocuments();
  if(menu_count == 0){
        
   const data ={};   
    let create_menu_data =[];
    create_menu_data.push({
        title:title,
        link:link,
        type:type,
        children:JSON.parse(children)
    })
    data.menu=create_menu_data;
    await menu.create(data);
    res.status(200).json({
      success:true
    })
  }else{
    const menu_find = await menu.findOne();

    let post_menu_data =[];
    post_menu_data.push({
        title:title,
        link:link,
        type:type,
        children:JSON.parse(children)
    })

    await menu.findByIdAndUpdate({_id:menu_find._id},{$push:{menu:post_menu_data}},{ upsert: true, new: true })

    res.status(200).json({
        success:true
      })
}
}

exports.allmegamenu = async(req,res,next)=>{
    const category_data = await category.find({status:true});
    const  brand_data = await brands.find({status:true});
    const  page_data = await page.find({status:true});
    
    const  mega_menu = await menu.findOne();

    if(mega_menu == null){
        res.status(400).json({
            success:false,
            data:[],
            id:''
        })
    }else{
        res.status(200).json({
        success:true,
        data:mega_menu.menu,
        id:mega_menu._id,
        category:category_data,
        brand:brand_data,
        page:page_data
    })
    }
    
}

exports.putMegamenuUpdate = async(req,res,next)=>{
    const update_date={}
    update_date.menu= req.body;

    await menu.findByIdAndUpdate({_id:req.params.id},update_date,(err,data)=>{
        if(err){
            res.status(400).json({
                success:false,
            })
        }else{
            res.status(200).json({
                success:true,
            })
        }
    })
    
}
exports.singleMenuMegamenuUpdate = async(req,res,next)=>{

    const data ={}
    const {title,link,type,children} = req.body;
    const siglemegamenu = await menu.findOne();

    for(let i =0; i < siglemegamenu.menu.length;i++){
        if(siglemegamenu.menu[i]._id == req.params.id){
            siglemegamenu.menu[i].title= title
            siglemegamenu.menu[i].type= type;
            siglemegamenu.menu[i].link= link;
        }
        if(siglemegamenu.menu[i].children.length != 0){
            for(let j =0 ; j < siglemegamenu.menu[i].children.length ;j++){
               if(siglemegamenu.menu[i].children[j]._id == req.params.id){
                siglemegamenu.menu[i].children[j].title= title;
                siglemegamenu.menu[i].children[j].type= type;
                siglemegamenu.menu[i].children[j].link= link; 
               }
               if(siglemegamenu.menu[i].children[j].children.length != 0){
                for(let k=0; k < siglemegamenu.menu[i].children[j].children.length ;k++){
                    if(siglemegamenu.menu[i].children[j].children[k]._id == req.params.id){
                        siglemegamenu.menu[i].children[j].children[k].title= title;
                        siglemegamenu.menu[i].children[j].children[k].type= type;
                        siglemegamenu.menu[i].children[j].children[k].link= link; 
                       }   
                   }    
               }
               
            }
        }
    }
    
    data.menu = siglemegamenu.menu;
  

    await menu.findByIdAndUpdate({_id:siglemegamenu._id},data)
    res.status(200).json(
        {
            success:true
        }
    )
}
