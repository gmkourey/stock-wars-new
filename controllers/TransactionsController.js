const db = require("../models");

module.exports = {
    newTransaction: function (req, res) {
        db.Transaction
            .create(req.body)
            .then(dbRes => res.json(dbRes))
            .catch(err => res.json(err))
    },
    getUserTransactions: function(req, res) {
        db.Transaction
            .find({userEmail: req.params.id})
            .then(dbRes => res.json(dbRes))
            .catch(err => res.json(err))
    }
}