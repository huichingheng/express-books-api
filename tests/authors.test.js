const request = require("supertest");
const express = require("express");
const authorsRouter = require("../routes/authors");

const { MongoMemoryServer } = require("mongodb-memory-server");
const mongod = new MongoMemoryServer();
const mongoose = require("mongoose");
const Author = require("../models/author");
const Book = require("../models/book");


const app = express();
authorsRouter(app);

let saveAuthor1
let saveBook1

async function addFakeAuthors() {
  const author1 = new Author({
    name: "abc",
    age: 49
  });
  const author2 = new Author({
    name: "def",
    age: 20
  });

  saveAuthor1 = await author1.save();
  await author2.save();
}

async function addFakeBooks() {
    const book1 = new Book({
        title: "Disney book",
        author: saveAuthor1._id
    })
    const book2 = new Book({
        title: "Dreamworks",
        author: saveAuthor1._id
    })
    saveBook1 = await book1.save()
    await book2.save()
}

beforeAll(async () => {
  jest.setTimeout(120000);

  const uri = await mongod.getConnectionString();
  await mongoose.connect(uri);
  await addFakeAuthors();
  await addFakeBooks();
});

afterAll(() => {
  mongoose.disconnect();
  mongod.stop();
});

test("get /authors", async () => {
  const response = await request(app).get("/authors");
  expect(response.status).toBe(200);
  expect(response.body.length).toEqual(2);
});

test("post /authors", async () => {
    const newAuthor = {
        name: "new name",
        age: 30
    }
    const response = await request(app).post("/authors").send(newAuthor)
    expect(response.status).toBe(201);
    const authors = await Author.find()
    expect(authors.length).toEqual(3)
});

test("get /:id", async ()=>{
    console.log(saveAuthor1._id)
    const response = await request(app).get(`/authors/${saveAuthor1._id}`)
    
    console.log("response body => ", response.body)
    expect(response.body.name).toEqual("abc");
    expect(response.body._id).toEqual(`${saveAuthor1._id}`);
    expect(response.body.books[0]._id).toEqual(`${saveBook1._id}`);
    expect(response.body.books[1].title).toEqual("Dreamworks")
})

test("get /books", ()=>{
    
})


