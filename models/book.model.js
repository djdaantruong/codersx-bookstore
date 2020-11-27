var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  coverUrl: {
    type: String,
    default: "https://res.cloudinary.com/dgp8yjtbi/image/upload/v1604846973/tl4dmqn8fbbcreimjtn3.jpg"
  } 
});

bookSchema.index({title: 'text'});

var Book = mongoose.model('Book', bookSchema, 'books');

module.exports = Book;