var fs = require('fs');
var fs2 = require('fs');
var EventEmitter = require('events').EventEmitter;

const cluster = require('cluster');
var arr;
var mediaUsada = 40;
var takeProfit = 350;

var arrVelaOperativa = [];
var arrVelaReferencia = [];
var arrVelaFuerza = [];
var arrVelaOperativa2 = [];
var arrVelaReferencia2 = [];
var arrVelaFuerza2 = [];
var arrMedia14 = [];

for(var a = 0; a < mediaUsada; a++){
	arrMedia14.push({x: (a + 1), y:1.08522});
	
}


var arrCalculoMedia14 = [];
var arrMarcaOrdenes = [];
var calculoMedia14 = 0;
var contadorMedia14 = 1;



var vela;
var velaOperativa;
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
	
	
	//console.log('fnCalculaMedia :' + arrVelaOperativa[arrVelaOperativa.length - 13]['close']);
	contadorMedia14--;
	calculoMedia14 -= arrVelaOperativa[arrVelaOperativa.length - mediaUsada - 1]['close'] / mediaUsada;
	arrMedia14.push({x: arrVelaOperativa[arrVelaOperativa.length - 1]['date'], y: calculoMedia14});
	ee.emit('ordenMedia', dato);
	//console.log(calculoMedia14);
	
}


var arrOrdenes = [];


function fnAbrirOrdenMedia(close){
	//console.log(vela.close + ' - ' + calculoMedia14  + ' - ' +  vela.open);
	
	
	if(vela.close > calculoMedia14 && vela.open < calculoMedia14){
		console.log('OPCION COMPRA ' + vela.date);
		if(orden != null && orden.tipo == 'V'){
			orden.close = close[3];
			orden.fecFin = close[1];
			orden.fin = vela.date;
			orden.obs = "señal";
			orden.total = ((close[3] - orden.open) * -100000) - 16;	
			orden = null;
			console.log('CERRANDO.... ' + vela.date);
			//console.log(arrOrdenes);
		}
		if(orden == null && ((vela.close == vela.high) || ((arrCalculoMedia14[arrCalculoMedia14.length - 1] - arrCalculoMedia14[arrCalculoMedia14.length - 2]) * 100000 > 5))
			&& vela2.open == vela2.low && 0 < (vela2.high - vela2.close) / (vela2.close - vela2.open) < 1 / 4){
			
			//if(orden.date - close[1] > 3){
				console.log((arrCalculoMedia14[arrCalculoMedia14.length - 1] - arrCalculoMedia14[arrCalculoMedia14.length - 2]) * 100000);
				orden = {open: close[3], tipo: 'C', fecIni: close[1], ini: vela.date, stopLoss: -166};
				orden['INDICADOR_MEDIA'] = (arrCalculoMedia14[arrCalculoMedia14.length - 1] - arrCalculoMedia14[arrCalculoMedia14.length - 2]) * 100000;
				arrOrdenes.push(orden);
				velaOperativa.markerType = "circle";
				velaOperativa.markerSize = 1000;
				velaOperativa.markerColor = "brown";
				velaOperativa.indexLabel = "C";
				console.log(vela);
				console.log(velaOperativa);
				//arrMarcaOrdenes.push({x: close[1], y: close[3]});
			//}	
		}
		
			
		
		
	} else if(vela.close < calculoMedia14 && vela.open > calculoMedia14){
		console.log('OPCION VENTA ' + vela.date);
		if(orden != null && orden.tipo == 'C'){
			//if(orden.date - close[1] > 3){
				orden.close = close[3];
				orden.fecFin = close[1];
				orden.fin = vela.date;
				orden.obs = "señal";
				orden.total = ((close[3] - orden.open) * 100000) - 16;	
				orden = null;
				console.log('CERRANDO.... ' + vela.date);
				//console.log(arrOrdenes);
			//}			
		}
		if(orden == null && ((vela.close == vela.low) || ((arrCalculoMedia14[arrCalculoMedia14.length - 1] - arrCalculoMedia14[arrCalculoMedia14.length - 2]) * 100000 < -5))
			&& vela2.open == vela2.high && 0 < (vela2.close - vela2.low) / (vela2.open - vela2.close) < 1 / 4){
			console.log((arrCalculoMedia14[arrCalculoMedia14.length - 1] - arrCalculoMedia14[arrCalculoMedia14.length - 2]) * 100000);
			orden = {open: close[3], tipo: 'V', fecIni: close[1], ini: vela.date, stopLoss: -166};
			orden['INDICADOR_MEDIA'] = (arrCalculoMedia14[arrCalculoMedia14.length - 1] - arrCalculoMedia14[arrCalculoMedia14.length - 2]) * 100000;
			arrOrdenes.push(orden);
			//arrMarcaOrdenes.push({x: close[1], y: close[3]});
			velaOperativa.markerType = "circle";
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = "V";
			console.log(vela);
			console.log(velaOperativa);
		}
	}
	return;
	
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
	if(vela2.close - vela2.open < 0 || ((close[3] - orden.open) * 100000) - 16 < -30){
		orden.close = close[3];
		orden.fecFin = close[1];
		orden.fin = vela2.date;
		orden.total = ((close[3] - orden.open) * 100000) - 16;
		ee.removeAllListeners('orden');
		ee.on('orden', fnAbrirOrden);
	}
}

function fnCerrarOrdenVenta(vela2, close){
	if(vela2.close - vela2.open > 0 || ((close[3] - orden.open) * -100000) - 16 < -30){
		orden.close = close[3];
		orden.fecFin = close[1];
		orden.fin = vela2.date;
		orden.total = ((close[3] - orden.open) * -100000) - 16;
		ee.removeAllListeners('orden');
		ee.on('orden', fnAbrirOrden);
	} else {
		
	}
}


function fnInicial(dato){
	dato[3] = Number(dato[3]);
	vela = {date: 1, open: dato[3], close: dato[3], low: dato[3], high: dato[3]};
	vela2 = {date: 1, open: dato[3], close: dato[3], low: dato[3], high: dato[3]};
	vela3 = {date: 1, open: dato[3], close: dato[3], low: dato[3], high: dato[3]};
	calculoMedia14 = dato[3] / mediaUsada;
	arrVelaOperativa.push(vela);
	arrVelaFuerza.push(vela2);
	arrVelaReferencia.push(vela3);
	
}


function fnVelaNueva(dato){
	//console.log("fnVelaNueva");
	contadorMedia14++;
	//console.log(contadorMedia14);
	calculoMedia14 += dato[3] / mediaUsada;
	ee.emit('orden', vela2, dato);
	if(arrVelaOperativa.length <= mediaUsada){
		console.log(calculoMedia14);
	}
	
	//console.log(contadorMedia14);
	
	
	//eMedia.emit(contadorMedia14 + '', dato);
	velaOperativa = {x: vela.date, y:[vela.open, vela.high, vela.low, vela.close]};
	
	
	
	
	/*****************LA MEDIA**********************/
	
	/*if(arrVelaOperativa.length > mediaUsada - 1){
		//contadorMedia14--;
		calculoMedia14 -= arrVelaOperativa[arrVelaOperativa.length - mediaUsada]['close'] / mediaUsada;
		arrMedia14.push({x: arrVelaOperativa[arrVelaOperativa.length - 1]['date'], y: calculoMedia14});
		arrCalculoMedia14.push(calculoMedia14);
		ee.emit('ordenMedia', dato);
	}*/
	
	/*****************FIN LA MEDIA**********************/
	
	
	dato[3] = Number(dato[3]);
	//arrVelaOperativa2.push([vela.date, vela.low, vela.open, vela.close, vela.high]);
	
	arrVelaOperativa2.push(velaOperativa);
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
		/*console.log(fs);
		fs.close(2, function(){});
		delete fs;*/
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
		for(let i = 0; i < arr.length/1 - 1; i++){	
			var dato = arr[i].split(',');
			if(orden != null){
				if(orden.tipo == 'C'){
					if(((dato[3] - orden.open) * 100000) - 16 < orden.stopLoss){
						orden.close = dato[3];
						orden.fecFin = dato[1];
						orden.fin = vela.date;
						orden.obs = "stopLoss";
						orden.total = ((dato[3] - orden.open) * 100000) - 16;	
						
						orden = null;
					} else {
						if(((dato[3] - orden.open) * 100000) - 16 > takeProfit){
							orden.close = dato[3];
							orden.fecFin = dato[1];
							orden.fin = vela.date;
							orden.obs = "takeProfit";
							orden.total = ((dato[3] - orden.open) * 100000) - 16;	
							
							orden = null;
						} else {
							if(((dato[3] - orden.open) * 100000) - 16 >= 50){
								if(orden.stopLoss < ((dato[3] - orden.open) * 100000) - 66){
									orden.stopLoss = ((dato[3] - orden.open) * 100000) - 66;
								}
							}
						}
					}
				} else {
					if(((dato[3] - orden.open) * -100000) - 16 < orden.stopLoss){
						orden.close = dato[3];
						orden.fecFin = dato[1];
						orden.fin = vela2.date;
						orden.obs = "stopLoss";
						orden.total = ((dato[3] - orden.open) * -100000) - 16;
						orden = null;
					} else {
						if(((dato[3] - orden.open) * -100000) - 16 > takeProfit){
							orden.close = dato[3];
							orden.fecFin = dato[1];
							orden.fin = vela2.date;
							orden.obs = "takeProfit";
							orden.total = ((dato[3] - orden.open) * -100000) - 16;
							orden = null;
						} else {
							if(((dato[3] - orden.open) * -100000) - 16 >= 50){
								if(orden.stopLoss < ((dato[3] - orden.open) * -100000) - 66){
									orden.stopLoss = ((dato[3] - orden.open) * -100000) - 66;
								}
							}
						}
					}
				}
					
			}

			
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
		var totalCompras = 0;
		var totalVentas = 0;
		if(arrOrdenes.length > 0 && arrOrdenes[arrOrdenes.length - 1]['close'] == null){
			arrOrdenes.pop();
		}
		
		
		fs2.appendFileSync('./querysReconstruccion/ordenes.txt', "******************************************************************\nMEDIA = " + mediaUsada + "      Take Profit=" + takeProfit + "\n", (err) => {
				if (err) throw err;
					console.log('The "data to append" was appended to file!');
				});
		
		
		//
		for(let i in arrOrdenes){//8624190
			fs2.appendFileSync('./querysReconstruccion/ordenes.txt', JSON.stringify(arrOrdenes[i]) + "\n", (err) => {
				if (err) throw err;
					console.log('The "data to append" was appended to file!');
				});
			try{
				//total += Math.abs(arrOrdenes[i]['total']) > 1 ? arrOrdenes[i]['total'] : 0;
				total += arrOrdenes[i]['total'];//arrOrdenes[i]['total'] < -30 ? -30 : arrOrdenes[i]['total'];
				if(arrOrdenes[i]['total'] > 0){
					totalPos += arrOrdenes[i]['total'];
				} else {
					totalNeg += arrOrdenes[i]['total'];
				}
				if(arrOrdenes[i]['tipo'] == 'C'){
					totalCompras += arrOrdenes[i]['total'];
				} else {
					totalVentas += arrOrdenes[i]['total'];
				}
			} catch(e){
				
			}	
			
		}
		fs2.appendFileSync('./querysReconstruccion/ordenes.txt', "TOTAL GRAL:: " + total +  "\n" +  "TOTAL BUENAS: " + totalPos +  "\n" +  "TOTAL MALAS: " + totalNeg +  "\nTOTAL COMPRAS: " + totalCompras +  "\n" +  "TOTAL VENTAS: " + totalVentas + "\n", (err) => {
				if (err) throw err;
					console.log('The "data to append" was appended to file!');
				});
		
		process.send({ cmd: 'fin proceso', data: process.pid });
		process.send({ cmd: 'enviarMkdt', data: [arrVelaFuerza2, arrVelaOperativa2, arrVelaReferencia, arrMedia14] });
		
	});
	

	
});
process.send({ cmd: process.pid });

