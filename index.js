var express = require('express');
var app = express();
var mongoose = require('mongoose');
var clientRouter = require(__dirname + "/routes/clientRouter");
var vendorRouter = require(__dirname + "/routes/vendorRouter");
var bodyParser = require('body-parser');

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/productdb");

app.use(express.static('public'));
app.use('/client', clientRouter);
app.use('/vendor', vendorRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000, function() {
  console.log("Server listening on port " + (process.env.PORT || 3000));
});
