var fs = require('fs');
var util = require('util');
var readline = require('readline');
var exec = require('child_process').execSync;
var os = require('os');
var rtl_config = require("../config/rtl.json");


function rtlScan() {
  var args = util.format("-f %s:%s:%s -c 50% -1 -",rtl_config["lower_frequency"],rtl_config["upper_frequency"],rtl_config["bin_size"]);
  var command = "rtl_power";
  command = command + " " + args;

  return exec(command,{encoding:'utf8'});
}

function strProcess(input_string){
  var data = [];
  input_string = input_string.split(os.EOL);
  for (let s of input_string){
    var arr = s.split(",");

    freq_lo = arr[2]/1e6;
    freq_hi = arr[3]/1e6;
    freq_step = arr[4]/1e6;

    arr.splice(0,6);
    arr.forEach(function(value, i){
      if (!isNaN(value)) {
        freq = freq_lo + i*freq_step;
        dB = value - 65;

        var entry = { "x": freq.toFixed(6), "y": dB.toFixed(2) };
        data.push(entry);
      }
    });
  }
  return data;
}


function sdr_scan (){
  var out = strProcess(rtlScan());
  writeChartjs(out);
  writeWWB(out);
}

function writeWWB(data){
  var line = '';
  data.forEach(function(entry){
    line += entry['x'] + ', ' + entry['y'] + '\n';
  });
  fs.writeFileSync(__dirname + '/../public/scans/wwb.csv', line , 'utf-8');
}

function writeChartjs(data){
  var output = {};
  output["scan_config"] = rtl_config;
  output["blob"] = data;

  fs.writeFileSync(__dirname + '/../public/scans/sdr.json', JSON.stringify(output,null,'  ' ) , 'utf-8');
}

module.exports = function() {
  sdr_scan();
}
