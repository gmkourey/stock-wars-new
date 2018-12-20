var router = require("express").Router();
var apiRoute = require("./api-routes.js");

router.use("/api", apiRoute);
module.exports = router;