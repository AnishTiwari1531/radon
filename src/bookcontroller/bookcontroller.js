const books = require("../book/books")

const createBook= async function (req, res) {
    let data= req.body
    let savedData= await books.create(data)
    res.send({msg: savedData})
}

const getBookList= async function (req, res) {
    let allList= await books.find()
    res.send({msg: allList})
}

module.exports.createBook= createBook
module.exports.getBookList= getBookList