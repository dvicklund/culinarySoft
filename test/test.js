var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
require(__dirname + '/../index'); // Starts server for testing
var productModel = require(__dirname + '/../models/productModel');

process.env.MONGOLAB_URI = "/mongodb://localhost/productdb";

describe('client router', function() {
  it('should be able to view vendor lists', function() {

  });

  it('should be able to make a new list', function() {

  });

  it('should be able to add a selected vendor item to a list', function() {

  });

  it('should be able to remove a vendor item from a list', function() {

  });

  it('should get a list of products on a get request', function() {

  });

  it('should be able to search for a specific product', function() {

  });
});

describe('vendor router', function() {
  it('should be able to add a new product', function(done) {
    var productData = {name: 'test product'};
    chai.request('localhost:3000')
      .post('/api/products')
      .send(productData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('test product');
        expect(res.body).to.have.property('_id');
      });
  });

  it('should be able to modify a product', function() {

  });

  it('should be able to remove a prodcut', function() {

  });
});