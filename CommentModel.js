const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    comment : {
        type:String,
        maxlength:[200,"not exceeded more than 200 character"],
        require:true
    },
    like:{
        type:Number,
        default:0,
        require:true
    },
    unlike:{
        type:Number,
        default:0,
        require:true
    }


})

module.exports = mongoose.model("comment",CommentSchema)