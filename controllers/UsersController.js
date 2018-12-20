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
    }
}