var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handleError');
var basicHttp = require(__dirname + '/../lib/basicHttpAuth');
var User = require(__dirname + '/../models/userModel');
var urlencodedParser = require('body-parser').urlencoded({extended: false});

var authRouter = module.exports = exports = express.Router();

// var middleTest = function(req, res, next) {
//   console.log(req);
//   next();
// };

authRouter.post('/signup', urlencodedParser, function(req, res) {
  var user = new User();
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
    console.log('no basic auth provided');
    return res.status(401).json({msg: 'authentiCat seyazzz noe@@@!!111'});
  }

  User.findOne({'auth.basic.username': req.auth.username}, function(err, user) {
    if (err) {
      console.log('no basic auth provided');
      return res.status(401).json({msg: 'authentiCat seyazzz noe@@@!!111'});
    }

    if (!user) {
      console.log('no basic auth provided');
      return res.status(401).json({msg: 'authentiCat seyazzz noe@@@!!111'});
    }

    if (!user.checkPassword(req.auth.password)) {
     console.log('no basic auth provided');
     return res.status(401).json({msg: 'authentiCat seyazzz noe@@@!!111'});
    }

    user.generateToken(function(err, token) {
      if (err) return handleError(err, res);

      res.json({token: token});
    });
  });
});