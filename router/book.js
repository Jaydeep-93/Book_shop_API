const express = require("express");

const bookController = require("../controller/book");

const router = express.Router();

router.get("/", bookController.getAllBooks);

router.get("/:bookdId", bookController.getBookByID);

router.post("/", bookController.addBook);

router.put("/:bookdId", bookController.updateBook);

router.delete("/:bookId", bookController.deleteBook);

module.exports = router;
