var controllerBook = require("../controllers/books.controller");
var express = require("express");
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

// router.get("/see", (req, res, next) => {
//     try {
//         var a;
//         a.b();
//     } catch (error) {
//         res.render("500");
//      }
//     },
//     controllerBook.see
// );

router.get("/see", controllerBook.see);

router.get("/search", controllerBook.searchBook);

router.get("/add", controllerBook.getAdd);

router.post("/add", upload.single('coverUrl'), controllerBook.postAdd);

router.get("/:id/update", controllerBook.getUpdate);

router.post("/update", controllerBook.postUpdate);

router.get("/:id/delete", controllerBook.delete);

module.exports = router;