const mongoose = require('mongoose');

const BooksSchema = new mongoose.Schema( {
        name: {type : String, required : true},
        author_id:  {type : String, required : true},
        price: Number,
        ratings:Number

}, { timestamps: true });


module.exports = mongoose.model('Book1', BooksSchema) 