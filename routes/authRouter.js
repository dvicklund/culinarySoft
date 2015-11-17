var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handleError');
var User = require(__dirname + '/../models/userModel');

var authRouter = module.exports = exports = express.Router();
authRouter.post('/signup', jsonParser, function(req, res) {
  var user = new User();
  user.auth.basic.username = req.body.username;
  user.username = req.body.username;
  user.hashPassword(req.body.password);
  user.save(function(err, data) {
    if (err) return handleError(err, res);
    res.json({msg: 'user created'});
  });
});
