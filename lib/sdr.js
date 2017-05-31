var fs = require('fs');
var util = require('util');
var readline = require('readline');
var exec = require('child_process').exec;
var rtl_config = require("../config/rtl.json");

var output = fs.createWriteStream(__dirname + "/../public/scans/wwb.csv");

var stream = require('stream');
var a = new stream.PassThrough();

var jsonblob = [];


function rtlScan(){
  var args = util.format("-f %s:%s:%s -c 50% -1 -",rtl_config["lower_frequency"],rtl_config["upper_frequency"],rtl_config["bin_size"]);
  var command = "rtl_power";
  command = command + " " + args;

  exec(command, function(error, stdout, stderr){
    a.write(stdout);
    a.end();
    var lineReader = readline.createInterface({input:a});
    lineReader.on('line', function(line){
      var arr = line.split(",");

      freq_lo = arr[2]/1e6;
      freq_hi = arr[3]/1e6;
      freq_step = arr[4]/1e6;

      arr.splice(0,6);
      arr.forEach(function(value, i){
        if (!isNaN(value)) {
          freq = freq_lo + i*freq_step;
          dB = value - 65;
          var newLine = freq.toFixed(6) + ', ' + dB.toFixed(2) + '\n';
          output.write(newLine);
          var data = { "x": freq.toFixed(6), "y": dB.toFixed(2) };
          jsonblob.push(data);
        }
      });
    });
    lineReader.on('close',function(){
      var datab = {"blob": jsonblob};
      datab["scan_config"] = rtl_config;
      fs.writeFileSync(__dirname + '/../public/scans/sdr.json', JSON.stringify( datab,null,'  ' ) , 'utf-8');
    });
  });
}

var rtl_scan = rtlScan();
