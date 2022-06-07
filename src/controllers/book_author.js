const Book1 = require("../models/book");
const author = require("../models/author");

const bookCreate= async function (req, res) {
    let data= req.body
    let savedData= await Book1.create(data)
    res.send({msg: savedData})
}


const authorCreate= async function (req, res) {
    let data= req.body
    let savedData= await author.create(data)
    res.send({msg: savedData})
}


const writtenByChetanBhagat= async function (req, res){
    let data = await author.find({author_Name : "Chetan Bhagat"}).select("author_id")
    let bookData = await Book1.find({author_id:data[0].author_id})
    res.send({msg: bookData})
}

const authorOfBook = async function(req, res){
    let data = await Book1.findOneAndUpdate({name : "Two States"}, {$set:{prices:100}},{new:true})
    let authorData = await author.find({author_id:data.author_id}).select("author_name")
    let price = data.prices
    res.send({msg:authorData,price})
}

const between = async function(req, res){
    let btw = await Book1.find( { price : { $gte: 50, $lte: 100} } ).select({ author_id :1})
    console.log(btw)
    let allauthor = btw.map(async function(a){
    
    })
    res.send({msg: allauthor})
}


module.exports.bookCreate = bookCreate
module.exports.authorCreate = authorCreate
module.exports.writtenByChetanBhagat = writtenByChetanBhagat
module.exports.authorOfBook = authorOfBook
module.exports.between = between












// let name1 = await author.find({author_id : a.author_id}).select({author_Name : 1});
//         return name1;