const mongoose = require("mongoose");

const InstaSchema = mongoose.Schema({
    file:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true   
    },
    description:{
        type:String,
        require:true   
    },
    date:{
        type:String,
        default:(new Date().toLocaleDateString())
    }
})

const Posts = new mongoose.model("Post" , InstaSchema)
module.exports = Posts;