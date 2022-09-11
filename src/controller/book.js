const mongoose = require("mongoose");
const Book = require("../model/book");

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      message: "Books fetched successFully :)",
      noOfBooks: books.length,
      books,
    });
  } catch (error) {
    next(error);
  }
};

exports.getBookByID = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book)
      res.status(404).json({
        message: "Requested book not found :(",
        bookdId: req.params.bookdId,
      });
    else
      res.status(200).json({
        message: "Requested book found :)",
        book,
      });
  } catch (error) {
    next(error);
  }
};

exports.addBook = async (req, res, next) => {
  try {
    const { name, category, price } = req.body;
    const result = await Book.create({
      _id: new mongoose.Types.ObjectId(),
      name,
      category,
      price,
    });
    res.status(201).json({
      message: "Book created successfully :)",
      result,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { name, category, price } = req.body;
    const book = await Book.findByIdAndUpdate(bookId, {
      name,
      category,
      price,
    });
    if (!book)
      res.status(502).json({
        message: "Book update failed :(",
        updateData: req.body,
        book,
      });
    else
      res.status(200).json({
        message: "Book updated successFully :)",
        oldBook: book,
      });
  } catch (error) {
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findByIdAndDelete(bookId);
    if (!book)
      res
        .status(404)
        .json({ message: "requested book did not found :)", bookId });
    else
      res.status(201).json({
        message: "Book deleted successfully :)",
        deletedBook: book,
      });
  } catch (error) {
    next(error);
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const result = await Book.deleteMany();
    res.status(200).json({
      message: "Deleted all books sucessfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};
