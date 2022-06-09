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
    let data = await Book1.find( { price : { $gte: 50, $lte: 100} } ).select({ author_id :1})
    let btw=[]
    for (let i of data){
        let d= await author.find({author_id:i.author_id}).select({author_name:1,_id:0})
        btw.push(d)
    }
    res.send({msg: btw})
}


module.exports.bookCreate = bookCreate
module.exports.authorCreate = authorCreate
module.exports.writtenByChetanBhagat = writtenByChetanBhagat
module.exports.authorOfBook = authorOfBook
module.exports.between = between






