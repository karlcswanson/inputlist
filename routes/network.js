var express = require('express');
var router = express.Router();
var moment = require('moment');
var net_scan = require('../public/scans/net_scan.json')


/* GET home page. */
router.get('/', function(req, res, next) {
  var last_modified = moment(net_scan["last_check"]);
  last_modified = last_modified.fromNow();
  res.render('network', { title: 'TSC | Network', 'net_scan': net_scan, last_modified:last_modified });
});

module.exports = router;
