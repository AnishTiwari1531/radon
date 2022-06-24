const jwt = require("jsonwebtoken");
let blogModel = require('../models/blogModel');

//...........................................................//
const blogChecker = async function (req, res, next) {
    try {
        // if(!req.params.blogId) 
        // return res.status(404).send({ status: false, msg: "Please provide BlogId" })
        let id =  await blogModel.findById(req.params.blogId)
        if(!id){
                return res.status(404).send({ status: false, msg: "Please provide the valid BlogId" })
        } 
        else {
            next()
        }
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}

//..............................................................//

const authorise = async function (req, res, next) {
    try {
        let token = req.headers['x-api-key']
        let decodedToken
        if (!token) {
            return res.status(401).send({ status: false, msg: "Please provide authentication token" })
        }
        else {
            decodedToken = jwt.verify(token, "functionup-Project-1")
        }
        const id = req.params.blogId
        const data = await blogModel.findById(id)
        let authorId
        if (data) authorId = data.authorId.toString()
        if (!req.query.authorId && !data)
            return res.status(404).send({ status: false, msg: "Please provide the authorId" })
        else if (decodedToken.authorId === req.query.authorId || authorId) {
            next()
        }
        else
            res.status(404).send({ status: false, msg: "Please provide valid authorId" })
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}

//...........................................................//

module.exports = { blogChecker, authorise }



