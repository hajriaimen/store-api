const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Transaction = require("../models/transaction");
const TransactionController= require("../controllers/transactions")
const complexTransactionController= require("../controllers/complexTransaction")

//get all router
router.get("/",TransactionController.transactions_get_all);

// get transaction by id router
router.get("/:transactionId",TransactionController.transactions_get );

//post transaction router simple post comment the line below to try the complex one
router.post('/',TransactionController.transactions_post);

//THE COMPLEX TRANSACTION Methods uncomment the line below to try it

// router.post('/',complexTransactionController.transactions_post);



//update transaction router
router.patch("/:transactionId",TransactionController.transactions_update);

//delete transaction router
router.delete("/:transactionId",TransactionController.transactions_delete );

module.exports = router;
