var express = require('express');
var router = express.Router();
//var Users = require('../DAO/users.js');
//var helpers = require("../views/helpers.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Open Hax'});
});

module.exports = router;
