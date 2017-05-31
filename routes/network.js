var express = require('express');
var router = express.Router();
var moment = require('moment');
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile(__basedir + '/public/scans/net_scan.json','utf8', function(error, data){
    if (error) {
      res.render('net_scan_error', { title: 'TSC | Network'});
    } else {
      net_scan = JSON.parse(data);
      var last_modified = moment(net_scan["last_check"]);
      last_modified = last_modified.fromNow();
      res.render('network', { title: 'TSC | Network', 'net_scan': net_scan, last_modified:last_modified });
    }
  });
});

module.exports = router;
