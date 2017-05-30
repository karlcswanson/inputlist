var json = (function () {
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "/scans/sdr.json",
    'dataType': "json",
    'success': function (data) {
      json = data;
    }
  });
  return json;
})();
var blob = json["blob"];
var color = Chart.helpers.color;
var scatterChartData = {
  datasets: [{
    radius: .1,
    borderWidth: .5,
    label: "Frequency Plot",
    borderColor: window.chartColors.green,
    backgroundColor: color(window.chartColors.white).alpha(0).rgbString(),
    data: blob
  }]
};

window.onload = function() {
  var ctx = document.getElementById("canvas").getContext("2d");
  window.myScatter = Chart.Scatter(ctx, {
    data: scatterChartData,
    options: {
      title: {
        display: false,
        text: 'Frequency Plot'
      },
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        ticks: {
          callback: function(value, index, values) {
            //Convert MHz to channel number
            var channel = (value-470)/6 + 14;
            return "TV" + channel + ": " + value;
          },
          stepSize: 6,
          min: 656,
          max: 692
        },
        scaleLabel: {
          display: true,
          labelString: 'Frequency (MHz)'
        }
      }],
      yAxes: [{
        ticks: {
          suggestedMin: -110,
          suggestedMax: -20
        },
        scaleLabel: {
          display: true,
          labelString: 'Amplitude (dBm)'
        }
      }]
    }

  }
});
};
