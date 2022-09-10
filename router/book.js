const express = require("express");

const bookController = require("../controller/book");

const router = express.Router();

router.get("/", bookController.getAllBooks);

router.get("/:bookId", bookController.getBookByID);

router.post("/", bookController.addBook);

router.put("/:bookId", bookController.updateBook);

router.delete("/deleteAll", bookController.deleteAll); 

router.delete("/:bookId", bookController.deleteBook);

module.exports = router;
