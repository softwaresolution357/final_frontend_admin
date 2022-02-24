const mongoose = require('mongoose')
const blog_review = new mongoose.Schema({
    review_blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:blog
    },
    reply_blog:{
        type:String,
    },
    like:{
        type:Number,
    },
    dislike:{
        type:Number
    },
    ratting:{
        type:Number,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:blog
    },
    reply_blog:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'brands',
          }]

})

module.exports= mongoose.model('blogreview',review_blog)