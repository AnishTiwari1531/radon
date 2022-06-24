const { get } = require("mongoose")
const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")


//---------------------------------------------------------------//

//..2.. POST /blogs API

//...............................................................//

const createBlog = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length === 0)
        return res.status(400).send({ Status: false, message: "Please provide the data ⚠️" })
        if (data.isPublished === true) data.publishedAt = Date.now()
        if (await authorModel.findById(data.authorId)) {
            let savedData = await blogModel.create(data)
            res.status(201).send({ msg: savedData })
        }
        else
            res.status(400).send({ msg: "authorId is not valid ⚠️" })
    }
    catch (error) {
        res.status(500).send({ status : false , error: error.message })
      }
}


//---------------------------------------------------------------//

//....3....GET /blogs APi

//---------------------------------------------------------------//

const blogs = async function (req, res) {
    try {
      let blogFound = await blogModel.find(req.query)//.populate("authorId", { title: 1, fname: 1, lname: 1 });
      console.log(req.query)
      let len = blogFound.length;
      let arr = [];
      for (let i = 0; i < len; i++) {
        if (blogFound[i].isDeleted == false && blogFound[i].isPublished == true) {
          arr.push(blogFound[i]);
        } else {
          continue;
        }
      }
      if (arr.length > 0) {
        res.status(200).send({ status: true, data: arr });
      } else {
        res.status(404).send({status: false, message: "No such blog is found ⚠️" });
      }
    }  catch (error) {
        res.status(500).send({ status : false , error: error.message })
      }
    }
//.................................................................///

//..4...PUT /blogs/:blogId...API
//...........................................................//


const update = async function (req, res) {
    try {
        let data = req.body
        let blogId = req.params.blogId
        if (!blogId) return res.status(400).send({ status: false, msg: "blogId is required ⚠️" })
        let findblog = await blogModel.findById(blogId)
        if (!findblog) return res.status(404).send({ msg: "blogId  is invalid ⚠️" })
        if (findblog.isDeleted == true) return res.status(404).send({ msg: "Blog is already deleted ⚠️" })
        if (findblog.isDeleted == false) {
            let updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, {
                $set: {
                    title: data.title,
                    body: data.body,
                    category: data.category,
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
    }  catch (error) {
        res.status(500).send({ status : false , error: error.message })
      }
}


//---------------------------------------------------------------//

//....5......DELETE /blogs/:blogId API..........................//
//...............................................................//

const deleting = async function (req, res) {
    try {
        let id = req.params.blogId
        // if(!id)  
        // return res.status(404).send({ status: false, msg: "Please provide the valid BlogId" }) 
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
    catch (error) {
        res.status(500).send({ status : false , error: error.message })
      }
}


//---------------------------------------------------------------//

//.....6..........DELETE /blogs?queryParams....API............//

//...............................................................//

const deleteSpecific = async function (req, res) {
    try {
        let filterdata = { isDeleted: false}
        let { category, subcategory, tags, authorId } = req.query
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
            
            let updatedData = await blogModel.updateMany(filterdata, { isDeleted: true }, { new: true })
            return res.status(200).send({ status: true, msg: "data is deleted ⚠️" })
        }
        else {
            return res.status(404).send({ status: false, msg: "No Data Found ⚠️" })
        }
    }
    catch (error) {
        res.status(500).send({ status : false , error: error.message })
      }
}

//...............................................................//

module.exports = { createBlog, blogs, update, deleting, deleteSpecific }

//---------------------------------------------------------------//
