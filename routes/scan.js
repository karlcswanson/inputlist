var express = require('express');
var fs = require('fs');
var moment = require('moment');
var router = express.Router();
var last_modified;


router.get('/', function(req, res, next) {
  try {
    var stats = fs.statSync(__basedir + "/public/scans/wwb.csv");
    last_modified = moment(stats['mtime']);
    last_modified = last_modified.fromNow();
    res.render('scan', { title: 'TSC | Frequency Scan', last_modified: last_modified });
  }
  catch (err) {
    res.render('scan_error', { title: 'TSC | Frequency Scan'});
  }
});

module.exports = router;
