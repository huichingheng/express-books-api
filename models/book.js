const mongoose = require("mongoose");
const Author = require("../models/author");

//create schema
const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    validate: {
      validator(authorId) {
        return Author.findById(authorId);
      }
    }
  }
});

//create model from schema
const book = mongoose.model("Book", bookSchema);

//export model

module.exports = book;
