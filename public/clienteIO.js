var socket = io.connect('http://localhost:8888', { 'forceNew': true });
//<script src="clienteIO.js"></script>
socket.on('messages', function(data) {  
  console.log(data);
  render(data);
})

socket.on('fnAdd', function(arrMini){
  //alert('hola');
  var chart = AmCharts.makeChart( "chartdiv", {
  "type": "serial",
  "theme": "light",
  "dataDateFormat":"YYYY-MM-DD",
  "valueAxes": [ {
    "position": "left"
  } ],
  "graphs": [ {
    "id": "g1",
    "balloonText": "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>",
    "closeField": "close",
    "fillColors": "#7f8da9",
    "highField": "high",
    "lineColor": "#7f8da9",
    "lineAlpha": 1,
    "lowField": "low",
    "fillAlphas": 0.9,
    "negativeFillColors": "#db4c3c",
    "negativeLineColor": "#db4c3c",
    "openField": "open",
    "title": "Price:",
    "type": "candlestick",
    "valueField": "close"
  } ],
  "chartScrollbar": {
    "graph": "g1",
    "graphType": "line",
    "scrollbarHeight": 30
  },
  "chartCursor": {
    "valueLineEnabled": true,
    "valueLineBalloonEnabled": true
  },
  "categoryField": "date",
  "categoryAxis": {
    "parseDates": true
  },
  "dataProvider": arrMini[1],

  "export": {
    "enabled": true,
    "position": "bottom-right"
  }
} );

/*var chart2 = AmCharts.makeChart( "chartdiv2", {
  "type": "serial",
  "theme": "light",
  "dataDateFormat":"YYYY-MM-DD",
  "valueAxes": [ {
    "position": "left"
  } ],
  "graphs": [ {
    "id": "g1",
    "balloonText": "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>",
    "closeField": "close",
    "fillColors": "#7f8da9",
    "highField": "high",
    "lineColor": "#7f8da9",
    "lineAlpha": 1,
    "lowField": "low",
    "fillAlphas": 0.9,
    "negativeFillColors": "#db4c3c",
    "negativeLineColor": "#db4c3c",
    "openField": "open",
    "title": "Price:",
    "type": "candlestick",
    "valueField": "close"
  } ],
  "chartScrollbar": {
    "graph": "g1",
    "graphType": "line",
    "scrollbarHeight": 30
  },
  "chartCursor": {
    "valueLineEnabled": true,
    "valueLineBalloonEnabled": true
  },
  "categoryField": "date",
  "categoryAxis": {
    "parseDates": true
  },
  "dataProvider": arrMini[1],

  "export": {
    "enabled": true,
    "position": "bottom-right"
  }
} );

var chart3 = AmCharts.makeChart( "chartdiv3", {
  "type": "serial",
  "theme": "light",
  "dataDateFormat":"YYYY-MM-DD",
  "valueAxes": [ {
    "position": "left"
  } ],
  "graphs": [ {
    "id": "g1",
    "balloonText": "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>",
    "closeField": "close",
    "fillColors": "#7f8da9",
    "highField": "high",
    "lineColor": "#7f8da9",
    "lineAlpha": 1,
    "lowField": "low",
    "fillAlphas": 0.9,
    "negativeFillColors": "#db4c3c",
    "negativeLineColor": "#db4c3c",
    "openField": "open",
    "title": "Price:",
    "type": "candlestick",
    "valueField": "close"
  } ],
  "chartScrollbar": {
    "graph": "g1",
    "graphType": "line",
    "scrollbarHeight": 30
  },
  "chartCursor": {
    "valueLineEnabled": true,
    "valueLineBalloonEnabled": true
  },
  "categoryField": "date",
  "categoryAxis": {
    "parseDates": true
  },
  "dataProvider": arrMini[2],

  "export": {
    "enabled": true,
    "position": "bottom-right"
  }
} );
*/
//chart.addListener( "rendered", zoomChart );
/*chart2.addListener( "rendered", zoomChart );
chart3.addListener( "rendered", zoomChart );*/
//zoomChart(chart);
});

  


// this method is called when chart is first inited as we listen for "dataUpdated" event
function zoomChart(chart) {
  // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
  chart.zoomToIndexes( chart.dataProvider.length - 10, chart.dataProvider.length - 1 );
}


function render (data) {  
  var html = data.map(function(elem, index) {
    return(`<div>
              <strong>${elem.author}</strong>:
              <em>${elem.text}</em>
            </div>`);
  }).join(" ");

  document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {  
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };

  socket.emit('new-message', message);
  return false;
}

function fnDisparaEvento(e) {  
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };

  socket.emit('message', message);
  return false;
}

function fnContarFolk(event){
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };
  socket.emit('contar', message);
  return false;

}