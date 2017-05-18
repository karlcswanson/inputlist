var express = require('express');
var router = express.Router();
var inputlist = require('../inputlist.json')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TSC | Input List', 'inputlist': inputlist });
});

module.exports = router;
