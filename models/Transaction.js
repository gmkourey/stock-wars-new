const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransactionSchema = new Schema ({

    tickerSymbol: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    costBasis: {
        type: Number,
    },
    userEmail: {
        type: String
    }

})

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;