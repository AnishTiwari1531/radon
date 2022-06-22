const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")


//---------------------------------------------------------------//


router.post("/authors", authorController.createAuthor)

router.post("/blogs", blogController.createBlog)

router.get("/blogs",blogController.getBlogs)

router.get("/filterblogs",blogController.filterBlogs)

router.put("/blogs/:blogId", blogController.blogs)

router.delete("/blogs/:blogId", blogController.deleting)

router.delete("/blogs", blogController.deleteSpecific)

module.exports = router;


//---------------------------------------------------------------//