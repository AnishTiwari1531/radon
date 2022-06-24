const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")
const commonMiddleware = require("../middleware/auth")


//---------------------------------------------------------------//


router.post("/authors", authorController.createAuthor)

router.post("/blogs",commonMiddleware.authorise, blogController.createBlog)

router.get("/blogs", commonMiddleware.authorise, blogController.blogs)

router.put("/blogs/:blogId", commonMiddleware.blogChecker , commonMiddleware.authorise, blogController.update)

router.delete("/blogs/:blogId", commonMiddleware.blogChecker, commonMiddleware.authorise, blogController.deleting)

router.delete("/blogs", commonMiddleware.authorise, blogController.deleteSpecific)

router.post("/login", authorController.login)

module.exports = router;


//---------------------------------------------------------------//