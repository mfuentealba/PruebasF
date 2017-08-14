var express = require('express');
var router = express.Router();
var cjs = require('candlejs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*
router.get('/cadle', function(req, res, next) {
  res.send();
});*/

module.exports = router;
