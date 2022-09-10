const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  category: String,
  price: Number,
});

module.exports = mongoose.model("Book", bookSchema);
