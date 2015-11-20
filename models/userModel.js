var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var eat = require('eat');

var userSchema = new mongoose.Schema({
  username: String,
  email: String,
  firstname: String,
  lastname: String,
  auth: {
    basic: {
      username: String,
      password: String
    }
  }
});

userSchema.methods.hashPassword = function(password) {
  console.log("Attempting to print pw: " + password);
  var hash = this.auth.basic.password = bcrypt.hashSync(password, 8); 
  return hash;
};

userSchema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.auth.basic.password);
};

userSchema.methods.generateToken = function(cb) {
  var id = this._id;
  eat.encode({id: id}, process.env.APP_SECRET, cb);
};

module.exports = mongoose.model('User', userSchema);