var Product = require(__dirname + "/../models/productModel");
var handleError = require(__dirname + "/../lib/handleError");
var bodyParser = require('body-parser');
var express = require('express');
var clientRouter = module.exports = exports = express.Router();
var urlencodedParser = bodyParser.urlencoded({extended: true});

clientRouter.post('/products', urlencodedParser, function(req, res) {
  var nameText = req.body.nameText;
  Product.find({name: nameText}, function(err, data) {
    if(err) handleError(err, res);
    res.send(data.toString());
  });
});

clientRouter.get('/products', function(req, res) {
  Product.find({}, function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

clientRouter.post('/products', urlencodedParser, function(req, res) {
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
});

clientRouter.delete('/products', urlencodedParser, function(req, res) {
  var nameText = req.body.nameText;
  Product.remove({name: nameText}, function(err) {
    if (err) return handleError(err, res);
    res.send({msg: 'success!'});
  });
});
