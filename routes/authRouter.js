var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handleError');
var basicHttp = require(__dirname + '/../lib/basicHttpAuth');
var User = require(__dirname + '/../models/userModel');
var urlencodedParser = require('body-parser').urlencoded({extended: false});

var authRouter = module.exports = exports = express.Router();

authRouter.post('/signup', urlencodedParser, function(req, res) {
  var user = new User();
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.email = req.body.email;
  user.auth.basic.username = req.body.username;
  user.username = req.body.username;
  user.hashPassword(req.body.password);

  user.save(function(err, data) {
    if (err) return handleError(err, res);
    user.generateToken(function(err, token) {
      if (err) return handleError(err, res);

      res.json({token: token});
    });
  });
});

authRouter.get('/signin', basicHttp, function(req, res) {
  if (!(req.auth.username && req.auth.password)) {
    console.log('No authentication provided');
    return res.status(401).json({msg: 'authentication failed :('});
  }

  User.findOne({'auth.basic.username': req.auth.username}, function(err, user) {
    if (err) {
      console.log('Error checking username');
      return res.status(401).json({msg: 'authentication failed :('});
    }

    if (!user) {
      console.log('User not found');
      return res.status(401).json({msg: 'authentication failed :('});
    }

    if (!user.checkPassword(req.auth.password)) {
     console.log('Incorrect password');
     return res.status(401).json({msg: 'authentication failed :('});
    }

    user.generateToken(function(err, token) {
      if (err) return handleError(err, res);
      res.set({
        token: token
      });
      res.json({token: token});
    });
  });
});