require('dotenv').config();

var csurf = require('csurf');
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

var userRoute = require("./routes/users.route")
var bookRoute = require("./routes/books.route")
var transactionRoute = require("./routes/transaction.route");
var productRoute = require("./routes/product.route");
var cartRoute = require('./routes/cart.route');
var profileRoute = require("./routes/profile.route");
var transferRoute = require("./routes/transfer.route");

var authRoute = require('./routes/auth.route');

var authMiddleware = require('./middlewares/auth.middleware');

var db = require("./db.js");
var config = require('./config/key');

var app = express();

var port = process.env.PORT || 5000

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=> console.log('DB connected'))
  .catch(err => console.error(err));

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render('home');
  // res.json({"Hello": "I'm happy"});
});

app.use("/books", bookRoute);
app.use("/users", authMiddleware.requireAuth, userRoute);
app.use("/transaction", authMiddleware.requireAuth, transactionRoute);
app.use("/products", productRoute);
app.use('/cart', cartRoute);
app.use("/profile", authMiddleware.requireAuth, profileRoute);
app.use("/transfer", authMiddleware.requireAuth, transferRoute);
app.use('/auth', authRoute);
app.use(csurf({ cookie: true}));

var listener = app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
