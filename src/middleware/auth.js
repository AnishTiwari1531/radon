const jwt = require("jsonwebtoken");
let blogModel = require('../models/blogModel');
let authorModel = require("../models/authorModel");

//...........................................................//

// const authenticate = function (req, res, next) {
//     try {
//         let token = req.headers['x-api-key']
//         if (!token) {
//             return res.status(401).send({ status: false, msg: "no authentication token" })
//         } else {
//             let decodedToken = jwt.verify(token, "functionup-Project-1")
//             if (decodedToken) {
//                 req.decodedToken = decodedToken
//                 next()

//             } else {
//                 res.status(401).send({ status: false, msg: "not a valid token" })
//             }
//         }

//     } catch {
//         res.status(500).send({ status: false, msg: "server Error ❌" });
//     }
// }

// const authorise = async function (req, res, next) {
//     try {
//         const id = req.params.blogId
//         const data = await blogModel.findById(id)
//         const authorId = data.authorId.toString()
//         const token = req.headers['x-api-key']
//         var decoded = jwt.verify(token, "functionup-Project-1");
//         if (decoded.authorId == authorId)
//             next()
//         else
//             res.status(404).send({ status: false, msg: "it is not an valid id" })
//     }
//     catch {
//         res.status(500).send({ status: false, msg: "server Error ❌" });
//     }
// }


// const authorise = async function (req, res, next) {
//     try {
//         const id = req.params.blogId
//         const data = await blogModel.findById(id)
//         let authorId
//         if(data) authorId = data.authorId.toString()
//         const token = req.headers['x-api-key']
//         var decoded = jwt.verify(token, "functionup-Project-1");
//         console.log(req.query.authorId, !data)
//         if(!req.query.authorId && !data) return res.status(404).send({status : false , msg : "Please provide the authorId"}) 
//         else if (decoded.authorId == authorId || req.query.authorId)
//             next()
//         else
//             res.status(404).send({ status: false, msg: "it is not an valid id" })
//     }
//     catch {
//         res.status(500).send({ status: false, msg: "server Error " });
//     }
// }




const authorise = async function (req, res, next) {
    try {
        let token = req.headers['x-api-key']
        let decodedToken
        if (!token) {
            return res.status(401).send({ status: false, msg: "no authentication token" })
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
        else if (decodedToken.authorId ===req.query.authorId || authorId) {
            next()
        }
        else
            res.status(404).send({ status: false, msg: "it is not an valid id" })
    }
    catch {
        res.status(500).send({ status: false, msg: "server Error " });
    }
}



module.exports = { authorise }



