const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")


router.post("/authors", authorController.createAuthor)

router.post("/blogs", blogController.createBlog)

router.get("/blogs",blogController.getBlogs)

router.get("/filterblogs",blogController.filterBlogs)

router.put("/blogs/:blogId", blogController.blogs)

router.delete("/delete/:blogId", blogController.deleting)

router.delete("/deleteSpecific/:blogId", blogController.deleteSpecific)

module.exports = router;