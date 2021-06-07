/* eslint-disable no-undef */
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const Book = mongoose.model('Books')

const createBook = async (req, res) => {
    const {author, title} = req.body
    const book = new Book({author, title})
    // Save Book in the MongoDB
    console.log({book})
    book.save()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((error) => {
            res.status(500).json({
                message: 'STATUS:Fail!!!',
                err: err.mesage
            })
        })
}

const getBook = async (req, res) => {
    const {id} = req.params
    Book.findById(id)
        .select('-__v')
        .then((books) => {
            res.status(200).json(books)
        })
        .catch((err) => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Book not found with id ' + id,
                    error: err
                })
            }
            return res.status(500).send({
                message: 'Error retrieving Book with id ' + id,
                error: err
            })
        })
}

const books = async (req, res) => {
    Book.find()
        .select('-__v')
        .then((books) => {
            return res.status(200).json(books)
        })
        .catch((err) => {
            console.log({error})

            return res.status(500).json({
                message: 'Error!!!',
                error: err
            })
        })

}

const updateBook = async (req, res) => {
    const {author, title, id} = req.body
    // Find Book and update it
    Book.findByIdAndUpdate(id, {author, title}, {new: false})
        .select('-__v')
        .then((book) => {
            if (!book) {
                return res.status(404).json({
                    message: 'Can\'t update book with id =' + id,
                    error: "Not Found"
                })
            }
            res.status(200).json(book)
        })
        .catch((err) => {
            return res.status(500).json({
                message: 'Error -> Can\'t update book with id =' + id,
                error: err
            })
        })

}

const deleteBook = async (req, res) => {
    const {id} = req.params
    Book.findByIdAndDelete(id)
        .select('-__v-_id')
        .then((invetory) => {
            if (!invetory) {
                return res.status(404).json({
                    message: 'No Book found with id = ' + id,
                    error: "404"
                })
            }
            res.status(200).json({})
        })
        .catch((err) => {
            return res.status(500).json({
                message: 'Error -> Can\'t delete book with id =' + id,
                error: err
            })
        })
}

module.exports = {
    createBook,
    getBook,
    books,
    updateBook,
    deleteBook
}