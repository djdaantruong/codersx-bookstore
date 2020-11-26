var mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
  content: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  isComplete: Boolean
});

transactionSchema.index({content: 'text'});

var Transaction = mongoose.model('Transaction', transactionSchema, 'transactions');

module.exports = Transaction;