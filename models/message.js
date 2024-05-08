const { Schema, model } = require("mongoose");

const MessageSchema = Schema({
    from:{
        type: Schema.Types.ObjectId,
        ref:'user',
        require: true
    },
    to:{
        type: Schema.Types.ObjectId,
        ref:'user',
        require: true
    },
    message:{
        type: String,
        require: true
    },

 
},{
        timestamp:true,
})