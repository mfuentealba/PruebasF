var fs = require('fs');
var fs2 = require('fs');
var EventEmitter = require('events').EventEmitter;

const cluster = require('cluster');
var arr;


var arrVelaOperativa = [];
var arrVelaReferencia = [];
var arrVelaFuerza = [];

var vela;
var vela2;
var vela3;
var orden;
var cont = 0;

var ee = new EventEmitter();

ee.once('ini', fnInicial);
ee.on('0', fnVelaNueva);
ee.on('1', fnVelaNormal);
ee.on('2', fnVelaNormal);
ee.on('3', fnVelaNormal);
ee.on('4', fnVelaNormal);
ee.on('orden', fnAbrirOrden);
//ee.on('reset', fnRestarNuevaVela);


var arrOrdenes = [];

function fnAbrirOrden(vela2, close){
	
	if(vela2.open == vela2.low && (vela2.high - vela2.close) / (vela2.close - vela2.open) < 1 / 4){
	orden = {open: close[3], tipo: 'C', fecIni: close[1], ini: vela2.date};
		ee.removeAllListeners('orden');
		ee.on('orden', fnCerrarOrdenCompra);
		arrOrdenes.push(orden);
	} else if(vela2.open == vela2.high && (vela2.close - vela2.low) / (vela2.open - vela2.close) < 1 / 4){
		orden = {open: close[3], tipo: 'V', fecIni: close[1], ini: vela2.date};
		ee.removeAllListeners('orden');
		ee.on('orden', fnCerrarOrdenVenta);
		arrOrdenes.push(orden);
	}
	
}

function fnCerrarOrdenCompra(vela2, close){
	if(vela2.close - vela2.open < 0){
		orden.close = close[3];
		orden.fecFin = close[1];
		orden.fin = vela2.date;
		orden.total = ((close[3] - orden.open) * 100000) - 16;
		ee.removeAllListeners('orden');
		ee.on('orden', fnAbrirOrden);
	}
}

function fnCerrarOrdenVenta(vela2, close){
	if(vela2.close - vela2.open > 0){
		orden.close = close[3];
		orden.fecFin = close[1];
		orden.fin = vela2.date;
		orden.total = ((close[3] - orden.open) * -100000) - 16;
		ee.removeAllListeners('orden');
		ee.on('orden', fnAbrirOrden);
	}
}


function fnInicial(dato){
	dato[3] = Number(dato[3]);
	vela = {date: 1, open: dato[3], close: dato[3], low: dato[3], high: dato[3]};
	vela2 = {date: 1, open: dato[3], close: dato[3], low: dato[3], high: dato[3]};
	vela3 = {date: 1, open: dato[3], close: dato[3], low: dato[3], high: dato[3]};
	
	arrVelaOperativa.push(vela);
	arrVelaFuerza.push(vela2);
	arrVelaReferencia.push(vela3);
	
}


function fnVelaNueva(dato){
	//console.log("fnVelaNueva");

	ee.emit('orden', vela2, dato);

	dato[3] = Number(dato[3]);

	vela = {open: dato[3], close: dato[3], low: dato[3], high: dato[3]};

	vela2 = {open: (vela2.open + vela2.close) / 2, close: (vela2.open + vela2.close) / 2, low: (vela2.open + vela2.close) / 2, high: (vela2.open + vela2.close) / 2};
	//console.log(vela);
	console.log(vela2);
	arrVelaFuerza.push(vela2)
	arrVelaOperativa.push(vela);
	vela.date = arrVelaFuerza.length;
	vela2.date = arrVelaOperativa.length;
	cont++;
	if(cont == 4){
		cont = 0;
		vela3 = {open: dato[3], close: dato[3], low: dato[3], high: dato[3]};
		arrVelaReferencia.push(vela3);
		vela3.date = arrVelaReferencia.length;
		//break;
	}
	ee.removeListener('0', fnVelaNueva);
	ee.on('0', fnVelaNormal2);
}

function fnVelaNormal2(dato){
	//console.log("fnVelaNormal2");
	dato[3] = Number(dato[3]);
	vela.close = dato[3];
	vela3.close = dato[3];
	vela2.close = (dato[3] + vela2.open + vela2.low + vela2.high) / 4;
	if(dato[3] > vela.high){
		vela.high = dato[3];
		
	} else {
		if(dato[3] < vela.low){
			vela.low = dato[3];
			
		}
	}
	if(vela2.close > vela2.high){
		
		vela2.high = vela2.close;
	} else {
		if(vela2.close < vela2.low){
			
			vela2.low = vela2.close;
		}
	}
	if(dato[3] > vela3.high){
		
		vela3.high = dato[3];
	} else {
		if(dato[3] < vela3.low){
			vela3.low = dato[3];
			
		}
	}
}

function fnVelaNormal(dato){
	//console.log("fnVelaNormal");
	ee.removeAllListeners('0');
	ee.on('0', fnVelaNueva);
	dato[3] = Number(dato[3]);
	vela.close = dato[3];
	vela3.close = dato[3];
	vela2.close = (dato[3] + vela2.open + vela2.low + vela2.high) / 4;
	if(dato[3] > vela.high){
		vela.high = dato[3];
		
	} else {
		if(dato[3] < vela.low){
			vela.low = dato[3];
			
		}
	}
	if(vela2.close > vela2.high){
		
		vela2.high = vela2.close;
	} else {
		if(vela2.close < vela2.low){
			
			vela2.low = vela2.close;
		}
	}
	if(dato[3] > vela3.high){
		
		vela3.high = dato[3];
	} else {
		if(dato[3] < vela3.low){
			vela3.low = dato[3];
			
		}
	}
}






process.on('message', (msg) => {
	console.log('inicio Proceso');
	process.send({ cmd: 'inicio Proceso', data: process.pid });
	console.log(msg + ' ' + process.pid);
	
	//fs.readFile("FIX.4.4-TOMADOR_DE_ORDENES-ORDERROUTER.messages_20170809.log", 'utf8', function(err, data) {
	fs.readFile("./marketdata/EURUSD-2016-01.csv", 'utf8', function(err, data) {
		//console.log(err);
		arr = data.split("\n");
		
		var cont = 0;
		ee.emit('ini', arr[0].split(','));
		//for(let i in arr){
		for(let i = 0; i < /*100000*/arr.length/4 - 1; i++){	
			
			//console.log(JSON.stringify(arr[i].split(',')));
			var dato = arr[i].split(',');
			try{
				ee.emit(dato[1][13] % 5, dato);
			} catch(e){
				console.log(JSON.stringify(arr[i].split(',')));
				//break;
			}
			//break;
						
		}
		var total = 0;
		var totalPos = 0;
		var totalNeg = 0;
		for(let i in arrOrdenes){
			fs2.appendFileSync('./querysReconstruccion/ordenes.txt', JSON.stringify(arrOrdenes[i]) + "\n", (err) => {
				if (err) throw err;
					console.log('The "data to append" was appended to file!');
				});
			try{
				//total += Math.abs(arrOrdenes[i]['total']) > 1 ? arrOrdenes[i]['total'] : 0;
				total += arrOrdenes[i]['total'];
				if(arrOrdenes[i]['total'] > 0){
					totalPos += arrOrdenes[i]['total'];
				} else {
					totalNeg += arrOrdenes[i]['total'];
				}
			} catch(e){
				
			}	
			
		}
		fs2.appendFileSync('./querysReconstruccion/ordenes.txt', "TOTAL: " + total +  "\n" +  "TOTAL: " + totalPos +  "\n" +  "TOTAL: " + totalNeg +  "\n", (err) => {
				if (err) throw err;
					console.log('The "data to append" was appended to file!');
				});
		
		process.send({ cmd: 'fin proceso', data: process.pid });
		process.send({ cmd: 'enviarMkdt', data: [arrVelaFuerza, arrVelaOperativa, arrVelaReferencia] });
		
	});


	
});
process.send({ cmd: process.pid });

