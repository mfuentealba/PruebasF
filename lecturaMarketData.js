var fs = require('fs');

const cluster = require('cluster');
var arr;







process.on('message', (msg) => {
	console.log('inicio Proceso');
	process.send({ cmd: 'inicio Proceso', data: process.pid });
	console.log(msg + ' ' + process.pid);
	
	//fs.readFile("FIX.4.4-TOMADOR_DE_ORDENES-ORDERROUTER.messages_20170809.log", 'utf8', function(err, data) {
	fs.readFile("C:/Users/mfuentealba/Downloads/EURUSD-2016-01/EURUSD-2016-01.csv", 'utf8', function(err, data) {
		console.log(err);
		arr = data.split("\n");
		for(let i in arr){
			console.log(JSON.stringify(arr[i].split(',')));
			break;
		}

		
		process.send({ cmd: 'fin proceso', data: process.pid });
		
	});


	
});
process.send({ cmd: process.pid });

