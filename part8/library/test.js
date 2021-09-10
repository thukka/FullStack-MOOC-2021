require('dotenv').config()
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log('connected to mongodb'))
    .catch((error) => console.log('error: ', error.message))

const findAuthor = async () => {
    /* let s = await Author.findOne({ _id: '613a3e84c912be069a0f10bd' }).populate('books', { title: 1 }) */
    let s = await Author.findOne({ name: 'Traktori' }).populate('books')
    console.log('s: ', s)

    let book = await Book.findOne({ title: 'Valmet' }).populate('author', { name: 1, born: 1 })
    console.log('book: ', book)
    
    console.log('pituus: ', s.books.length)
}

findAuthor()