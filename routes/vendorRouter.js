var Product = require(__dirname + "/../models/productModel");
var handleError = require(__dirname + "/../lib/handleError");
var bodyParser = require('body-parser');
var express = require('express');
var vendorRouter = module.exports = exports = express.Router();
var urlencodedParser = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();

vendorRouter.get('/product', function(req, res) {
  Product.find({}, function(err, data) {
    if(err) return handleError(err, res);
    res.json(data);
  });
});

// Search by name route
vendorRouter.post('/products', urlencodedParser, function(req, res) {
  var nameText = req.body.nameText.toLowerCase();
  Product.find({name: nameText}, function(err, data) {
    if(err) handleError(err, res);
    res.json(data);
  });
});

vendorRouter.post('/product', urlencodedParser, function(req, res) {
  var newProduct = new Product({
    name: req.body.name.toLowerCase(),
    pricePerUnit: req.body.pricePerUnit,
    unit: req.body.unit,
    description: req.body.description.toLowerCase(),
    UPN: req.body.UPN
  });
  newProduct.save(function(err, data) {
    if(err) return handleError(err, res);
    res.redirect(205, '/../vendor.html');
  });
});

vendorRouter.post('/product/:id', function(req, res) {
  Product.findOneAndRemove({"_id": req.params.id}, function(err, data) {
    if(err) return handleError(err, res);
    res.redirect('/../vendor.html');
  });
});

// vendorRouter.get('/product/sort/name/des', function(req, res) {
//   Product.find({}, {"sort": ["name", "desc"]}, function(err, data) {
//     if(err) return handleError(err, res);
//     res.json(data);
//   });
// });

// vendorRouter.get('/product/sort/name/asc', function(req, res) {
//   Product.find({}, {"sort": ["name", "asc"]}, function(err, data) {
//     if(err) return handleError(err, res);
//     res.json(data);
//   });
// });
