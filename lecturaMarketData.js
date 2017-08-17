var fs = require('fs');
var fs2 = require('fs');
var EventEmitter = require('events').EventEmitter;

const cluster = require('cluster');
var arr;


var arrVelaOperativa = [];
var arrVelaReferencia = [];
var arrVelaFuerza = [];
var arrVelaOperativa2 = [];
var arrVelaReferencia2 = [];
var arrVelaFuerza2 = [];
//var arrMedia14 = [];
var arrCalculoMedia14 = [];
var calculoMedia14 = 0;
var contadorMedia14 = 1;



var vela;
var vela2;
var vela3;
var orden;
var cont = 0;

var ee = new EventEmitter();
var eMedia = new EventEmitter();



ee.once('ini', fnInicial);
ee.on('0', fnVelaNueva);
ee.on('1', fnVelaNormal);
ee.on('2', fnVelaNormal);
ee.on('3', fnVelaNormal);
ee.on('4', fnVelaNormal);
eMedia.on('14', fnCalculaMedia);
ee.on('orden', fnAbrirOrden);
ee.on('ordenMedia', fnAbrirOrdenMedia);
//ee.on('reset', fnRestarNuevaVela);


function fnCalculaMedia(dato){
	
	
	
	contadorMedia14--;
	calculoMedia14 -= arrVelaOperativa[arrVelaOperativa.length - 14]['close'] / 14;
	ee.emit('ordenMedia', dato);
	console.log(calculoMedia14);
	
}


var arrOrdenes = [];


function fnAbrirOrdenMedia(){
	
	if(vela.close > calculoMedia14 && vela.open < calculoMedia14){
		orden = {open: close[3], tipo: 'C', fecIni: close[1], ini: vela2.date};
		ee.removeAllListeners('orden');
		ee.on('orden', fnCerrarOrdenCompraMedia);
		arrOrdenes.push(orden);
	} else if(vela.close < calculoMedia14 && vela.open > calculoMedia14){
		orden = {open: close[3], tipo: 'V', fecIni: close[1], ini: vela2.date};
		ee.removeAllListeners('orden');
		ee.on('orden', fnCerrarOrdenVentaMedia);
		arrOrdenes.push(orden);
	}
	
}



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
	calculoMedia14 = dato[3] / 14;
	arrVelaOperativa.push(vela);
	arrVelaFuerza.push(vela2);
	arrVelaReferencia.push(vela3);
	
}


function fnVelaNueva(dato){
	//console.log("fnVelaNueva");
	contadorMedia14++;
	//console.log(contadorMedia14);
	calculoMedia14 += dato[3] / 14;
	ee.emit('orden', vela2, dato);
	/*console.log(calculoMedia14);
	console.log(contadorMedia14);*/
	
	
	//eMedia.emit(contadorMedia14 + '', dato);
	
	//calculoMedia14 -= arrVelaOperativa[arrVelaOperativa.length - 15]['close'] / 14;
	
	
	dato[3] = Number(dato[3]);
	//arrVelaOperativa2.push([vela.date, vela.low, vela.open, vela.close, vela.high]);
	arrVelaOperativa2.push({x: vela.date, y:[vela.open, vela.high, vela.low, vela.close]});
	//arrVelaFuerza2.push([vela2.date, vela2.low, vela2.open, vela2.close, vela2.high]);
	arrVelaFuerza2.push({x: vela2.date, y: [vela2.open, vela2.high, vela2.low, vela2.close]});
	
	vela = {open: dato[3], close: dato[3], low: dato[3], high: dato[3]};
	
	vela2 = {open: (vela2.open + vela2.close) / 2, close: (vela2.open + vela2.close) / 2, low: (vela2.open + vela2.close) / 2, high: (vela2.open + vela2.close) / 2};
	
	//console.log(vela);
	//console.log(vela2);
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
}//2134068

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
		arrVelaFuerza = [];
		arrVelaFuerza2 = [];
		arrVelaOperativa = [];
		arrVelaOperativa2 = [];
		arrVelaReferencia = [];
		arrVelaReferencia2 = [];
		var cont = 0;
		ee.emit('ini', arr[0].split(','));
		//for(let i in arr){
		for(let i = 0; i < arr.length - 1; i++){	
		/*var i = -1;
		while(arrVelaOperativa.length < 15){
			console.log(arrVelaOperativa.length);
			i++;*/
			//console.log(JSON.stringify(arr[i].split(',')));


			var dato = arr[i].split(',');
			try{
				ee.emit(dato[1][13] % 5, dato);
			} catch(e){
				//console.log(JSON.stringify(arr[i].split(',')));
				//break;
			}
			//break;
						
		}
		var total = 0;
		var totalPos = 0;
		var totalNeg = 0;
		for(let i in arrOrdenes){//8624190
			fs2.appendFileSync('./querysReconstruccion/ordenes.txt', JSON.stringify(arrOrdenes[i]) + "\n", (err) => {
				if (err) throw err;
					console.log('The "data to append" was appended to file!');
				});
			try{
				//total += Math.abs(arrOrdenes[i]['total']) > 1 ? arrOrdenes[i]['total'] : 0;
				total += arrOrdenes[i]['total'] < -50 ? -50 : arrOrdenes[i]['total'];
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
		process.send({ cmd: 'enviarMkdt', data: [arrVelaFuerza2, arrVelaOperativa2, arrVelaReferencia] });
		
	});


	
});
process.send({ cmd: process.pid });

