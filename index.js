const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require('mongoose'); 
const dotenv = require("dotenv");
dotenv.config();

const bookRouter = require("./src/router/book");
const userRouter = require("./src/router/user");
const authRouter = require("./src/router/auth");

// creating server app
const app = express();

// middlewar esetup for app wise use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// database connection
mongoose.connect(
  "mongodb+srv://root:root@cluster0.ig3bra3.mongodb.net/Book_shop_API"
);

// routes added
app.use("/book", bookRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

// if not route found
app.use((req, res, next) => {
  res.status(400).json({ message: "Page Not found" });
});

// error handler middleware for all error thrown
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    // stack: err.stack,
  });
});

// // starting server
// app.listen(3000, () => {
//   console.log("server started on PORT: 3000");
// });


module.exports = app ; 