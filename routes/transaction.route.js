var controllerTransaction = require("../controllers/transaction.controller")
var express = require("express");
var router = express.Router();

router.get("/seeTransaction", controllerTransaction.seeTransaction);

router.get("/search", controllerTransaction.searchTransaction);

router.get("/create", controllerTransaction.getCreate);

router.post("/create", controllerTransaction.postCreate);

router.get("/:id/complete", controllerTransaction.isComplete);

router.get("/:id/delete", controllerTransaction.delete);

module.exports = router;