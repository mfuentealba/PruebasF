var fs = require('fs');
const cluster = require('cluster');
var arr;
const tagsFixs = require('./resources/fixtagnums.js');
const utilFix = require('./fixutils.js');
var EventEmitter = require('events').EventEmitter;


function fnExecRpt(data){
	console.log(data);
	process.send({ cmd: 'fix', data: data });
}



var ee = new EventEmitter();

ee.on('8', fnExecRpt);
ee.on('3', fnExecRpt);
ee.on('9', fnExecRpt);


process.on('message', (msg) => {
		
	console.log(msg + ' ' + process.pid);
	fs.readFile("FIX.4.4-OMS-ORDERROUTER.messages_20170721.log", 'utf8', function(err, data) {
		arr = data.split("\n");
		for(let i in arr){
			/*var h = arr[i][arr[i].length - 1];//[arr[i].length - 1] + '';//arr[i].substring(arr[i].length - 1, 1);
			var aux = arr[i].split(" ");
			var fix = [aux[0],...aux[1].split(h)];*/
			h = utilFix.convertToMap(arr[i]);
			ee.emit(h['35'], h);
			//var fix = arr[i].split(h);
			/*if(h['35'] != 'A'){
				process.send({ cmd: 'fix', data: h });	
			}*/
			
			/*console.log(h);
			console.log('DATO: ' + fix[1]);*/
			
			//break;
		}
		
		
	});


	/*fs.watch("FIX.4.4-TOMADOR_DE_ORDENES-ORDERROUTER.messages_20170804.log", { encoding: 'utf8' }, (eventType, filename) => {
	  if (filename) {
		console.log(eventType);
		
	  }
	});*/
	
});
process.send({ cmd: process.pid });

