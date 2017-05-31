var net_scan = (function () {
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "/scans/net_scan.json",
    'dataType': "json",
    'success': function (data) {
      json = data;
    }
  });
  return json;
})();

$(document).ready( function() {
  $.each(net_scan["host_list"],function(index,host){
    var str = "<tr class=" + (host.ping ? '"success"':'"danger"') + "><td>"+(host.URL?'<a href="'+host.URL + '">'+host.name+'</a>':host.name) + "</td></tr>";
    $("#netres").append(str);

  });
});
