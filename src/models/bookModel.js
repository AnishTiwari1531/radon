const mongoose = require('mongoose');

const bookSchema =new mongoose.Schema({
    bookName:String,
    authorName:String,
    category:String,enum:["horror","thriller","Romantic","adventure"],
    year:Number,
},{timestamp:true});

module.exports=mongoose.model("Book",bookSchema)