var mongoose = require('mongoose');


var itemListSchema = new mongoose.Schema({
  name      : String,
  quantity  : Number,
  unit      : String
});

module.exports = mongoose.model('ItemList', itemListSchema);
