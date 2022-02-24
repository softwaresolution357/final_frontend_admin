const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    menu:[{
        title:{
            type:String,
        },
        link:{
            type:String,
        },
        page:{
            type:String,
        },
        type:{
            type:String
        },
        children:[{
            title:{
                type:String,
            },
            link:{
                type:String,
            },
            page:{
                type:String,
            },
            type:{
                type:String
            },
            expanded:{
                type:String
            },
            children:[{
                title:{
                    type:String
                },
                link:{
                    type:String,
                },
                type:{
                    type:String
                },
                page:{
                    type:String,
                },
                expanded:{
                    type:String
                }
            }]
        }],
        expanded:{
            type:String
        }
    }]
    
});

module.exports = mongoose.model('menu',menuSchema)