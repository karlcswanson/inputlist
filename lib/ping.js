var ping = require('ping');
var fs = require('fs');
var host_list = require("../config/hostlist.json")

function ping_host (){
  host_list.forEach(function(host,i){
    ping.sys.probe(host['host'], function(isAlive){
      host['ping'] = isAlive;

      if (i === host_list.length -1) {
        var output = {"last_check": (new Date).toJSON()};
        output["host_list"] = host_list;
        fs.writeFile(__dirname + '/../public/scans/net_scan.json', JSON.stringify(output, null,'  '),"utf8");
      }
    });
  });
}

module.exports = function(){
  ping_host();
}
