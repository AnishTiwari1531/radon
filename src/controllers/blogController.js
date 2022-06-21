const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")

const createBlog = async function (req, res) {
    let data= req.body
    if (!data.authorId) res.send ({mgs : "AuthorId is not present"})
    let authorData=await authorModel.find({author_Id:data.author_Id})
    if (authorData.length !== 0) res.send ({msg : "authorID is not valid"})
    let savedData= await blogModel.create(data)
    res.send({msg: savedData})
}

module.exports.createBlog = createBlog
