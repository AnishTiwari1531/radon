const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {

    bookName : {type : String, required : true},
    authorName : String,
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    year : {type : String, default : 2021,},
    tags : [String],
    totalPages : Number,
    stockAvailable : Boolean,
    sales: {type: Number, default: 10}
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) 