var controllerCart = require("../controllers/cart.controller");
var authMiddleware = require('../middlewares/auth.middleware');

var express = require("express");

var router = express.Router();

router.get('/', controllerCart.index);

router.get('/add/:bookId', controllerCart.addToCart);

router.get('/remove/:bookId', controllerCart.remove);

router.get('/hire', authMiddleware.requireAuth, controllerCart.hire);

module.exports = router;
