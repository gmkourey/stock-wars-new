const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/realEstate", {useNewUrlParser: true});

const db = mongoose.connection;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to db")
});

app.listen(PORT, function() {
    console.log("App running on port http://localhost:" + PORT);
});