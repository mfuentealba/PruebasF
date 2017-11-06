var socket = io.connect('http://localhost:8888', { 'forceNew': true });
//<script src="clienteIO.js"></script>
socket.on('messages', function(data) {  
  console.log(data);
  render(data);
})


var arrTodo = [
//[
//{"x":1,"y":[1.37517,1.37592,1.37372,1.37495],"vo":{"open":1.37517,"close":1.37495,"low":1.37372,"high":1.37592,"id":1,date":"23:10","origen":"S","fecha":"2014.01.01","vol":764}},

];


var arrNiveles = [
]



socket.on('fnAdd', function(arrMini){
  /*google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(function(){
    drawChart(arrMini);
  });*/
  /*var chart = new CanvasJS.Chart("chartContainer",
	{
		title:{
			text: "Candle Stick chart using risingColor property"
		},
		zoomEnabled: true,
		axisY: {
			includeZero:false,
			title: "Prices",
			prefix: "$ "
		},
		axisX: {
			interval:2,
			intervalType: "month",
			//valueFormatString: "MMM-YY",
			labelAngle: -45
		},
		data: [
		{
			type: "candlestick",
			risingColor: "#F79B8E",
			dataPoints: arrMini[0]
			
		}
		]
	});
	chart.render()/*.then(function(){console.log("FINNNN")});*/
	
	var chart2 = new CanvasJS.Chart("chartContainer2",
	{
		title:{
			text: "Candle Stick chart using risingColor property"
		},
		zoomEnabled: true,
		axisY: {
			includeZero:false,
			title: "Prices",
			prefix: "$ "
		},
		axisX: {
			interval:2,
			intervalType: "month",
			//valueFormatString: "MMM-YY",
			labelAngle: -45
		},
		data: [
		{
			type: "candlestick",
			risingColor: "#F79B8E",
			dataPoints: arrMini[1]
			
		}/*, {        
			type: "line",
			lineThickness:3,
			showInLegend: true,           
			name: "SMA",
			//axisYType:"secondary",
			dataPoints: arrMini[3]
		}
		, {        
			type: "line",
			lineThickness:3,
			showInLegend: true,           
			name: "WMA",
			//axisYType:"secondary",
			dataPoints: arrMini[4]
		}, {        
			type: "line",
			lineThickness:3,
			showInLegend: true,           
			name: "Middle",
			//axisYType:"secondary",
			dataPoints: arrMini[5]
		}*/,
		{
			type: "candlestick",
			risingColor: "#f0f0f0",
			dataPoints: arrMini[0]
			
		}

		]
	});
	chart2.render();
 
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
  var data = [/*{
			type: "candlestick",
			risingColor: "#F79B8E",
			dataPoints: arrTodo
			
		}*/];
		
	var objLineas = {};
	for(var i = 1; i < arrTodo.length; i++){
		if(arrTodo[i][0].vo){
			arrTodo[0] = arrTodo[0].concat(arrTodo[i]);
		} else {
			switch(arrTodo[i][0].tipo){
				case 'Nube':
					arrTodo[1] = arrTodo[1].concat(arrTodo[i]);
				break;
				case 'Kinjou':
					arrTodo[2] = arrTodo[2].concat(arrTodo[i]);
				break;
				case 'Tenkan':
					arrTodo[3] = arrTodo[3].concat(arrTodo[i]);
				break;
				case 'Chinko':
					arrTodo[4] = arrTodo[4].concat(arrTodo[i]);
				break;
			}
			
			/*if(objLineas[arrTodo[i][0].tipo + arrTodo[i][0].y]){
				data[objLineas[arrTodo[i][0].tipo + arrTodo[i][0].y] - 1].dataPoints = data[objLineas[arrTodo[i][0].tipo + arrTodo[i][0].y] - 1].dataPoints.concat(arrTodo[i]);
					
				
			} else {
				
				data.push(
				{        
					type: "line",
					lineThickness:3,
					showInLegend: true,           
					name: "WMA",
					//axisYType:"secondary",
					dataPoints: arrTodo[i]
				});	
				objLineas[arrTodo[i][0].tipo + arrTodo[i][0].y] = data.length;
			}
			*/
		}
		/*data.push(
		{        
			type: "line",
			lineThickness:3,
			showInLegend: true,           
			name: "WMA",
			//axisYType:"secondary",
			dataPoints: arrTodo[i]
		});*/
	}
	
	data.push(
		{        
			type: "candlestick",
			risingColor: "#F79B8E",
			dataPoints: arrTodo[0]
		});
	data.push(
		{        
			type: "rangeSplineArea",
			//risingColor: "#F79B8E",
			dataPoints: arrTodo[1]
		});
	
	data.push(
		{        
			type: "line",
			lineThickness:3,
			showInLegend: true,           
			name: "Kinjou",
			//axisYType:"secondary",
			dataPoints: arrTodo[2]
		});

	data.push(
		{        
			type: "line",
			lineThickness:3,
			showInLegend: true,           
			name: "Tenkan",
			//axisYType:"secondary",
			dataPoints: arrTodo[3]
		});
	data.push(
		{        
			type: "line",
			lineThickness:3,
			showInLegend: true,           
			name: "Chinko",
			//axisYType:"secondary",
			dataPoints: arrTodo[4]
		});	
 /* for(var i = 0; i < arrNiveles.length; i++){
		data.push(
		{        
			type: "line",
			lineThickness:3,
			showInLegend: true,           
			name: "WMA",
			//axisYType:"secondary",
			dataPoints: arrNiveles[i]
		});
	}*/
	
	
  var chart = new CanvasJS.Chart("chartContainer",
	{
		title:{
			text: "Candle Stick chart using risingColor property"
		},
		zoomEnabled: true,
		axisY: {
			includeZero:false,
			title: "Prices",
			prefix: "$ "
		},
		axisX: {
			interval:2,
			intervalType: "month",
			//valueFormatString: "MMM-YY",
			labelAngle: -45
		},
		data: data
	});
	
	
	chart.render();
  
  
  
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
	var data = google.visualization.arrayToDataTable(arr[1], true);



	var options = {
	legend:'none'
	};


	var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));

	chart.draw(data, options);
}



