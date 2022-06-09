const express = require('express');
const router = express.Router();
const BookController= require("../controllers/bookController")
const bookController1 = require("../controllers/book_author")


router.post("/bookCreate", bookController1.bookCreate)

router.post("/authorCreate", bookController1.authorCreate)

router.get("/writtenByChetanBhagat", bookController1.writtenByChetanBhagat)

router.get("/authorOfBook", bookController1.authorOfBook)

router.get("/between", bookController1.between)

router.get("/getbooksByAuthorId", bookController1.getbooksByAuthorId)



// router.post("/createBook", BookController.createBook  )

// router.get("/getBooksData", BookController.getBooksData)

// router.get("/bookList", BookController.bookList)

// router.post("/getBooksInYear", BookController.getBooksInYear)

// router.get("/getParticularBooks", BookController.getParticularBooks)

// router.get("/getXINRBooks", BookController.getXINRBooks)

// router.get("/getRandomBooks", BookController.getRandomBooks)

module.exports = router;