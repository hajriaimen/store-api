const TransactionModel= require("../models/transaction");
const Transaction = require('mongoose-transactions');
const useDB = true;
const transaction = new Transaction(useDB)

exports.transactions_post=(req, res, next)=>{
    // Validate request
    if(!req.body.purchaserID || !req.body.sellerID || !req.body.price || !req.body.transactionFee || !req.body.itemID) {
        return res.status(400).send({
            message: "Content can not be empty"
        })
    }

    // Create transaction
    const transactionObj = new TransactionModel({
      _id:mongoose.Types.ObjectId(),
      purchaserID: req.body.purchaserID,
      sellerID: req.body.sellerID,
      price: req.body.price,
      transactionFee: req.body.transactionFee,
      itemID: req.body.itemID
    });

    try {
        const transactionId = transaction.insert("TransactionModel", transactionObj);
        const final =  transaction.run()
        .then(function(final) {console.log("final",final);});
        console.log('transactionId',transactionId);
        const operations = transaction.getOperations()
        .then(function(op) {console.log("operation",op);});

    } catch (error) {
        console.error(error)
        const rollbackObj =  transaction.rollback().catch(console.error);
        console.log(rollbackObj);
        transaction.clean();
    }
}
