var fs = require('fs');
var fs2 = require('fs');
var arrFiles = ["./marketdata/DAT_NT_EURUSD_M1_2000.csv", "./marketdata/DAT_NT_EURUSD_M1_2001.csv", "./marketdata/DAT_NT_EURUSD_M1_2002.csv", "./marketdata/DAT_NT_EURUSD_M1_2003.csv", "./marketdata/DAT_NT_EURUSD_M1_2004.csv", "./marketdata/DAT_NT_EURUSD_M1_2005.csv", "./marketdata/DAT_NT_EURUSD_M1_2006.csv", "./marketdata/DAT_NT_EURUSD_M1_2007.csv", "./marketdata/DAT_NT_EURUSD_M1_2008.csv", "./marketdata/DAT_NT_EURUSD_M1_2009.csv", "./marketdata/DAT_NT_EURUSD_M1_2010.csv", "./marketdata/DAT_NT_EURUSD_M1_2011.csv", "./marketdata/DAT_NT_EURUSD_M1_2012.csv"/*, "./marketdata/DAT_NT_EURUSD_M1_2013.csv", "./marketdata/DAT_NT_EURUSD_M1_2014.csv", "./marketdata/DAT_NT_EURUSD_M1_2015.csv", "./marketdata/DAT_NT_EURUSD_M1_2016.csv"*/];	
function fnProcesaArchivos(cont){
	if(cont == arrFiles.length){
		return;
	}
	fs.readFile(arrFiles[cont], 'utf8', function(err, data) {
		if(err){
			console.log(err);
			return;
		}
		var arr = data.split("\n");
		for(let i = 0; i < arr.length/1 - 1; i++){	
			var dato = arr[i];
			fs2.appendFileSync('./marketdata/DAT_NT_EURUSD_M1_TOTAL.csv', dato + "\n", (err) => {
				if (err) throw err;
					//console.log('The "data to append" was appended to file!');
				});
			
		}
		console.log("FIN ARCHIVO " + arrFiles[cont]);
		cont++;
		fnProcesaArchivos(cont);
	});
}
process.on('message', (msg) => {
	//console.log('inicio Proceso');
	process.send({ cmd: 'inicio Proceso', data: process.pid });
	//console.log(msg + ' ' + process.pid);
	
	//fs.readFile("FIX.4.4-TOMADOR_DE_ORDENES-ORDERROUTER.messages_20170809.log", 'utf8', function(err, data) {
	
	var cont = 0;
	fnProcesaArchivos(cont);
	process.send({ cmd: 'fin proceso', data: process.pid });
	//console.log("FIN");	
});
process.send({ cmd: process.pid });

