var socket = io.connect('http://localhost:8888', { 'forceNew': true });
//<script src="clienteIO.js"></script>
socket.on('messages', function(data) {  
  console.log(data);
  render(data);
})

socket.on('fnAdd', function(arrMini){
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(function(){
    drawChart(arrMini);
  });
  
 
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



function drawChart(arr) {
var data = google.visualization.arrayToDataTable(/*[
['Mon', 20, 28, 38, 45],
['Tue', 31, 38, 55, 66],
['Wed', 50, 55, 77, 80],
['Thu', 77, 77, 66, 50],
['Fri', 68, 66, 22, 15]]*/
arr[1]
, true);



var options = /*{
legend:'none'
};*/
{
  // Allow multiple
  // simultaneous selections.
  selectionMode: 'multiple',
  // Trigger tooltips
  // on selections.
  tooltip: {trigger: 'selection'},
  // Group selections
  // by x-value.
  aggregationTarget: 'category',
};




var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));

chart.draw(data, options);
}



