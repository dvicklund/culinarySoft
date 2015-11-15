var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name: String,
  pricePerUnit: Number,
  unit: String,
  description: String,
  UPN: Number
});

module.exports = mongoose.model("Product", productSchema);