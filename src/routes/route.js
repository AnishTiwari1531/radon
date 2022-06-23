const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")
const commonMiddleware = require("../middleware/auth")


//---------------------------------------------------------------//


router.post("/authors", authorController.createAuthor)

router.post("/blogs", commonMiddleware.authenticate, commonMiddleware.authorise, blogController.createBlog)

router.get("/blogs", commonMiddleware.authenticate, blogController.getBlogs)

router.get("/filterblogs", commonMiddleware.authenticate, commonMiddleware.authorise, blogController.filterBlogs)

router.put("/blogs/:blogId", commonMiddleware.authenticate, commonMiddleware.authorise, blogController.blogs)

router.delete("/blogs/:blogId", commonMiddleware.authenticate, commonMiddleware.authorise, blogController.deleting)

router.delete("/blogs", commonMiddleware.authenticate, commonMiddleware.authorise, blogController.deleteSpecific)

router.post("/login", blogController.login)

module.exports = router;


//---------------------------------------------------------------//