var CronJob = require('cron').CronJob;
var sdr = require('./sdr');
var ping_host = require('./ping.js')

var ping = new CronJob('*/30 * * * * *', function() {
  console.log('Ping Scan');
  ping_host();
}, null, true);

var scan = new CronJob('0 */2 * * * *', function() {
  console.log('SDR Scan');
  sdr();
}, null, true);
