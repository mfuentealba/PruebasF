var socket = io.connect('http://localhost:8888', { 'forceNew': true });
//<script src="clienteIO.js"></script>
socket.on('messages', function(data) {  
  console.log(data);
  render(data);
})


var arrTodo = [

{"x":1,"y":[1.37517,1.37592,1.37372,1.37495],"vo":{"open":1.37517,"close":1.37495,"low":1.37372,"high":1.37592,"id":1,"date":"23:10","origen":"S","fecha":"2014.01.01","vol":764}},
{"x":2,"y":[1.37495,1.37569,1.37493,1.37536],"vo":{"open":1.37495,"close":1.37536,"low":1.37493,"high":1.37569,"id":2,"date":"23:30","origen":"S","fecha":"2014.01.01","vol":858}},
{"x":3,"y":[1.37536,1.37687,1.37511,1.37677],"vo":{"open":1.37536,"close":1.37677,"low":1.37511,"high":1.37687,"id":3,"date":"23:50","origen":"S","fecha":"2014.01.01","vol":1265}},
{"x":4,"y":[1.37677,1.3773,1.37649,1.3765],"vo":{"open":1.37677,"close":1.3765,"low":1.37649,"high":1.3773,"id":4,"date":"00:10","origen":"S","fecha":"2014.01.02","vol":714}},
{"x":5,"y":[1.3765,1.37708,1.37626,1.37636],"vo":{"open":1.3765,"close":1.37636,"low":1.37626,"high":1.37708,"id":5,"date":"00:30","origen":"S","fecha":"2014.01.02","vol":1049}},
{"x":6,"y":[1.37636,1.37699,1.37614,1.37662],"vo":{"open":1.37636,"close":1.37662,"low":1.37614,"high":1.37699,"id":6,"date":"00:50","origen":"S","fecha":"2014.01.02","vol":970}},
{"x":7,"y":[1.37662,1.37664,1.37609,1.37615],"vo":{"open":1.37662,"close":1.37615,"low":1.37609,"high":1.37664,"id":7,"date":"01:10","origen":"S","fecha":"2014.01.02","vol":709}},
{"x":8,"y":[1.37611,1.37623,1.37582,1.37623],"vo":{"open":1.37611,"close":1.37623,"low":1.37582,"high":1.37623,"id":8,"date":"01:30","origen":"S","fecha":"2014.01.02","vol":527}},
{"x":9,"y":[1.3762,1.37652,1.37578,1.37603],"vo":{"open":1.3762,"close":1.37603,"low":1.37578,"high":1.37652,"id":9,"date":"01:50","origen":"S","fecha":"2014.01.02","vol":666}},
{"x":10,"y":[1.37602,1.37602,1.37508,1.37514],"vo":{"open":1.37602,"close":1.37514,"low":1.37508,"high":1.37602,"id":10,"date":"02:10","origen":"S","fecha":"2014.01.02","vol":552}},
{"x":11,"y":[1.37517,1.37662,1.37504,1.3763],"vo":{"open":1.37517,"close":1.3763,"low":1.37504,"high":1.37662,"id":11,"date":"02:30","origen":"S","fecha":"2014.01.02","vol":1338}},
{"x":12,"y":[1.37635,1.3765,1.37596,1.37646],"vo":{"open":1.37635,"close":1.37646,"low":1.37596,"high":1.3765,"id":12,"date":"02:50","origen":"S","fecha":"2014.01.02","vol":917}},
{"x":13,"y":[1.37644,1.37676,1.37625,1.37644],"vo":{"open":1.37644,"close":1.37644,"low":1.37625,"high":1.37676,"id":13,"date":"03:10","origen":"S","fecha":"2014.01.02","vol":681}},
{"x":14,"y":[1.37644,1.3767,1.37637,1.3766],"vo":{"open":1.37644,"close":1.3766,"low":1.37637,"high":1.3767,"id":14,"date":"03:30","origen":"S","fecha":"2014.01.02","vol":690}},
{"x":15,"y":[1.37664,1.37677,1.37642,1.37676],"vo":{"open":1.37664,"close":1.37676,"low":1.37642,"high":1.37677,"id":15,"date":"03:50","origen":"S","fecha":"2014.01.02","vol":676}},
{"x":16,"y":[1.37677,1.37749,1.37662,1.3767],"vo":{"open":1.37677,"close":1.3767,"low":1.37662,"high":1.37749,"id":16,"date":"04:10","origen":"S","fecha":"2014.01.02","vol":857}},
{"x":17,"y":[1.3767,1.37678,1.37633,1.37636],"vo":{"open":1.3767,"close":1.37636,"low":1.37633,"high":1.37678,"id":17,"date":"04:30","origen":"S","fecha":"2014.01.02","vol":461}},
{"x":18,"y":[1.37637,1.3767,1.376,1.37609],"vo":{"open":1.37637,"close":1.37609,"low":1.376,"high":1.3767,"id":18,"date":"04:51","origen":"S","fecha":"2014.01.02","vol":481}},
{"x":19,"y":[1.3761,1.37612,1.37524,1.37534],"vo":{"open":1.3761,"close":1.37534,"low":1.37524,"high":1.37612,"id":19,"date":"05:10","origen":"S","fecha":"2014.01.02","vol":656}},
{"x":20,"y":[1.37532,1.37551,1.3747,1.37474],"vo":{"open":1.37532,"close":1.37474,"low":1.3747,"high":1.37551,"id":20,"date":"05:30","origen":"S","fecha":"2014.01.02","vol":981}},
{"x":21,"y":[1.3747,1.37476,1.37441,1.37465],"vo":{"open":1.3747,"close":1.37465,"low":1.37441,"high":1.37476,"id":21,"date":"05:50","origen":"S","fecha":"2014.01.02","vol":900}},
{"x":22,"y":[1.37466,1.37495,1.37465,1.37494],"vo":{"open":1.37466,"close":1.37494,"low":1.37465,"high":1.37495,"id":22,"date":"06:10","origen":"S","fecha":"2014.01.02","vol":426}},
{"x":23,"y":[1.37494,1.37538,1.37485,1.37537],"vo":{"open":1.37494,"close":1.37537,"low":1.37485,"high":1.37538,"id":23,"date":"06:30","origen":"S","fecha":"2014.01.02","vol":1510}},
{"x":24,"y":[1.37543,1.37583,1.37532,1.37567],"vo":{"open":1.37543,"close":1.37567,"low":1.37532,"high":1.37583,"id":24,"date":"06:50","origen":"S","fecha":"2014.01.02","vol":1275}},
{"x":25,"y":[1.37568,1.3758,1.37531,1.37571],"vo":{"open":1.37568,"close":1.37571,"low":1.37531,"high":1.3758,"id":25,"date":"07:10","origen":"S","fecha":"2014.01.02","vol":551}},
{"x":26,"y":[1.37568,1.37571,1.37468,1.37494],"vo":{"open":1.37568,"close":1.37494,"low":1.37468,"high":1.37571,"id":26,"date":"07:30","origen":"S","fecha":"2014.01.02","vol":663}},
{"x":27,"y":[1.37493,1.37545,1.3745,1.37452],"vo":{"open":1.37493,"close":1.37452,"low":1.3745,"high":1.37545,"id":27,"date":"07:50","origen":"S","fecha":"2014.01.02","vol":843}},
{"x":28,"y":[1.37453,1.37492,1.37421,1.37479],"vo":{"open":1.37453,"close":1.37479,"low":1.37421,"high":1.37492,"id":28,"date":"08:10","origen":"S","fecha":"2014.01.02","vol":535}},
{"x":29,"y":[1.37484,1.37485,1.37323,1.37338],"vo":{"open":1.37484,"close":1.37338,"low":1.37323,"high":1.37485,"id":29,"date":"08:30","origen":"S","fecha":"2014.01.02","vol":831},"indexLabel":"V2"},
{"x":29,"y":[1.37484,1.37485,1.37323,1.37338],"vo":{"open":1.37484,"close":1.37338,"low":1.37323,"high":1.37485,"id":29,"date":"08:30","origen":"S","fecha":"2014.01.02","vol":831},"indexLabel":"V2"},
{"x":30,"y":[1.37338,1.37342,1.37195,1.37241],"vo":{"open":1.37338,"close":1.37241,"low":1.37195,"high":1.37342,"id":30,"date":"08:50","origen":"S","fecha":"2014.01.02","vol":988}},
{"x":31,"y":[1.37243,1.37264,1.37159,1.37184],"vo":{"open":1.37243,"close":1.37184,"low":1.37159,"high":1.37264,"id":31,"date":"09:10","origen":"S","fecha":"2014.01.02","vol":1099}},
{"x":32,"y":[1.37184,1.37403,1.37177,1.3731],"vo":{"open":1.37184,"close":1.3731,"low":1.37177,"high":1.37403,"id":32,"date":"09:30","origen":"S","fecha":"2014.01.02","vol":972},"indexLabel":"C2"},
{"x":32,"y":[1.37184,1.37403,1.37177,1.3731],"vo":{"open":1.37184,"close":1.3731,"low":1.37177,"high":1.37403,"id":32,"date":"09:30","origen":"S","fecha":"2014.01.02","vol":972},"indexLabel":"C2"},
{"x":33,"y":[1.3731,1.37369,1.37231,1.3734],"vo":{"open":1.3731,"close":1.3734,"low":1.37231,"high":1.37369,"id":33,"date":"09:50","origen":"S","fecha":"2014.01.02","vol":1003}},
{"x":34,"y":[1.37341,1.37358,1.37226,1.37277],"vo":{"open":1.37341,"close":1.37277,"low":1.37226,"high":1.37358,"id":34,"date":"10:10","origen":"S","fecha":"2014.01.02","vol":935}},
{"x":35,"y":[1.37274,1.37304,1.37224,1.37303],"vo":{"open":1.37274,"close":1.37303,"low":1.37224,"high":1.37304,"id":35,"date":"10:30","origen":"S","fecha":"2014.01.02","vol":935}},
{"x":36,"y":[1.37299,1.3742,1.37271,1.37292],"vo":{"open":1.37299,"close":1.37292,"low":1.37271,"high":1.3742,"id":36,"date":"10:50","origen":"S","fecha":"2014.01.02","vol":1031}},
{"x":37,"y":[1.37292,1.37293,1.372,1.37225],"vo":{"open":1.37292,"close":1.37225,"low":1.372,"high":1.37293,"id":37,"date":"11:10","origen":"S","fecha":"2014.01.02","vol":822}},
{"x":38,"y":[1.37224,1.37279,1.37203,1.37279],"vo":{"open":1.37224,"close":1.37279,"low":1.37203,"high":1.37279,"id":38,"date":"11:30","origen":"S","fecha":"2014.01.02","vol":797}},
{"x":39,"y":[1.37279,1.37286,1.37012,1.37037],"vo":{"open":1.37279,"close":1.37037,"low":1.37012,"high":1.37286,"id":39,"date":"11:50","origen":"S","fecha":"2014.01.02","vol":1168},"indexLabel":"V2"},

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



