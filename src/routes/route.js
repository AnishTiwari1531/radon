const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")

const bookAuthorPublisher = require("../controllers/newbookandauthor")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )

router.get("/getAuthorsData", authorController.getAuthorsData)

router.post("/createBook", bookController.createBook  )

router.get("/getBooksData", bookController.getBooksData)

router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)


router.post("/createNewBook", bookAuthorPublisher.createNewBook)
router.post("/createAuthor1", bookAuthorPublisher.createAuthor1)
router.post("/createPublisher", bookAuthorPublisher.createPublisher)
router.get("/populateBook", bookAuthorPublisher.populateBook)
router.put("/updateIsHardCover",bookAuthorPublisher.updateIsHardCover)
router.put("/authorRating",bookAuthorPublisher.authorRating) 
module.exports = router;