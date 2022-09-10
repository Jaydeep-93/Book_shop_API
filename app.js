const express = require("express");
const morgan = require("morgan");

const bookRouter = require("./router/book");

// creating server app
const app = express();

// middlewar esetup for app wise use
app.use(morgan("dev"));

// routes added
app.use("/book", bookRouter);

// if not route found
app.use((req, res, next) => {
  res.status(400).json({ message: "Page Not found" });
});

// error handler middleware for all error thrown
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    });
});

// starting server
app.listen(3000, () => {
    console.log("server started on PORT: 3000");
});
