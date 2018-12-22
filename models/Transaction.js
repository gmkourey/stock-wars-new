const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransactionSchema = new Schema ({

    tickerSymbol: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    costBasis: {
        type: Number,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    }

})

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;