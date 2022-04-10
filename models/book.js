const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    writer: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Book', bookSchema)
