var express = require("express");

var controller = require("../controllers/cart.controller");
var authMiddleware = require('../middlewares/auth.middleware');

var router = express.Router();

router.get('/', controller.index);

router.get('/remove/:id', controller.remove);

router.get('/hire', authMiddleware.requireAuth, controller.hire);

module.exports = router;

// var express = require('express');

// var controller = require('../controllers/cart.controller');

// var router = express.Router();

// router.get('/', controller.index);
// router.get('/add/:productId', controller.addToCart);

// module.exports = router;