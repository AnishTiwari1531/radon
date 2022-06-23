const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")
const commonMiddleware = require("../middleware/auth")


//---------------------------------------------------------------//


router.post("/authors", authorController.createAuthor)

router.post("/blogs", blogController.createBlog)

router.get("/blogs", blogController.getBlogs)

router.get("/filterblogs", blogController.filterBlogs)

router.put("/blogs/:blogId", commonMiddleware.authorise, blogController.blogs)

router.delete("/blogs/:blogId", commonMiddleware.authorise, blogController.deleting)

router.delete("/blogs", commonMiddleware.authorise, blogController.deleteSpecific)

router.post("/login", blogController.login)

module.exports = router;


//---------------------------------------------------------------//