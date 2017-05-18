var fs = require('fs');
var readline = require('readline');

var [src, dest] = process.argv.slice(2);
var output = fs.createWriteStream(dest);
var lineReader = readline.createInterface({input:
  fs.createReadStream(src)});
  lineReader.on('line', function(line){
  var arr = line.split(",");

  freq_lo = arr[2]/1e6;
  freq_hi = arr[3]/1e6;
  freq_step = arr[4]/1e6;

  arr.splice(0,6);
  arr.forEach(function(value, i){
    freq = freq_lo + i*freq_step;
    dB = value - 65;
    var newLine = freq.toFixed(6) + ', ' + dB.toFixed(2) + '\n';
    output.write(newLine);
  });
})

