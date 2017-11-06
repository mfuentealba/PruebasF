var socket = io.connect('http://localhost:8888', { 'forceNew': true });
//<script src="clienteIO.js"></script>
socket.on('messages', function(data) {  
  console.log(data);
  render(data);
})


var arrTodo = [
//[
//{"x":1,"y":[1.37517,1.37592,1.37372,1.37495],"vo":{"open":1.37517,"close":1.37495,"low":1.37372,"high":1.37592,"id":1,date":"23:10","origen":"S","fecha":"2014.01.01","vol":764}},
[{"x":4025,"y":[1.37822,1.37874,1.37725,1.3776],"vo":{"open":1.37822,"close":1.3776,"low":1.37725,"high":1.37874,"id":4025,"date":"08:10","origen":"S","fecha":"2014.03.21","vol":991,"undefined":null}},{"x":4026,"y":[1.3776,1.37794,1.37689,1.37709],"vo":{"open":1.3776,"close":1.37709,"low":1.37689,"high":1.37794,"id":4026,"date":"08:30","origen":"S","fecha":"2014.03.21","vol":1463,"undefined":null}},{"x":4027,"y":[1.37705,1.37761,1.37654,1.37717],"vo":{"open":1.37705,"close":1.37717,"low":1.37654,"high":1.37761,"id":4027,"date":"08:50","origen":"S","fecha":"2014.03.21","vol":1465,"undefined":null}},{"x":4028,"y":[1.37716,1.37798,1.37679,1.37777],"vo":{"open":1.37716,"close":1.37777,"low":1.37679,"high":1.37798,"id":4028,"date":"09:10","origen":"S","fecha":"2014.03.21","vol":1233,"undefined":null}},{"x":4029,"y":[1.37777,1.37892,1.37772,1.37871],"vo":{"open":1.37777,"close":1.37871,"low":1.37772,"high":1.37892,"id":4029,"date":"09:30","origen":"S","fecha":"2014.03.21","vol":1298,"undefined":null}},{"x":4030,"y":[1.37871,1.37885,1.37828,1.37846],"vo":{"open":1.37871,"close":1.37846,"low":1.37828,"high":1.37885,"id":4030,"date":"09:50","origen":"S","fecha":"2014.03.21","vol":948,"undefined":null}},{"x":4031,"y":[1.37846,1.37949,1.37801,1.37942],"vo":{"open":1.37846,"close":1.37942,"low":1.37801,"high":1.37949,"id":4031,"date":"10:10","origen":"S","fecha":"2014.03.21","vol":1276,"undefined":null},"indexLabel":"I"},{"x":4032,"y":[1.37941,1.37997,1.37902,1.37909],"vo":{"open":1.37941,"close":1.37909,"low":1.37902,"high":1.37997,"id":4032,"date":"10:30","origen":"S","fecha":"2014.03.21","vol":1383,"undefined":null}},{"x":4033,"y":[1.37912,1.37969,1.37906,1.3796],"vo":{"open":1.37912,"close":1.3796,"low":1.37906,"high":1.37969,"id":4033,"date":"10:50","origen":"S","fecha":"2014.03.21","vol":923,"undefined":null}},{"x":4034,"y":[1.37957,1.38019,1.37922,1.37962],"vo":{"open":1.37957,"close":1.37962,"low":1.37922,"high":1.38019,"id":4034,"date":"11:10","origen":"S","fecha":"2014.03.21","vol":1453,"undefined":null}},{"x":4035,"y":[1.37961,1.37966,1.37928,1.37946],"vo":{"open":1.37961,"close":1.37946,"low":1.37928,"high":1.37966,"id":4035,"date":"11:30","origen":"S","fecha":"2014.03.21","vol":1004,"undefined":null}},{"x":4036,"y":[1.37946,1.38002,1.37865,1.37998],"vo":{"open":1.37946,"close":1.37998,"low":1.37865,"high":1.38002,"id":4036,"date":"11:50","origen":"S","fecha":"2014.03.21","vol":1664,"undefined":null}},{"x":4037,"y":[1.37998,1.37998,1.37908,1.37971],"vo":{"open":1.37998,"close":1.37971,"low":1.37908,"high":1.37998,"id":4037,"date":"12:10","origen":"S","fecha":"2014.03.21","vol":1162,"undefined":null}},{"x":4038,"y":[1.37972,1.38044,1.37947,1.37948],"vo":{"open":1.37972,"close":1.37948,"low":1.37947,"high":1.38044,"id":4038,"date":"12:30","origen":"S","fecha":"2014.03.21","vol":1275,"undefined":null}},{"x":4039,"y":[1.37947,1.37964,1.37931,1.37944],"vo":{"open":1.37947,"close":1.37944,"low":1.37931,"high":1.37964,"id":4039,"date":"12:50","origen":"S","fecha":"2014.03.21","vol":798,"undefined":null}},{"x":4040,"y":[1.37942,1.37971,1.37922,1.37955],"vo":{"open":1.37942,"close":1.37955,"low":1.37922,"high":1.37971,"id":4040,"date":"13:10","origen":"S","fecha":"2014.03.21","vol":666,"undefined":null}},{"x":4041,"y":[1.37954,1.37971,1.37757,1.3777],"vo":{"open":1.37954,"close":1.3777,"low":1.37757,"high":1.37971,"id":4041,"date":"13:30","origen":"S","fecha":"2014.03.21","vol":1339},"indexLabel":"F"}],
[{"x":4025,"y":[1.3783275,1.37791],"tipo":"Nube"},{"x":4026,"y":[1.3783075,1.37793],"tipo":"Nube"},{"x":4027,"y":[1.3782999999999999,1.377985],"tipo":"Nube"},{"x":4028,"y":[1.378295,1.377985],"tipo":"Nube"},{"x":4029,"y":[1.378295,1.377985],"tipo":"Nube"},{"x":4030,"y":[1.3781949999999998,1.377985],"tipo":"Nube"},{"x":4031,"y":[1.3781949999999998,1.3780000000000001],"tipo":"Nube"},{"x":4032,"y":[1.3780299999999999,1.3780000000000001],"tipo":"Nube"},{"x":4033,"y":[1.3781525000000001,1.3780000000000001],"tipo":"Nube"},{"x":4034,"y":[1.37824,1.3780000000000001],"tipo":"Nube"},{"x":4035,"y":[1.3785125,1.3780000000000001],"tipo":"Nube"},{"x":4036,"y":[1.3784925,1.3780000000000001],"tipo":"Nube"},{"x":4037,"y":[1.3784925,1.3780000000000001],"tipo":"Nube"},{"x":4038,"y":[1.37842,1.3780000000000001],"tipo":"Nube"},{"x":4039,"y":[1.3779875,1.3780000000000001],"tipo":"Nube"},{"x":4040,"y":[1.3777975,1.3780000000000001],"tipo":"Nube"}],
[{"x":4025,"y":1.37865,"tipo":"Tenkan"},{"x":4026,"y":1.378505,"tipo":"Tenkan"},{"x":4027,"y":1.37764,"tipo":"Tenkan"},{"x":4028,"y":1.3772600000000002,"tipo":"Tenkan"},{"x":4029,"y":1.3772600000000002,"tipo":"Tenkan"},{"x":4030,"y":1.3773849999999999,"tipo":"Tenkan"},{"x":4031,"y":1.378605,"tipo":"Tenkan"},{"x":4032,"y":1.3787500000000001,"tipo":"Tenkan"},{"x":4033,"y":1.3787500000000001,"tipo":"Tenkan"},{"x":4034,"y":1.379605,"tipo":"Tenkan"},{"x":4035,"y":1.3796249999999999,"tipo":"Tenkan"},{"x":4036,"y":1.37942,"tipo":"Tenkan"},{"x":4037,"y":1.379335,"tipo":"Tenkan"},{"x":4038,"y":1.379335,"tipo":"Tenkan"},{"x":4039,"y":1.37976,"tipo":"Tenkan"},{"x":4040,"y":1.37983,"tipo":"Tenkan"}],
[{"x":4025,"y":1.3783349999999999,"tipo":"Kinjou"},{"x":4026,"y":1.3783349999999999,"tipo":"Kinjou"},{"x":4027,"y":1.3783349999999999,"tipo":"Kinjou"},{"x":4028,"y":1.3783349999999999,"tipo":"Kinjou"},{"x":4029,"y":1.3783349999999999,"tipo":"Kinjou"},{"x":4030,"y":1.377825,"tipo":"Kinjou"},{"x":4031,"y":1.377825,"tipo":"Kinjou"},{"x":4032,"y":1.377825,"tipo":"Kinjou"},{"x":4033,"y":1.377825,"tipo":"Kinjou"},{"x":4034,"y":1.377825,"tipo":"Kinjou"},{"x":4035,"y":1.378365,"tipo":"Kinjou"},{"x":4036,"y":1.378365,"tipo":"Kinjou"},{"x":4037,"y":1.378365,"tipo":"Kinjou"},{"x":4038,"y":1.378365,"tipo":"Kinjou"},{"x":4039,"y":1.37849,"tipo":"Kinjou"},{"x":4040,"y":1.378955,"tipo":"Kinjou"}]
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



