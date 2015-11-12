var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  UPN: Number,
  name: String,
  pricePerUnit: Number,
  unit: String,
  description: String
});

module.exports = mongoose.model("Product", productSchema);