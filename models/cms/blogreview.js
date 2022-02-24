const mongoose =  require('mongoose');

const reviewSction = new mongoose.Schema({
  name:{
      type:String
    },
  reviewemail:{
    type:String
  },
  reviewmobile:{
    type:String
  },
  reviewlike:{
      type:String
  },
  reviewdislike:{
      type:String
  },
  reviewrating:{
    type:Number,
  },
  reviewdate:{
    type:String,
  },
  reviewmessage:{
    type:String
  },
  blogreviews: [
    {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'reviewsction',
    },
],
reviewstatus:{
  type:Boolean,
  enum:[true,false],
  default:true,
  },
creted: {
  type: Date,
        default: Date.now(),
      },
})

module.exports= mongoose.model('reviewsction',reviewSction)