var User = require("../models/user.model.js");
var Transaction = require("../models/transaction.model.js");
var Book = require("../models/book.model.js");

module.exports.seeTransaction = async (req, res) => {
  var perPage = 4;
  var page = req.query.page || 1;
  var start = (page - 1) * perPage;
  var end = page * perPage;

  var user = await User.findById(req.signedCookies.userId);
  var transactions = await Transaction.find();

  var matchedTransactions = await transactions.filter(Transaction => {
    return Transaction.userId == user.id;
  })
  console.log(user.isAdmin);
  
  if(!user.isAdmin){
    res.render("transaction/seeTransaction", {
      transactions: matchedTransactions,
      pageQuantity: Math.floor(matchedTransactions.length / perPage + 1)
    });
    console.log(matchedTransactions);
  } else {
    res.render("transaction/seeTransaction", {
      transactions: transactions,
      pageQuantity: Math.floor(transactions.length / perPage + 1)
    });
    console.log(transactions);
  }
  console.log(user.isAdmin);
};

module.exports.searchTransaction = async (req, res) => {
  var transactions = await User.find({ $text: { $search: req.query.q }});
  
  res.render("transaction/seeTransaction", {
    transactions: transactions
  });
};

module.exports.getCreate = async (req, res) => {
  var users = await User.find();
  var books = await Book.find();
  res.render("transaction/create", {
    users: users,
    books: books
  });
};

module.exports.postCreate = async (req, res) => {
  var user = await User.findById(req.body.userId);
  var book = await Book.findById(req.body.bookId);
  
  var transaction = {
    content: `${user.name} got ${book.title}.`,
    userId: user.id,
    bookId: book.id,
    isComplete: false
  };

  var transactions = await Transaction.create(transaction);

  res.redirect("/transaction/seeTransaction");
};

module.exports.isComplete = async (req, res) => {
  let transaction = await Transaction.findById(req.params.id);
  
  await transaction.update({ $set: { isComplete: true } });

  res.redirect("/transaction/seeTransaction");
};