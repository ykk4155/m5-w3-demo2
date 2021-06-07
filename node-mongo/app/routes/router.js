const Books = require('./controller')

const router = (app) => {
    app.post('/api/book', Books.createBook)
    app.get('/api/book/:id', Books.getBook)
    app.get('/api/books', Books.books)
    app.put('/api/book', Books.updateBook)
    app.delete('/api/book/:id', Books.deleteBook)
}

module.exports = router