const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")

const createBlog = async function (req, res) {
    let data = req.body
    if (await authorModel.findById(data.authorId)) {
        let savedData = await blogModel.create(data)
        res.status(201).send({ msg: savedData })
    }
    else
        res.status(400).send({ msg: "authorId is not valid" })
}


module.exports.createBlog = createBlog
