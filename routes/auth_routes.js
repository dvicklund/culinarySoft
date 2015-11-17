var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handleError')
var User = require(__dirname + '/../models/user');

var authRouter = module.exports = exports = express.Router();
authRouter.post('/signup', jsonParser, function(req, res) {
  console.log(req.body);
  var user = new User();
  user.auth.basic.username = req.body.username;
  user.username = req.body.username;
  user.hashPassword(req.body.password);
console.log('help')
  user.save(function(err, data) {
    if (err) return handleError(err, res);
    res.json({msg: 'user created'});
  });
});
