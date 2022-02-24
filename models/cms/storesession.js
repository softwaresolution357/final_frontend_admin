const mongoose = require('mongoose');
const sessionstore =new mongoose.Schema({
    totalsession:{
        type:Number,
    },
    ten:{
        type:Number,
    },
    twenty:{
        type:Number,
    },
    thirtey:{
        type:Number,
    },
    fourty:{
        type:Number,
    },
    fifty:{
        type:Number,
    },
    sixty:{
        type:Number,
    },
    checkoutpage:{
        type:Number
    },
    ordersuccesspage:{
      type:Number
    },
    homepage:{
        type:Number
      },
      productpage:{
        type:Number
      },
    cartpage:{
        type:Number
      },
      collectionpage:{
        type:Number
      },
      
    createdate:{
        type:Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('sessionstore', sessionstore);

