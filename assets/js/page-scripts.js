$(document).ready(function() {
  switch (window.location.pathname) {
    case "/":
      loadFlot();
      loadKnob();
      break;
  }
});

function loadFlot() {
  /*
   * Flot Interactive Chart
   * -----------------------
   */
  // We use an inline data source in the example, usually data would
  // be fetched from a server
  var data = [],
    totalPoints = 100;

  function getRandomData() {

    if (data.length > 0)
      data = data.slice(1);

    // Do a random walk
    while (data.length < totalPoints) {

      var prev = data.length > 0 ? data[data.length - 1] : 50,
        y = prev + Math.random() * 10 - 5;

      if (y < 0) {
        y = 0;
      } else if (y > 100) {
        y = 100;
      }

      data.push(y);
    }

    // Zip the generated y values with the x values
    var res = [];
    for (var i = 0; i < data.length; ++i) {
      res.push([i, data[i]]);
    }

    return res;
  }

  var interactive_plot = $.plot("#interactive", [getRandomData()], {
    grid: {
      borderColor: "#f3f3f3",
      borderWidth: 1,
      tickColor: "#f3f3f3"
    },
    series: {
      shadowSize: 0, // Drawing is faster without shadows
      color: "#3c8dbc"
    },
    lines: {
      fill: true, //Converts the line chart to area chart
      color: "#3c8dbc"
    },
    yaxis: {
      min: 0,
      max: 100,
      show: true
    },
    xaxis: {
      show: false
    }
  });

  var updateInterval = 500; //Fetch data ever x milliseconds
  var realtime = "on"; //If == to on then fetch data every x seconds. else stop fetching
  function update() {
    // console.log(getRandomData())
    interactive_plot.setData([getRandomData()]);

    // Since the axes don't change, we don't need to call plot.setupGrid()
    interactive_plot.draw();
    if (realtime === "on")
      setTimeout(update, updateInterval);
  }

  //INITIALIZE REALTIME DATA FETCHING
  if (realtime === "on") {
    update();
  }
  //REALTIME TOGGLE
  $("#realtime .btn").click(function() {
    if ($(this).data("toggle") === "on") {
      realtime = "on";
    } else {
      realtime = "off";
    }
    update();
  });
  /*
   * END INTERACTIVE CHART
   */

  /*
   * Custom Label formatter
   * ----------------------
   */
  function labelFormatter(label, series) {
    return "<div style='font-size:13px; text-align:center; padding:2px; color: #fff; font-weight: 600;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
  }

}

function loadKnob() {
  /* jQueryKnob */

  $(".knob").knob({
    // change: function(value) {
      // console.log("change : " + value);
    // },
    // release: function(value) {
      // console.log("release : " + value);
    // },
  });
  /* END JQUERY KNOB */
}
