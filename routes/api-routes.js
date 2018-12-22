const router = require("express").Router();
const TransactionsController = require("../controllers/TransactionsController")
const UsersController = require("../controllers/UsersController");


router.route("/transactions")
    .post(TransactionsController.newTransaction)

router.route("/transactions/:id")
    .get(TransactionsController.getUserTransactions)

router.route("/users")
    .get(UsersController.viewUsers)
    .post(UsersController.addUser)

router.route("/user/:id")
    .get(UsersController.getUserData)
    .put(UsersController.updateBalance)

module.exports = router;