var Book = require("../models/book.model");
var Session = require("../models/session.model");
var User = require("../models/user.model");

var cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

module.exports.see = async (req, res) => {
  var perPage = 4;
  var page = req.query.page || 1;
  var start = (page - 1) * perPage;
  var end = page * perPage;
  
  var books = await Book.find();
  
  res.render("books/see", {
    books: books,
    pageQuantity: Math.floor(Book.find().length / perPage + 1)
  })
 
};

module.exports.searchBook = async (req, res) => {
	var books = await Book.find({ $text: { $search: req.query.q }});

	res.render('books/see', {
		books: books
	});
};

module.exports.getAdd = (req, res) => {
  res.render("books/add");
};

module.exports.postAdd = async (req, res) => {
  if (!req.file) {
    var result = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/dgp8yjtbi/image/upload/v1604846973/tl4dmqn8fbbcreimjtn3.jpg"
    );
    req.body.coverUrl = result.url;
  } else {
    var result = await cloudinary.uploader.upload(req.file.path);
    req.body.coverUrl = result.url;
  }
  
  await Book.insertMany([req.body]);
  Book.save;
  
  res.redirect("/books/see");
};

module.exports.getUpdate = async (req, res) => {
  res.render("books/update", {
    id: req.params.id
  });
};

module.exports.postUpdate = async (req, res) => {
  if (!req.file) {
    var result = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/dgp8yjtbi/image/upload/v1604846973/tl4dmqn8fbbcreimjtn3.jpg"
    );
  } else {
    var result = await cloudinary.uploader.upload(req.file.path);
  }
  
  await Book.findByIdAndUpdate(req.body.id, {
    title: req.body.title,
    description: req.body.description,
    coverUrl: result.url
  });
  Book.save;
  
  res.redirect("/books/see");
};

module.exports.delete = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);

  res.redirect("/books/see");
};
