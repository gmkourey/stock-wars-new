const db = require("../models");

module.exports = {
    addUser: function (req, res) {
        db.User
        .create(req.body)
        .then(dbRes => res.json(dbRes))
        .catch(err => res.json(err))
    },

    viewUsers: function(req, res) {
        db.User
        .find({})
        .then(dbRes => res.json(dbRes))
        .catch(err => res.json(err))
    },

    getUserData: function(req, res) {
        db.User
        .find({email: req.params.id})
        .then(dbRes => res.json(dbRes))
        .catch(err => res.json(err))
    },

    updateBalance: function (req, res) {
        db.User
        .findOneAndUpdate({email: req.params.id}, {availableBalance: req.body.availableBalance})
        .then(dbRes => res.json(dbRes))
        .catch(err => res.json(err))
    }
}