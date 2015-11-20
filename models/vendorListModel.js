var mongoose = require('mongoose');

var vendorSchema = new mongoose.Schema({
  name: String,
  productType: String,
  description: String,
  telephone: Number
});

module.exports = mongoose.model("Vendor", vendorSchema);
