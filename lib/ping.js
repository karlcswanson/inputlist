var ping = require('ping');
var fs = require('fs');
var host_list = require("../config/hostlist.json")

host_list.forEach(function(host,i){
  ping.sys.probe(host['host'], function(isAlive){
    host['date'] = (new Date).toJSON();
    host['ping'] = isAlive;
    var msg = isAlive ? 'host ' + host['name'] + ' is alive' : 'host ' + host['name'] + ' is dead';
    console.log(msg);
    if (i === host_list.length -1) {
      fs.writeFile( "./public/scans/host_list_res.json", JSON.stringify( host_list ), "utf8" );
    }
  });
});
