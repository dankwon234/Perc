var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('site/home', { title: 'Perc' });
});

module.exports = router;
