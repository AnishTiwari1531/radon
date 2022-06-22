const { get } = require("mongoose")
const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")
// const moment = require("moment")


//---------------------------------------------------------------//

const createBlog = async function (req, res) {
    try {
        let data = req.body
        if (data.isPublished === true) data.publishedAt = Date.now()
        if (await authorModel.findById(data.authorId)) {
            let savedData = await blogModel.create(data)
            res.status(201).send({ msg: savedData })
        }
        else
            res.status(400).send({ msg: "authorId is not valid" })
    }
    catch {
        res.status(500).send({ status: false, msg: "server Error" });
    }
}


//---------------------------------------------------------------//

const getBlogs = async function (req, res) {
    try {
        let a = await blogModel.find({ isDeleted: false, isPublished: true })
        if (a.length > 0)
            res.status(200).send(a)
        else
            res.status(404).send({ status: false, msg: "Data Not Found" })
    } catch {
        res.status(500).send({ status: false, msg: "server Error" });
    }
}


//---------------------------------------------------------------//

const filterBlogs = async function (req, res) {
    try {
        let query = req.query
        let filterdata = { isDeleted: false }
        let { category, subcategory, tags, authorId } = query
        if (category) {
            filterdata.category = category
        }
        if (subcategory) {
            filterdata.subcategory = subcategory
        }
        if (authorId) {
            filterdata.authorId = authorId
        }
        if (tags) {
            filterdata.tags = tags
        }
        console.log(filterdata)

        let data = await blogModel.find(filterdata)
        if (data.length === 0) {
            return res.status(404).send({ status: false, msg: "No Data Found" })
        }
        else
            return res.status(200).send(data)
    }
    catch {
        res.status(500).send({ status: false, msg: "server Error" });
    }
}


//---------------------------------------------------------------//

const blogs = async function (req, res) {
    try {
        let data = req.body
        let blogId = req.params.blogId
        if (!blogId) return res.status(404).send({ status: false, msg: "blogId is required" })
        let findblog = await blogModel.findById(blogId)
        if (!findblog) return res.status(404).send({ msg: "blogId  is invalid" })
        if (findblog.isDeleted == true) return res.status(404).send({ msg: "Blog is already deleted " })
        if (findblog.isDeleted == false) {
            let updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, {
                $set: {
                    title: data.title,
                    body: data.body,
                    category: data.category,
                    // publishedAt: moment().format(),  // new Date()
                    publishedAt: Date.now(),
                    isPublished: true
                },
                $push: {
                    tags: req.body.tags,
                    subcategory: req.body.subcategory
                }
            }, { new: true, upsert: true })
            return res.status(200).send(updatedBlog)
        }
    } catch {
        res.status(500).send({ status: false, msg: "server Error" });
    }
}


//---------------------------------------------------------------//

const deleting = async function (req, res) {
    try {
        let id = req.params.blogId
        let data = await blogModel.findById(id)
        if (data) {
            if (data.isDeleted == false) {
                data2 = await blogModel.findOneAndUpdate({ _id: id }, { isDeleted: true, deletedAt: new Date() }, { new: true })
                res.status(200).send({ status: true, msg: "data deleted" })
            } else {
                res.status(200).send({ status: false, msg: "data already deleted" })
            }
        } else {
            return res.status(404).send({ status: false, msg: "id does not exist" })
        }

    }
    catch {
        res.status(500).send({ status: false, msg: "server Error" });
    }
}


//---------------------------------------------------------------//

const deleteSpecific = async function (req, res) {
    try {
        let query = req.query
        let filterdata = { isDeleted: false, isPublished : false }
        let { category, subcategory, tags, authorId } = query
        if (authorId) {
            filterdata.authorId = authorId
        }
        if (category) {
            filterdata.category = category
        }
        if (subcategory) {
            filterdata.subcategory = subcategory
        }
        if (tags) {
            filterdata.tags = tags
        }
      
        let data = await blogModel.find(filterdata)

        if (data.length !== 0) {
            filterdata.isDeleted=true
            let updatedData = await blogModel.findOneAndUpdate({$or : {authorId:authorId}},{isDeleted:true},{new:true})
            return res.status(200).send({ status: true, msg: "data is deleted" })
        }
        else {
            return res.status(404).send({ status: false, msg: "No Data Found" })
        }
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}


//---------------------------------------------------------------//

module.exports = { createBlog, getBlogs, filterBlogs, blogs, deleting, deleteSpecific }


//---------------------------------------------------------------//
