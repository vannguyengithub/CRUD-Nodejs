var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/publish/index', { pageTitle: 'publish page' });
});

module.exports = router;
