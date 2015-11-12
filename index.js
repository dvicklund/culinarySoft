var express = require('express');
var app = express();
var mongoose = require('mongoose');
var clientRouter = require(__dirname + "/routes/clientRouter");

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/productdb");

app.use(express.static('public'));
app.use("/api", clientRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log("Server listening on port " + (process.env.PORT || 3000));
});