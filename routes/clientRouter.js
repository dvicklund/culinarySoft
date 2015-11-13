var Product = require(__dirname + "/../models/productModel");
var handleError = require(__dirname + "/../lib/handleError");
var bodyParser = require('body-parser');
var express = require('express');
var clientRouter = module.exports = exports = express.Router();
var urlencodedParser = bodyParser.urlencoded({extended: false});

clientRouter.get('/product', function(req, res) {
  Product.find({}, function(err, data) {
    if(err) handleError(err, res);
    res.json(data);
  });
});

clientRouter.post('/product', urlencodedParser, function(req, res) {
  var newProduct = new Product({
    name: req.body.productName,
    pricePerUnit: req.body.pricePerUnit,
    unit: req.body.unit,
    description: req.body.description
  });
  newProduct.save(function(err, data) {
    if(err) return handleError(err);
    res.json(data);
  });
  res.end(JSON.stringify(res));
});