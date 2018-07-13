const mongoose = require('mongoose');

//schema
const authorSchema = mongoose.Schema({
    name: String,
    age: String
})

module.exports = mongoose.model("Author", authorSchema)