function makeplot() {
    Plotly.d3.csv("https://raw.githubusercontent.com/HP-Nunes/airQualityInTheBayArea_aComparisonBetweenOctober2017-2018/master/outputs/SFbay_AirNow_Merged.csv", function(data){ processData(data) } );

};
   
function processData(allRows) {

    console.log(allRows);
    var x = [], y = [], standard_deviation = [];

    for (var i=0; i<allRows.length; i++) {
        row = allRows[i];
        x.push( row['ReportingArea'] );
        y.push( row['AQI17'] );
    }
    console.log( 'X',x, 'Y',y, 'SD',standard_deviation );
    makePlotly( x, y, standard_deviation );
}

     // Now create slider steps, one for each frame. The slider
  // executes a plotly.js API command (here, Plotly.animate).
  // In this example, we'll animate to one of the named frames
  // created in the above loop.
var sliderSteps = [];
  for (i = 0; i < Day.length; i++) {
    sliderSteps.push({
      method: 'animate',
      label: Day[i],
      args: [[Day[i]], {
        mode: 'immediate',
        transition: {duration: 300},
        frame: {duration: 300, redraw: false},
      }]
    });
  }

var layout = {
        barmode: 'group',
        updatemenus: [{
        x: 0,
        y: 0,
        yanchor: 'top',
        xanchor: 'left',
        showactive: false,
        direction: 'left',
        type: 'buttons',
        pad: {t: 87, r: 10},
        buttons: [{
          method: 'animate',
          args: [null, {
            mode: 'immediate',
            fromcurrent: true,
            transition: {duration: 300},
            frame: {duration: 500, redraw: false}
          }],
          label: 'Play'
        }, {
          method: 'animate',
          args: [[null], {
            mode: 'immediate',
            transition: {duration: 0},
            frame: {duration: 0, redraw: false}
          }],
          label: 'Pause'
        }]
      }],
       // Finally, add the slider and use `pad` to position it
       // nicely next to the buttons.
      sliders: [{
        pad: {l: 130, t: 55},
        currentvalue: {
          visible: true,
          prefix: 'Day:',
          xanchor: 'right',
          font: {size: 20, color: '#666'}
        },
        steps: sliderSteps
      }]
    };

function makePlotly( x, y, standard_deviation ){
    var plotDiv = document.getElementById("plot");
    var trace1 = [{
            x: x, 
            y: y,
            name: 'AQI 2017',
            type: 'bar'
        }];

    var data = [trace1];

    Plotly.newPlot('myDiv', data, 
        {title: 'Plotting CSV data from AJAX call'});
};
makeplot();