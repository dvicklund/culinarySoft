var express = require('express');
var app = express();
var mongoose = require('mongoose');
var clientRouter = require(__dirname + "/routes/clientRouter");
var bodyParser = require('body-parser');
var multer = require('multer');

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/productdb");

app.use(express.static('public'));
app.use('/client', clientRouter);
app.use('/vendor', vendorRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer);

app.listen(process.env.PORT || 3000, function() {
  console.log("Server listening on port " + (process.env.PORT || 3000));
});