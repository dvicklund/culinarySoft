require('dotenv').config();

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var clientRouter = require(__dirname + "/routes/clientRouter");
var vendorRouter = require(__dirname + "/routes/vendorRouter");
var authRouter = require(__dirname + "/routes/authRouter");

process.env.APP_SECRET = process.env.APP_SECRET || 'changemechangemechangeme';

console.log('Connecting to mongodb...');
mongoose.connect(process.env.MONGOLAB_URI+"/productdb" || "mongodb://localhost/productdb");
console.log('Connected to mongodb');

app.use(express.static('public'));
app.use('/client', clientRouter);
app.use('/vendor', vendorRouter);
app.use('/auth', authRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log("Server listening on port " + (process.env.PORT || 3000));
});
