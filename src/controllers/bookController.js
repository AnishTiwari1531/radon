const BookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body
    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const bookList= async function (req, res){
    let allBookList= await BookModel.find().select({bookName:1,authorName:1,_id:0}) 
    res.send({msg: allBookList})
}

const getBooksInYear=async function(req,res){
    let year = req.query.year
    let allBooks=await BookModel.find({"year":year})
    res.send({msg: allBooks})
}

const 
s= async function (req, res){
    let condition = req.body
    let allParticularBooks= await BookModel.find(condition)
    // let allParticularBooks= await BookModel.find({ $or: [ { bookName:  /^IN/i  }, {authorName : "AKT" } , { year: 2018 }]})
    res.send({msg: allParticularBooks})
}

const getXINRBooks= async function (req, res){
    let allXINRBooks =await BookModel.find({$or:[{"prices.indianPrice":{$eq:"100INR"}},
    {"prices.indianPrice":{$eq:"200INR"}},
    {"prices.indianPrice":{$eq:"500INR"}}]})
    res.send({msg: allXINRBooks})
}

const getRandomBooks= async function (req, res){
    let allRandomBooks= await BookModel.find({stockAvailable:true, totalPages:{$gt:500}})   
    res.send({msg: allRandomBooks})
}

const getBooksData= async function (req, res) {
    res.send({msg: allBooks})
}



module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksInYear = getBooksInYear
module.exports.bookList = bookList
module.exports.getParticularBooks = getParticularBooks
module.exports.getXINRBooks = getXINRBooks
module.exports.getRandomBooks = getRandomBooks