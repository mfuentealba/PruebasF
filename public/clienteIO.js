var socket = io.connect('http://localhost:8888', { 'forceNew': true });
//<script src="clienteIO.js"></script>
socket.on('messages', function(data) {  
  console.log(data);
  render(data);
})


var arrTodo = [
{"x":1419,"y":[1.36679,1.36741,1.3638,1.3651],"vo":{"open":1.36679,"close":1.3651,"low":1.3638,"high":1.36741,"id":1419,"date":"19:50","origen":"S","fecha":"2014.01.29","vol":1297},"indexLabel":"V2"},
{"x":1420,"y":[1.3651,1.36659,1.36388,1.36511],"vo":{"open":1.3651,"close":1.36511,"low":1.36388,"high":1.36659,"id":1420,"date":"20:10","origen":"S","fecha":"2014.01.29","vol":1468}},
{"x":1421,"y":[1.36511,1.36572,1.36452,1.36553],"vo":{"open":1.36511,"close":1.36553,"low":1.36452,"high":1.36572,"id":1421,"date":"20:30","origen":"S","fecha":"2014.01.29","vol":1024}},
{"x":1422,"y":[1.36553,1.36667,1.3649,1.36526],"vo":{"open":1.36553,"close":1.36526,"low":1.3649,"high":1.36667,"id":1422,"date":"20:50","origen":"S","fecha":"2014.01.29","vol":1051}},
{"x":1423,"y":[1.36528,1.36656,1.36516,1.36617],"vo":{"open":1.36528,"close":1.36617,"low":1.36516,"high":1.36656,"id":1423,"date":"21:10","origen":"S","fecha":"2014.01.29","vol":974}},
{"x":1424,"y":[1.36617,1.36661,1.36516,1.36537],"vo":{"open":1.36617,"close":1.36537,"low":1.36516,"high":1.36661,"id":1424,"date":"21:30","origen":"S","fecha":"2014.01.29","vol":811}},
{"x":1425,"y":[1.36537,1.36563,1.36479,1.36551],"vo":{"open":1.36537,"close":1.36551,"low":1.36479,"high":1.36563,"id":1425,"date":"21:50","origen":"S","fecha":"2014.01.29","vol":592,"undefined":null}},
{"x":1426,"y":[1.36551,1.36642,1.36523,1.36616],"vo":{"open":1.36551,"close":1.36616,"low":1.36523,"high":1.36642,"id":1426,"date":"22:10","origen":"S","fecha":"2014.01.29","vol":516,"undefined":null}},
{"x":1427,"y":[1.36616,1.36631,1.36585,1.36623],"vo":{"open":1.36616,"close":1.36623,"low":1.36585,"high":1.36631,"id":1427,"date":"22:30","origen":"S","fecha":"2014.01.29","vol":490,"undefined":null}},
{"x":1428,"y":[1.36623,1.3665,1.36605,1.36621],"vo":{"open":1.36623,"close":1.36621,"low":1.36605,"high":1.3665,"id":1428,"date":"22:50","origen":"S","fecha":"2014.01.29","vol":380,"undefined":null}},
{"x":1429,"y":[1.36622,1.36652,1.36617,1.36629],"vo":{"open":1.36622,"close":1.36629,"low":1.36617,"high":1.36652,"id":1429,"date":"23:10","origen":"S","fecha":"2014.01.29","vol":153,"undefined":null}},
{"x":1430,"y":[1.36637,1.36652,1.36607,1.36609],"vo":{"open":1.36637,"close":1.36609,"low":1.36607,"high":1.36652,"id":1430,"date":"23:30","origen":"S","fecha":"2014.01.29","vol":133,"undefined":null}},
{"x":1431,"y":[1.36609,1.36615,1.36565,1.36587],"vo":{"open":1.36609,"close":1.36587,"low":1.36565,"high":1.36615,"id":1431,"date":"23:50","origen":"S","fecha":"2014.01.29","vol":348,"undefined":null}},
{"x":1432,"y":[1.36589,1.36642,1.36571,1.36581],"vo":{"open":1.36589,"close":1.36581,"low":1.36571,"high":1.36642,"id":1432,"date":"00:10","origen":"S","fecha":"2014.01.30","vol":299,"undefined":null}},
{"x":1433,"y":[1.36582,1.36602,1.36562,1.36587],"vo":{"open":1.36582,"close":1.36587,"low":1.36562,"high":1.36602,"id":1433,"date":"00:30","origen":"S","fecha":"2014.01.30","vol":221,"undefined":null}},
{"x":1434,"y":[1.36588,1.36597,1.36553,1.36588],"vo":{"open":1.36588,"close":1.36588,"low":1.36553,"high":1.36597,"id":1434,"date":"00:50","origen":"S","fecha":"2014.01.30","vol":252,"undefined":null}},
{"x":1435,"y":[1.36588,1.36622,1.36566,1.36586],"vo":{"open":1.36588,"close":1.36586,"low":1.36566,"high":1.36622,"id":1435,"date":"01:10","origen":"S","fecha":"2014.01.30","vol":342,"undefined":null}},
{"x":1436,"y":[1.36586,1.36616,1.36571,1.36586],"vo":{"open":1.36586,"close":1.36586,"low":1.36571,"high":1.36616,"id":1436,"date":"01:30","origen":"S","fecha":"2014.01.30","vol":479,"undefined":null}},
{"x":1437,"y":[1.36588,1.36607,1.36502,1.36514],"vo":{"open":1.36588,"close":1.36514,"low":1.36502,"high":1.36607,"id":1437,"date":"01:50","origen":"S","fecha":"2014.01.30","vol":567,"undefined":null}},
{"x":1438,"y":[1.36513,1.36562,1.36506,1.36523],"vo":{"open":1.36513,"close":1.36523,"low":1.36506,"high":1.36562,"id":1438,"date":"02:10","origen":"S","fecha":"2014.01.30","vol":334,"undefined":null}},
{"x":1439,"y":[1.36523,1.36557,1.36463,1.3655],"vo":{"open":1.36523,"close":1.3655,"low":1.36463,"high":1.36557,"id":1439,"date":"02:30","origen":"S","fecha":"2014.01.30","vol":484,"undefined":null}},
{"x":1440,"y":[1.36547,1.36557,1.36472,1.36497],"vo":{"open":1.36547,"close":1.36497,"low":1.36472,"high":1.36557,"id":1440,"date":"02:50","origen":"S","fecha":"2014.01.30","vol":513,"undefined":null}},
{"x":1441,"y":[1.36497,1.36509,1.36474,1.36505],"vo":{"open":1.36497,"close":1.36505,"low":1.36474,"high":1.36509,"id":1441,"date":"03:10","origen":"S","fecha":"2014.01.30","vol":383,"undefined":null}},
{"x":1442,"y":[1.36507,1.3654,1.36492,1.36509],"vo":{"open":1.36507,"close":1.36509,"low":1.36492,"high":1.3654,"id":1442,"date":"03:30","origen":"S","fecha":"2014.01.30","vol":424,"undefined":null}},
{"x":1443,"y":[1.3651,1.36537,1.36487,1.36514],"vo":{"open":1.3651,"close":1.36514,"low":1.36487,"high":1.36537,"id":1443,"date":"03:50","origen":"S","fecha":"2014.01.30","vol":478,"undefined":null}},
{"x":1444,"y":[1.36519,1.36551,1.36506,1.36546],"vo":{"open":1.36519,"close":1.36546,"low":1.36506,"high":1.36551,"id":1444,"date":"04:10","origen":"S","fecha":"2014.01.30","vol":296,"undefined":null}},
{"x":1445,"y":[1.36546,1.36557,1.3653,1.36532],"vo":{"open":1.36546,"close":1.36532,"low":1.3653,"high":1.36557,"id":1445,"date":"04:30","origen":"S","fecha":"2014.01.30","vol":319,"undefined":null}},
{"x":1446,"y":[1.36534,1.36535,1.36482,1.36519],"vo":{"open":1.36534,"close":1.36519,"low":1.36482,"high":1.36535,"id":1446,"date":"04:50","origen":"S","fecha":"2014.01.30","vol":533,"undefined":null}},
{"x":1447,"y":[1.36519,1.36529,1.36481,1.36511],"vo":{"open":1.36519,"close":1.36511,"low":1.36481,"high":1.36529,"id":1447,"date":"05:10","origen":"S","fecha":"2014.01.30","vol":443,"undefined":null}},
{"x":1448,"y":[1.36514,1.36524,1.36495,1.36496],"vo":{"open":1.36514,"close":1.36496,"low":1.36495,"high":1.36524,"id":1448,"date":"05:30","origen":"S","fecha":"2014.01.30","vol":303,"undefined":null}},
{"x":1449,"y":[1.36497,1.36498,1.36451,1.36466],"vo":{"open":1.36497,"close":1.36466,"low":1.36451,"high":1.36498,"id":1449,"date":"05:50","origen":"S","fecha":"2014.01.30","vol":365,"undefined":null}},
{"x":1450,"y":[1.36466,1.36505,1.36446,1.36455],"vo":{"open":1.36466,"close":1.36455,"low":1.36446,"high":1.36505,"id":1450,"date":"06:10","origen":"S","fecha":"2014.01.30","vol":344,"undefined":null}},
{"x":1451,"y":[1.36454,1.36489,1.36437,1.36442],"vo":{"open":1.36454,"close":1.36442,"low":1.36437,"high":1.36489,"id":1451,"date":"06:30","origen":"S","fecha":"2014.01.30","vol":325,"undefined":null}},
{"x":1452,"y":[1.36442,1.36468,1.36433,1.36464],"vo":{"open":1.36442,"close":1.36464,"low":1.36433,"high":1.36468,"id":1452,"date":"06:50","origen":"S","fecha":"2014.01.30","vol":422,"undefined":null}},
{"x":1453,"y":[1.36464,1.36492,1.36454,1.36489],"vo":{"open":1.36464,"close":1.36489,"low":1.36454,"high":1.36492,"id":1453,"date":"07:10","origen":"S","fecha":"2014.01.30","vol":290,"undefined":null}},
{"x":1454,"y":[1.36489,1.36522,1.36464,1.36507],"vo":{"open":1.36489,"close":1.36507,"low":1.36464,"high":1.36522,"id":1454,"date":"07:30","origen":"S","fecha":"2014.01.30","vol":325,"undefined":null}},
{"x":1455,"y":[1.36503,1.36566,1.36476,1.36489],"vo":{"open":1.36503,"close":1.36489,"low":1.36476,"high":1.36566,"id":1455,"date":"07:50","origen":"S","fecha":"2014.01.30","vol":424,"undefined":null}},
{"x":1456,"y":[1.3649,1.36497,1.36319,1.36319],"vo":{"open":1.3649,"close":1.36319,"low":1.36319,"high":1.36497,"id":1456,"date":"08:10","origen":"S","fecha":"2014.01.30","vol":694,"undefined":null}},
{"x":1457,"y":[1.36318,1.36332,1.36233,1.36235],"vo":{"open":1.36318,"close":1.36235,"low":1.36233,"high":1.36332,"id":1457,"date":"08:30","origen":"S","fecha":"2014.01.30","vol":862,"undefined":null}},
{"x":1458,"y":[1.36235,1.36279,1.36056,1.36095],"vo":{"open":1.36235,"close":1.36095,"low":1.36056,"high":1.36279,"id":1458,"date":"08:50","origen":"S","fecha":"2014.01.30","vol":1084,"undefined":null}},
{"x":1459,"y":[1.36095,1.36201,1.36094,1.3616],"vo":{"open":1.36095,"close":1.3616,"low":1.36094,"high":1.36201,"id":1459,"date":"09:10","origen":"S","fecha":"2014.01.30","vol":977,"undefined":null}},
{"x":1460,"y":[1.36158,1.36221,1.36093,1.36159],"vo":{"open":1.36158,"close":1.36159,"low":1.36093,"high":1.36221,"id":1460,"date":"09:30","origen":"S","fecha":"2014.01.30","vol":891,"undefined":null}},
{"x":1461,"y":[1.36159,1.36246,1.35986,1.36063],"vo":{"open":1.36159,"close":1.36063,"low":1.35986,"high":1.36246,"id":1461,"date":"09:50","origen":"S","fecha":"2014.01.30","vol":1218,"undefined":null},"indexLabel":"V2"},
];


var arrNiveles = [
[
{"x":1419,"y":1.3651},
{"x":1420,"y":1.3651533333333332},
{"x":1421,"y":1.3652066666666667},
{"x":1422,"y":1.36526},
{"x":1423,"y":1.3653133333333332},
{"x":1424,"y":1.3653666666666666},
{"x":1425,"y":1.3654199999999999},
{"x":1426,"y":1.365473333333333},
{"x":1427,"y":1.3655266666666666},
{"x":1428,"y":1.3655799999999998},
{"x":1429,"y":1.365633333333333},
{"x":1430,"y":1.3656866666666665},
{"x":1431,"y":1.3657399999999997},
{"x":1432,"y":1.365793333333333},
{"x":1433,"y":1.3658466666666664},
{"x":1434,"y":1.3658999999999997},
{"x":1435,"y":1.365953333333333},
{"x":1436,"y":1.3660066666666664},
{"x":1437,"y":1.3660599999999996},
{"x":1438,"y":1.3661133333333328},
{"x":1439,"y":1.3661666666666663},
{"x":1440,"y":1.3662199999999995},
{"x":1441,"y":1.3662733333333328},
{"x":1442,"y":1.3663266666666662},
{"x":1443,"y":1.3663799999999995},
{"x":1444,"y":1.3664333333333327},
{"x":1445,"y":1.3664866666666662},
{"x":1446,"y":1.3665399999999994},
{"x":1447,"y":1.3665933333333327},
{"x":1448,"y":1.3666466666666661},
{"x":1449,"y":1.3666999999999994},
{"x":1450,"y":1.3667533333333326},
{"x":1451,"y":1.366806666666666},
{"x":1452,"y":1.3668599999999993},
{"x":1453,"y":1.3669133333333325},
{"x":1454,"y":1.366966666666666},
{"x":1455,"y":1.3670199999999992},
{"x":1456,"y":1.3670733333333325},
{"x":1457,"y":1.367126666666666},
{"x":1458,"y":1.3671799999999992},
{"x":1459,"y":1.3672333333333324},
{"x":1460,"y":1.3672866666666659},
],

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
  var data = [{
			type: "candlestick",
			risingColor: "#F79B8E",
			dataPoints: arrTodo
			
		}];
  for(var i = 0; i < arrNiveles.length; i++){
		data.push(
		{        
			type: "line",
			lineThickness:3,
			showInLegend: true,           
			name: "WMA",
			//axisYType:"secondary",
			dataPoints: arrNiveles[i]
		});
	}
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



