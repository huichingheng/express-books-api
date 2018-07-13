const express = require("express");
const router = express.Router();
const Author = require("../models/author");
const Book = require("../models/book");

router.use(express.json())

router.post("/", async (req, res, next) => {
  const newAuthor = new Author({
    name: req.body.name,
    age: req.body.age
  });
  await newAuthor.save();

  res.status(201).json({
    message: "sucessful create author"
  });
});

router.get("/", async (req, res, next) => {
  res.json(await Author.find());
  //   res.json("hello");
});

router.get("/:id", async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);
    const books = await Book.find({ author: req.params.id });
    res.json({
      ...author.toJSON(),
      books: books
    });
  } catch (error) {
    next(error);
  }
});

module.exports = app => {
  // app.use(express.json());
  app.use("/authors", router);
};
