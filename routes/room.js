var express = require('express');
var router = express.Router();
var helpers = require("../views/helpers.js");

/* GET home page. */
router.get('/:id_room', function(req, res, next) {
  res.render('index', { title: 'Open Hax'});
});




module.exports = router;
