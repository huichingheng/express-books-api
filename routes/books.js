const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Book = require("../models/book");

router.use(express.json())

/* GET books listing. */
router.get("/", async (req, res, next) => {
  res.json({ books: await Book.find().populate('author') });
});

router.get("/:id", async (req, res, next) => {
  // const book = await Book.findById(req.params.id);
  res.json(await Book.findById(req.params.id));
});

router.post("/", async (req, res, next) => {
  const newBook = new Book({
    title: req.body.title,
    author: req.body.authorId
  });

  const result = await newBook.save();
  console.log(result);
  res.status(201).json();
});

router.put("/:id", async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: `update a book id ${req.params.id}` });
});

router.delete("/:id", async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  res.json({ message: `delete book with id ${req.params.id}` });
});

module.exports = app => {
  app.use("/books", router);
}
