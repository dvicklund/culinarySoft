var Product = require(__dirname + "/../models/productModel");
var handleError = require(__dirname + "/../lib/handleError");
var bodyParser = require('body-parser');
var express = require('express');
var clientRouter = module.exports = exports = express.Router();
var urlencodedParser = bodyParser.urlencoded({extended: true});
var jsonParser = bodyParser.json();

clientRouter.get('/product', function(req, res) {
  Product.find({}, function(err, data) {
    if(err) return handleError(err, res);
    res.json(data);
  });
});

clientRouter.post('/products', urlencodedParser, function(req, res) {
  var nameText = req.body.nameText;
  Product.find({name: nameText}, function(err, data) {
    if(err) handleError(err, res);

    res.send(JSON.stringify(data));
  });
});

clientRouter.post('/product', urlencodedParser, function(req, res) {
  var newProduct = new Product({
    name: req.body.name,
    pricePerUnit: req.body.pricePerUnit,
    unit: req.body.unit,
    description: req.body.description,
    UPN: req.body.UPN
  });
  newProduct.save(function(err, data) {
    if(err) return handleError(err);
    res.redirect('/../client.html');
  });
});

clientRouter.post('/product/:id', function(req, res) {
  Product.findOneAndRemove({"_id": req.params.id}, function(err, data) {
    if(err) handleError(err, res);
    res.redirect('/../client.html');
  });
});
