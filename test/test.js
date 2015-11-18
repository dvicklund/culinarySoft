var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = "mongodb://localhost/productdb";
require(__dirname + '/../index'); // Starts server for testing
var mongoose = require('mongoose');
var Product = require(__dirname + '/../models/productModel');

/*describe('client router', function() {
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
});*/

describe('vendor router', function() {
   after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

 /* it('should be able to add a product', function(done) {
    var productData = {name: 'test product'};
    chai.request('localhost:3000')
      .post('/vendor/product')
      .send(productData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        Product.findOne({name: 'test product'}, function(err, product) {
          expect(product.name).to.eql('test product');
          done();
        });
      });
  });*/

  describe('tests which require a product in db', function() {
    beforeEach(function(done) {
      (new Product({name: 'test product'})).save(function(err, data) {
        expect(err).to.eql(null);
        this.product = data;
        done();
      }.bind(this));
    });

    it('should be able to update a product', function() {
      chai.request('localhost:3000')
        .patch('/vendor/product' + this.product._id)
        .send({name: 'a different product name'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success!');
          done();
        })
    });

    /*it('should be able to remove a product', function() {
      chai.request('localhost:3000')
        .delete('vendor/product' + this.product._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success!');
          done();
        });
    });*/
  });
});
