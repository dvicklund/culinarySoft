var mongoose = require("mongoose");
var express = require('express');
var Product = require(__dirname + "/../models/productModel");
var handleError = require(__dirname + "/../lib/handleError");
var bodyParser = require('body-parser');
var clientRouter = module.exports = exports = express.Router();

clientRouter.get('/product', function(req, res) {
  Product.find({}, function(err, data) {
    if(err) handleError(err, res);
    res.json(data);
  });
});

clientRouter.post('/product', bodyParser.json(), function(req, res) {
  new Product({
    name: req.body.name,
    pricePerUnit: req.body.pricePerUnit,
    unit: req.body.unit,
    description: req.body.description

  }).save(function(err, doc) {
    if(err) handleError(err, res);
    res.send('Success!');
  });
});