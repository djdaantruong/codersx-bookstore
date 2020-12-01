var Session = require("../models/session.model.js");
var User = require("../models/user.model.js");
var Book = require("../models/book.model.js");
var Transaction = require('../models/transaction.model.js');

module.exports.index = async (req, res) => {
  let session = await Session.findById(req.signedCookies.sessionId);

  res.render("cart/index", {
    cart: session.cart
  });
};

module.exports.addToCart = async (req, res, next) => {
  try {
    //Book id nó đâu nằm trong body ^.^
    //Nó nằm trong req.params em
    //Em dùng sai cách nên nó ra null là đúng rồi
    //Ở route em khai báo là :bookId thì phải là req.params.bookId
    //Em chịu khó console.log để hiểu giá trị các biến của code em đang viết
    // var book = await Book.findById(req.params.bookId);
    var bookId = req.params.bookId;
    var session = await Session.findById(req.signedCookies.sessionId);
    var book = await Book.findById(req.params.bookId);
    var count;
    console.log(book);

    if (!session) {
        res.redirect('/books/see');
        return;
    }

    await Session.findOneAndUpdate(
      {_id: session},
      { $push: 
         {
           cart: {
             _id: bookId,
             title: book.title,
             quantity: 1
           }
         } 
      }
    )

    res.redirect('/books/see');
  } catch (error) {
    next(error);
  }
};

module.exports.remove = async (req, res) => {
  let session = await Session.findById(req.signedCookies.sessionId);

  for (let i = 0; i < session.cart.length; i++) {
    if (session.cart[i].id == req.params.bookId) {
      session.cart.splice(i, 1);
      break;
    }
  }

  await session.save();
  res.redirect("/cart");
};

module.exports.hire = async (req, res) => {
  let session = await Session.findById(req.signedCookies.sessionId);

  if (session.cart.length == 0) {
    res.redirect("/books");
    return;
  }

  let user = await User.findById(req.signedCookies.userId);
  
  for (let book of session.cart) {
    let transaction = {
      content: `${user.name} got ${book.title}.`,
      userId: user.id,
      bookId: book.id,
      isComplete: false
    };
    // console.log(transaction);
    await Transaction.create(transaction);
  }
  
  session.cart = [];
  session.save();
  
  res.redirect("/transaction/seeTransaction");
};



// module.exports.addToCart = async (req, res, next) => {
//   try {
//     var book = await Book.findById(req.body.bookId);
//     if (!book) {
//       res.redirect('/book/see');
//       return;
//     }

//     var session = await Session.findById(req.signedCookies.sessionId);
//     if (!session) {
//         res.redirect('/books/see');
//         return;
//     }
    // check xem bookId ton tai trong cart chua update quantity +1
    // console.log(req.body);
    // req.body : {
    //  bookId: 'id',
    //  quantity: 1
    //}
    // await Session.update({_id: session._id}, {$push : req.body})
    

    // await Session.create(req.body);

//     res.redirect('/books/see');
//   } catch (error) {
//     next(error);
//   }
// };




// sesssion : {
//   id: '123123'
//   cart: [
//     {
//       id: 'cartId',
//       bookid: 'abc',
//       quantity: '1'
//     }
//   ]
// }