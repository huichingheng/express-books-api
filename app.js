const mongoose = require("mongoose");

const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const index = require("./routes/index");
const booksRouter = require("./routes/books");
const authorsRouter = require("./routes/authors");
const Author = require("./models/author");

const mongodbURI = process.env.MONGODB_URI || "mongodb://localhost/jumpstart";

mongoose.connect(mongodbURI);
const db = mongoose.connection;
db.on("error", error => {
  console.log("An error occur", error);
});

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", index);

authorsRouter(app);
booksRouter(app);

module.exports = app;
