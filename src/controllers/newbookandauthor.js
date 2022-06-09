const newBook = require("../models/newbook")
const newAuthor = require("../models/newauthor")
const newpublisher = require("../models/newpublisher")


const createAuthor1= async function (req, res) {
    let data = req.body
    let authorCreated = await newAuthor.create(data)
    res.send({data: authorCreated})
}

const createPublisher= async function (req, res) {
    let data = req.body
    let publisher = await newpublisher.create(data)
    res.send({data: publisher})
}

const createNewBook = async function (req, res) {
    let data = req.body
    if(!data.author){res.send("author detail is required")}
    let author = await newAuthor.findById(data.author)
    if(!author){res.send("author detail is not valid")}

    if(!data.publisher){res.send("publisher deatil is required")}
    let publisher = await newpublisher.findById(data.publisher)
    if(!publisher){res.send("publisher detail is not valid")}

    let bookCreated = await newBook.create(data)
    res.send(bookCreated)
}

const populateBook = async function (req, res) {
    let specificBook = await newBook.find().populate("author")
    res.send({data : specificBook})
}

const updateIsHardCover =async function (req,res){
    let data= await newpublisher.find({name:{$in:["Saraswati House","S Singh"]}}).select({_id:1})
    idArr=data.map((obj)=>{return obj._id.toString()})
    let update =await newBook.updateMany({publisher_id:{$in:idArr}},{$set:{isHardCover:true}})
    let upBook=await newBook.find()
    res.send({data:update,upBook})
}

const authorRating=async function(req,res){
    let data =await newAuthor.find({rating:{$gt:3.5}}).select({_id:1})
    idArr=data.map((obj)=>{return obj._id.toString()})
    let update =await newBook.updateMany({author_id:{$in:idArr}},{$inc:{price:+10}})
    res.send({data:update})
}



module.exports.createAuthor1 = createAuthor1
module.exports.createPublisher = createPublisher
module.exports.createNewBook = createNewBook
module.exports.populateBook = populateBook
module.exports.updateIsHardCover = updateIsHardCover
module.exports.authorRating = authorRating