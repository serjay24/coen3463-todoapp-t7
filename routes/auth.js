var express = require('express');
var router = express.Router();
var User = require('../models/users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* GET Login Page */
router.get('/login', function(req, res) {
  if(!req.user) {
    var data = {
      title: 'Login'
    }

    res.render('login', data);
  }
  else {
    res.redirect('/');
  }
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: {type: 'error', message: 'Invalid username or password'}
  }),
  function(req, res) {
    res.redirect('/');
});

router.get('/signup', function(req, res, next) {
  if(!req.user) {
  	var data = {
  		title: "Create an Account",
  	}
  	res.render('signup', data);
  }
  else {
  	res.redirect('/');
  }
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/')
});

module.exports = router;
