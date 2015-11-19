var chai = require('chai');
var chaihttp = require('chai-http');
var mongoose = require('mongoose');
var Product = require(__dirname + '/../models/productModel');

// Starts server for testing using test db to avoid modifying real files
process.env.MONGOLAB_URI = "mongodb://localhost/testproductdb";
var server = require(__dirname + '/../index');

var expect = chai.expect;
var should = chai.should();
chai.use(chaihttp);

describe('client router', function() {
  it('should be able to view vendor lists', function(done) {
    chai.request('localhost:3000')
      .get('/vendor/product')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

//   it('should be able to make a new list', function() {

//   });

//   it('should be able to add a selected vendor item to a list', function() {

//   });

//   it('should be able to remove a vendor item from a list', function() {

//   });

  it('should list all products on get /client/product', function(done) {
    chai.request('localhost:3000')
      .get('/client/product')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.be.an('array');
        done();
      });
  });

//   it('should be able to search for a specific product', function() {

//   });
});

describe('vendor router', function() {
   after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to add a product', function(done) {
    chai.request('localhost:3000')
      .post('/vendor/product')
      .send({name: 'test product'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        res.should.be.an('object');
        res.body.should.be.an('object');
        done();
      });
  });

  it('should list all products on get /vendor/product', function(done) {
    chai.request('localhost:3000')
      .get('/vendor/product')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.be.an('array');
        done();
      });
  });

  // describe('tests which require a product in db', function() {
  //   beforeEach(function(done) {
  //     (new Product({name: 'test product'})).save(function(err, data) {
  //       expect(err).to.eql(null);
  //       this.products = data;
  //       done();
  //     }.bind(this));
  //   });

  //   it('should be able to update a product', function() {
  //     chai.request('localhost:3000')
  //       .patch('/vendor/product' + this.products._id)
  //       .send({name: 'a different product name'})
  //       .end(function(err, res) {
  //         expect(err).to.eql(null);
  //         done();
  //       });
  //   });

  //   it('should be able to remove a product', function() {
  //     chai.request('localhost:3000')
  //       .delete('vendor/product' + this.product._id)
  //       .end(function(err, res) {
  //         expect(err).to.eql(null);
  //         expect(res.body.msg).to.eql('success!');
  //         done();
  //       });
  //   });
  // });
});
