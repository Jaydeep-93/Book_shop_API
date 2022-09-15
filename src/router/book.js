const express = require("express");

const bookController = require("../controller/book");
const authenticator = require("../utils/authenticate-user");

const router = express.Router();

router.get("/", bookController.getAllBooks);

router.get("/:bookId", bookController.getBookByID);

router.post("/", authenticator.authenticateUser, bookController.addBook);

router.put("/:bookId", bookController.updateBook);

router.delete(
  "/deleteAll",
  authenticator.authenticateUser,
  bookController.deleteAll
);

router.delete(
  "/:bookId",
  authenticator.authenticateUser,
  bookController.deleteBook
);

module.exports = router;
