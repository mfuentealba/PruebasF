var fs = require('fs');
var secNum = [];
var objSec = {};
var cont = 1;

var request = require('request');
var EventEmitter = require('events').EventEmitter;

var ee = new EventEmitter();
ee.on("exec", fnProcesa);

for(var i = 0; i < 10; i++){	
	secNum.push("0" + i);
	objSec["0" + i] = i - 1;
}

for(var i = 10; i < 60; i++){	
	secNum.push("" + i);
	objSec["" + i] = i - 1;
}

function fnRecepcion(err,httpResponse,body){
	
	console.log(body);
	body = JSON.parse(body)
	cont++;
	if(Number(body.cta) > 0){
		ee.emit('exec', cont);
	}
	
}

function fnProcesa(i){
	if(cont == arr.length){
		return;
	}
	var dato = arr[i - 1].split(',');
	var cierre = arr[i].split(',')[2];
	//var arrFecha = dato[0].split(".");	
	var sw = true;
	var objReq = '{"open": "' + dato[2] + '", "close": "' + dato[5] + '", "high": "' + dato[3] + '", "low": "' + dato[4] + '", "spread": "' + 0.00015 + '", "opt": "S", "date": "' + (/*dato[0] + ',' + */dato[1]) + '", "fecha": "' + (dato[0]) + '", "vol": "' + Number(dato[6]) + '"}';
	
	request.post({url: 'http://localhost:9292', form: objReq}, fnRecepcion);
	
}

//fs.readFile("./marketdata/USDJPY1_2000_2005.csv", 'utf8', function(err, data) {
fs.readFile("./marketdata/EURUSD1.csv", 'utf8', function(err, data) {
//fs.readFile("./marketdata/DAT_MT_GBPUSD_M1_2016.csv", 'utf8', function(err, data) {
	if(err){
		console.log(err);
		return;
	}
	
	arr = data.split("\n");
	
	
	ee.emit('exec', cont);
});		