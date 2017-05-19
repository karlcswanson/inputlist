var express = require('express');
var router = express.Router();
var moment = require('moment');
var host_list = require('../public/scans/host_list_res.json')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('network', { title: 'TSC | Network', 'host_list': host_list, moment:moment });
});

module.exports = router;
