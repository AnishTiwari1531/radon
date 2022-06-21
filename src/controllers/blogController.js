const { get } = require("mongoose")
const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")

const createBlog = async function (req, res) {
    let data = req.body
    if(data.isPublished===true)data.publishedAt=Date.now()
    if(data.isDeleted===true)data.deletedAt=Date.now()
    if (await authorModel.findById(data.authorId)) {
        let savedData = await blogModel.create(data)
        res.status(201).send({ msg: savedData })
    }
    else
        res.status(400).send({ msg: "authorId is not valid" })
}

const getBlogs=async function (req,res){
    let a= await blogModel.find({isDeleted:false,isPublished:true})
    if(a.length>0)
    res.status(200).send(a)
    else
    res.status(404).send({status:false,msg:"Data Not Found"})
 }


 const filterBlogs=async function(req,res){
    let id=req.query.authorId
    let category=req.query.category
   let tags=req.query.tags
    //console.log(q)
   let data= await blogModel.find({authorId:id,category:category,tags:tags})
   if(data.length===0){
    res.status(404).send({status:false,msg:"No Data Found"})
   }
   else
    res.status(200).send(data)
}

module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs
module.exports.filterBlogs = filterBlogs
