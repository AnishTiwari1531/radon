const { get } = require("mongoose")
const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")
// const moment = require("moment")


//---------------------------------------------------------------//

//Q-2

// POST /blogs
// Create a blog document from request body. Get authorId in request body only.

// Make sure the authorId is a valid authorId by checking the author exist in the authors collection.

// Return HTTP status 201 on a succesful blog creation. Also return the blog document. The response should be a JSON object like this

// Create atleast 5 blogs for each author

// Return HTTP status 400 for an invalid request with a response body like this


//...............................................................//

const createBlog = async function (req, res) {
    try {
        let data = req.body
        if (data.isPublished === true) data.publishedAt = Date.now()
        if (await authorModel.findById(data.authorId)) {
            let savedData = await blogModel.create(data)
            res.status(201).send({ msg: savedData })
        }
        else
            res.status(400).send({ msg: "authorId is not valid ⚠️" })
    }
    catch {
        res.status(500).send({ status: false, msg: "server Error ❌" });
    }
}


//---------------------------------------------------------------//

//Q-3

// GET /blogs
// Returns all blogs in the collection that aren't deleted and are published
// Return the HTTP status 200 if any documents are found. The response structure should be like this
// If no documents are found then return an HTTP status 404 with a response like this
// Filter blogs list by applying filters. Query param can have any combination of below filters.
// By author Id
// By category
// List of blogs that have a specific tag
// List of blogs that have a specific subcategory example of a query url: blogs?filtername=filtervalue&f2=fv2

//................................................................//

const getBlogs = async function (req, res) {
    try {
        let a = await blogModel.find({ isDeleted: false, isPublished: true })
        if (a.length > 0)
            res.status(200).send(a)
        else
            res.status(404).send({ status: false, msg: "Data Not Found ⚠️" })
    } catch {
        res.status(500).send({ status: false, msg: "server Error ❌" });
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
            return res.status(404).send({ status: false, msg: "No Data Found ⚠️" })
        }
        else
            return res.status(200).send(data)
    }
    catch {
        res.status(500).send({ status: false, msg: "server Error ❌" });
    }
}


//---------------------------------------------------------------//

//Q-4

// PUT /blogs/:blogId
// Updates a blog by changing the its title, body, adding tags, adding a subcategory. (Assuming tag and subcategory received in body is need to be added)
// Updates a blog by changing its publish status i.e. adds publishedAt date and set published to true
// Check if the blogId exists (must have isDeleted false). If it doesn't, return an HTTP status 404 with a response body like this
// Return an HTTP status 200 if updated successfully with a body like this
// Also make sure in the response you return the updated blog document.

//...............................................................//


const blogs = async function (req, res) {
    try {
        let data = req.body
        let blogId = req.params.blogId
        if (!blogId) return res.status(404).send({ status: false, msg: "blogId is required ⚠️" })
        let findblog = await blogModel.findById(blogId)
        if (!findblog) return res.status(404).send({ msg: "blogId  is invalid" })
        if (findblog.isDeleted == true) return res.status(404).send({ msg: "Blog is already deleted ⚠️" })
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
        res.status(500).send({ status: false, msg: "server Error ❌" });
    }
}


//---------------------------------------------------------------//

//Q-5

// DELETE /blogs/:blogId
// Check if the blogId exists( and is not deleted). If it does, mark it deleted and return an HTTP status 200 without any response body.
// If the blog document doesn't exist then return an HTTP status of 404 with a body like this

//...............................................................//

const deleting = async function (req, res) {
    try {
        let id = req.params.blogId
        let data = await blogModel.findById(id)
        if (data) {
            if (data.isDeleted == false) {
                data2 = await blogModel.findOneAndUpdate({ _id: id }, { isDeleted: true, deletedAt: new Date() }, { new: true })
                res.status(200).send({ status: true, msg: "data deleted ⚠️" })
            } else {
                res.status(200).send({ status: false, msg: "data already deleted ⚠️" })
            }
        } else {
            return res.status(404).send({ status: false, msg: "id does not exist ⚠️" })
        }

    }
    catch {
        res.status(500).send({ status: false, msg: "server Error ❌" });
    }
}


//---------------------------------------------------------------//

//Q-6
// DELETE /blogs?queryParams
// Delete blog documents by category, authorid, tag name, subcategory name, unpublished
// If the blog document doesn't exist then return an HTTP status of 404 with a body like this
//...............................................................//

const deleteSpecific = async function (req, res) {
    try {
        let query = req.query
        let filterdata = { isDeleted: false, isPublished: false }
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
            filterdata.isDeleted = true
            let updatedData = await blogModel.findOneAndUpdate({ authorId: authorId }, { isDeleted: true }, { new: true })
            return res.status(200).send({ status: true, msg: "data is deleted ⚠️" })
        }
        else {
            return res.status(404).send({ status: false, msg: "No Data Found ⚠️" })
        }
    }
    catch {
        res.status(500).send({ status: false, msg: "Server Error ❌" });
    }
}


//---------------------------------------------------------------//

module.exports = { createBlog, getBlogs, filterBlogs, blogs, deleting, deleteSpecific }

//---------------------------------------------------------------//
