var ping = require('ping');
var fs = require('fs');
var host_list = require("../config/hostlist.json")

host_list.forEach(function(host,i){
  ping.sys.probe(host['host'], function(isAlive){
    host['ping'] = isAlive;
    // var msg = isAlive ? 'host ' + host['name'] + ' is alive' : 'host ' + host['name'] + ' is dead';
    // console.log(msg);
    if (i === host_list.length -1) {
      var output = {"last_check": (new Date).toJSON()};
      output["host_list"] = host_list;
      fs.writeFile( "./public/scans/net_scan.json", JSON.stringify(output, null,'  '),"utf8");
    }
  });
});
