var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  UPN: {type: Number, default: 0},
  name: String,
  pricePerUnit: Number,
  unit: String,
  description: String
});

module.exports = mongoose.model("Product", productSchema);