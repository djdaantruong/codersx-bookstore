var mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema({
  cart: [
    {
      bookId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book' 
      },
      title: String,
      quantity: Number
    }
  ]
});

const Session = mongoose.model("Session", sessionSchema, "sessions");
module.exports = Session;
