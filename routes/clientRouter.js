var Product = require(__dirname + "/../models/itemListModel");
var handleError = require(__dirname + "/../lib/handleError");
var bodyParser = require('body-parser');
var express = require('express');
var clientRouter = module.exports = exports = express.Router();
var urlencodedParser = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();

clientRouter.get('/product', function(req, res) {
  Product.find({}, function(err, data) {
    if(err) return handleError(err, res);
    res.json(data);
  });
});

// Search by name route using generated regular expression.
clientRouter.post('/products', urlencodedParser, function(req, res) {
  var query = {name: new RegExp(req.body.nameText, 'i')};
  Product.find(query, function(err, data) {
    if(err) handleError(err, res);
    res.json(data);
  });
});

clientRouter.post('/product', urlencodedParser, function(req, res) {
  var newProduct = new Product({
    name: req.body.name,
    quantity: req.body.quantity,
    unit: req.body.unit
  });
  newProduct.save(function(err, data) {
    if(err) return handleError(err, res);
    res.redirect(301, '/../client.html');
  });
});

clientRouter.post('/product/:id', function(req, res) {
  Product.findOneAndRemove({"_id": req.params.id}, function(err, data) {
    if(err) return handleError(err, res);
    res.redirect('/../client.html');
  });
});
