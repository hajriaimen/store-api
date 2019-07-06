const mongoose = require('mongoose');
const Transaction = require("../models/transaction");


//get request :list all transactions
exports.transactions_get_all= (req, res, next) => {
  Transaction.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.transactions_get=(req, res, next) => {
  const id = req.params.transactionId;
  Transaction.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}

//POST request: add new transaction to the DB
exports.transactions_post=(req, res, next)=>{
  const transaction= new Transaction({
    _id:mongoose.Types.ObjectId(),
    purchaserID: req.body.purchaserID,
    sellerID: req.body.sellerID,
    price: req.body.price,
    transactionFee: req.body.transactionFee,
    itemID: req.body.itemID
  });
  transaction
  .save()

  //return True if transaction saved

  .then(result => {
    res.status(200).json({message:"True"});
  })
  //return FALSE if error
  .catch(err => {
    console.log(err);
    res.status(500).json({
    message:"False"
    });
  });
}

// update request

exports.transactions_update= (req, res, next) => {
 const id = req.params.transactionId;
 const updateOps = {};
 for (const ops of req.body) {
   updateOps[ops.propName] = ops.value;
 }
 Transaction.update({ _id: id }, { $set: updateOps })
   .exec()
   .then(result => {
     console.log(result);
     res.status(200).json(result);
   })
   .catch(err => {
     console.log(err);
     res.status(500).json({
       error: err
     });
   });
}
// DELETE request
exports.transactions_delete= (req, res, next) => {
  const id = req.params.transactionId;
  Transaction.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}
