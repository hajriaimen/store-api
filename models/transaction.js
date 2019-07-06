//transaction schema
const mongoose = require('mongoose');
const transactionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    purchaserID:{
      type:Number,
      required:true
    },
    sellerID:{
      type:Number,
      required:true
    },
    price:{
      type:Number,
      required:true
    },
    transactionFee:{
      type:Number,
      required:true
    },
    itemID:{
      type:Number,
      required:true
    }


});

module.exports = mongoose.model('Transaction', transactionSchema);
