var fsLauncher = require('fs');
var secNum = [];
var objSec = {};
var contador = 1;
var ind = 1;
var request = require('request');
var EventEmitter = require('events').EventEmitter;
var arrOrdenGraf = [];
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
	contador++;
	if(Number(body.cta) > 0){
		ee.emit('exec', contador);
	}
	
}

function fnProcesa(i){
	if(contador == arr.length){
		return;
	}
	var dato = arr[i - 1].split(',');
	var cierre = arr[i].split(',')[2];
	//var arrFecha = dato[0].split(".");	
	var sw = true;
	var objReq = '{"open": "' + dato[2] + '", "close": "' + dato[5] + '", "high": "' + dato[3] + '", "low": "' + dato[4] + '", "spread": "' + dato[7] + '", "opt": "S", "date": "' + (/*dato[0] + ',' + */dato[1]) + '", "fecha": "' + (dato[0]) + '", "vol": "' + Number(dato[6]) + '"}';
	
	request.post({url: 'http://localhost:9191', form: objReq}, fnRecepcion);
	
}

//fs.readFile("./marketdata/USDJPY1_2000_2005.csv", 'utf8', function(err, data) {
fsLauncher.readFile("./querysReconstruccion/_dataExp.txt", 'utf8', function(err, data) {
//fs.readFile("./marketdata/DAT_MT_GBPUSD_M1_2016.csv", 'utf8', function(err, data) {
	if(err){
		//console.log(err);
		return;
	}
	
	arr = data.split("\n");
	
	
	ee.emit('exec', contador);
});		







var bearishengulfingpattern = require('./technicalindicators.js').bearishengulfingpattern;
var bullishengulfingpattern = require('./technicalindicators.js').bullishengulfingpattern;

var BB = require('./technicalindicators.js').BollingerBands;

var period = 14

var ini = {
period : period, 
values : [] ,
stdDev : 2
    
}

var bb = new BB(ini);
var bbGraf;
var ATR = require('technicalindicators').ATR;
ini = {low:[], high:[], close:[], period: 30};
var atr = new ATR(ini);
var fs = require('fs');
var fs2 = require('fs');
var fs3 = require('fs');
var fsGraf = require('fs');
var fsOrdenes = require('fs');
var fsOrdMalas = require('fs');
var fsOrdBuenas = require('fs');
var fsGrafOrden = require('fs');
var loteMin = 0.01;
var loteMax = 100;
var loteFijo = false;
var ajusteDecimal = 100000;
var cantOrdenes = 1;
var desfaseSombra = -0.005;

var total = 0;
var total2 = 0;
var totalPos = 0;
var totalNeg = 0;
var totalCompras = 0;
var totalVentas = 0;
var totalBuenas = 0;
var totalMalas = 0;
var buenas = 0;
var malas = 0;
var neutras = 0;

const TENDENCIA_ALCISTA = 1;
const TENDENCIA_BAJISTA = -1;

var objResult = {lunB: 0, lunM: 0, lunN: 0, lunT: 0, marB: 0, marM: 0, marN: 0, marT: 0, mieB: 0, mieM: 0, mieN: 0, mieT: 0, jueB: 0, jueM: 0, jueN: 0, jueT: 0, vieB: 0, vieM: 0, vieN: 0, vieT: 0}
"lun", "mar", "mie", "jue", "vie"



var cuenta = 100;
var ponderado = .1;
var spread = 0.00020;
var ajusteStop = 0.0008;
var objCont = {N: 2, S: 2}

var objFunciones = {};
objFunciones['0_1'] = fnNo;
objFunciones['2_1'] = fnSi;
objFunciones['2_2'] = fnSi;
objFunciones['2_3'] = fnSi;
objFunciones['2_4'] = fnSi;
objFunciones['2_5'] = fnVentaEval;
objFunciones['3_1'] = fnSi;
objFunciones['3_2'] = fnSi;
objFunciones['3_3'] = fnSi;
objFunciones['3_4'] = fnSi;
objFunciones['3_5'] = fnCompraEval;


var velaEval = {};

function fnVentaEval(vela, tipo, arrVel){
	////console.log(fnVentaEval);
	evaluacion = 0;
	cont = 1;
	if(vela.open > vela.close){
		return fnVenta(vela, tipo, arrVel, 'close');
		
	}
	return 'N';
}

function fnCompraEval(vela, tipo, arrVel){
	////console.log(fnCompraEval);
	evaluacion = 0;
	cont = 1;
	if(vela.open < vela.close){
		return fnCompra(vela, tipo, arrVel, 'close');
		
	}
	return 'N';
}



function fnNo(dato){
	////console.log(fnCompraEval);
	return 'N';
}

function fnSi(dato){
	////console.log(fnVentaEval);
	cont ++;
	return 'N';
}

var http = require("http");

var _PORT = 9191; //Http port Node.js server will be listening on. Make sure that this is an open port and its the same as the one defined in MT4 indicator/EA.
	
var arrVelas = [];
var arrVelasSombra = [];	
var arrTamVelas = [];
var tamVelas = 0;	
var orden;
	
var evaluacion = 0;
var cont = 1;
	
	
function fnEvaluaVelas(dato, tipo, arrV){
	var vela = arrV[arrV.length - 1];
	arrTamVelas.push((vela.high - vela.low) / 10);
	if(arrTamVelas.length > 10){
		tamVelas += ((vela.high - vela.low) / 10) - arrTamVelas.shift();
		
		sw = true;
	} else {
		tamVelas += (vela.high - vela.low) / 10;
		sw = false;
	}
	var opt = 0;
	if(arrV.length > 2 && sw){
		
		var input = {
			open: [arrV[arrV.length - 3].open * ajusteDecimal, arrV[arrV.length - 2].open * ajusteDecimal, arrV[arrV.length - 1].open * ajusteDecimal],
			high: [arrV[arrV.length - 3].high * ajusteDecimal, arrV[arrV.length - 2].high * ajusteDecimal, arrV[arrV.length - 1].high * ajusteDecimal],
			close: [arrV[arrV.length - 3].close * ajusteDecimal, arrV[arrV.length - 2].close * ajusteDecimal, arrV[arrV.length - 1].close * ajusteDecimal],
			low: [arrV[arrV.length - 3].low * ajusteDecimal, arrV[arrV.length - 2].low * ajusteDecimal, arrV[arrV.length - 1].low * ajusteDecimal],
			tamVelas: tamVelas * ajusteDecimal
		  };
		
		sw = false;
		
		if(bearishengulfingpattern(input)){
			sw = true;
			evaluacion = 2;
			//console.log('bearishengulfingpattern');
			
		}
		input = {
			open: [arrV[arrV.length - 3].open * ajusteDecimal, arrV[arrV.length - 2].open * ajusteDecimal, arrV[arrV.length - 1].open * ajusteDecimal],
			high: [arrV[arrV.length - 3].high * ajusteDecimal, arrV[arrV.length - 2].high * ajusteDecimal, arrV[arrV.length - 1].high * ajusteDecimal],
			close: [arrV[arrV.length - 3].close * ajusteDecimal, arrV[arrV.length - 2].close * ajusteDecimal, arrV[arrV.length - 1].close * ajusteDecimal],
			low: [arrV[arrV.length - 3].low * ajusteDecimal, arrV[arrV.length - 2].low * ajusteDecimal, arrV[arrV.length - 1].low * ajusteDecimal],
			tamVelas: tamVelas * ajusteDecimal
		  };
		if(bullishengulfingpattern(input)){
		//if(threeoutsideup(input)){
			sw = true;
			evaluacion = 3;
			//console.log('bullishengulfingpattern');
			
		}
	
		resp = fnEvaluaCierre(tipo, dato);
		if(orden == null && sw){
			var arrFecha = dato.fecha.split('.');
			var dt = new Date(Number(arrFecha[0]), Number(arrFecha[1]) - 1, Number(arrFecha[2]), 0, 0, 0, 0);
				
			//if(dias[dt.getUTCDay()] == 'jue'){			
								
				switch(evaluacion){
					case 2:
						evaluacion = 0;
						return fnVenta(dato, tipo, arrV, 'open');
					
					case 3:
						evaluacion = 0;
						return fnCompra(dato, tipo, arrV, 'open');
					
				}
				
			//}
			
		}
		
	}
	return "N";
}	


function fnCierre(opt, origen, vela){
	var arrFecha = vela.fecha.split('.');				
	var dt = new Date(Number(arrFecha[0]), Number(arrFecha[1]) - 1, Number(arrFecha[2]), 0, 0, 0, 0);
	var df = dias[dt.getUTCDay()];
	velaOperativa.indexLabel = 'F';	
	//arrOrdenGraf.push(velaOperativa);
				
	orden.fin = velaOperativa;
	
	//exit();
	orden.close = orden.stopLoss;
	
	//orden.fin = vela.date;
	orden.total = opt == 'C' ? (orden.close - orden.open - spread) * ajusteDecimal : (orden.open - orden.stopLoss - spread) * ajusteDecimal;//((vela.open - orden.open) * ajusteDecimal) - 16;	
	orden.totalReal = orden.total * orden.lote;//((vela.open - orden.open) * ajusteDecimal) - 16;	
	orden.prop = opt == 'C' ? -(orden.open - orden.min) * ajusteDecimal / orden.stopLossIni : -(orden.max - orden.open) * ajusteDecimal / orden.stopLossIni;
	fnCalcCuenta(orden.totalReal);
	orden.cta = cuenta;
	
	if(orden.total < -0.01){					
		orden.tipo = orden.tipo == 'V' ? 'S' : 'L';
		malas++;
		objResult[df + 'M']++;
		fsOrdMalas.appendFileSync('./querysReconstruccion/_logExpOrdMalas.txt', "**********************************\n" + JSON.stringify(vela) + "\n" + JSON.stringify(velaOperativa) + "\n" + JSON.stringify(orden) + "\n", (err) => {
			if (err) throw err;
				////console.log('The "data to append" was appended to file!');
			});
		fsGrafOrden.appendFileSync('./querysReconstruccion/ordenGraf/_logExpFGrafMala_' + (ind++) + '.txt', JSON.stringify(arrOrdenGraf) + ",\n", (err) => {
			if (err) throw err;
				////console.log('The "data to append" was appended to file!');
			});
		
	} else {
		if(orden.total > 0.01){
			buenas++;
			objResult[df + 'B']++;
			fsOrdBuenas.appendFileSync('./querysReconstruccion/_logExpOrdBuenas.txt', "**********************************\n" + JSON.stringify(vela) + "\n"  + JSON.stringify(velaOperativa) + "\n" + JSON.stringify(orden) + "\n", (err) => {
			if (err) throw err;
				////console.log('The "data to append" was appended to file!');
			});
			fsGrafOrden.appendFileSync('./querysReconstruccion/ordenGraf/_logExpFGrafBuena_' + (ind++) + '.txt', JSON.stringify(arrOrdenGraf) + ",\n", (err) => {
			if (err) throw err;
				////console.log('The "data to append" was appended to file!');
			});
		} else {
			neutras++;
			objResult[df + 'N']++;
			fsGrafOrden.appendFileSync('./querysReconstruccion/ordenGraf/_logExpFGrafNeutra_' + (ind++) + '.txt', JSON.stringify(arrOrdenGraf) + ",\n", (err) => {
			if (err) throw err;
				////console.log('The "data to append" was appended to file!');
			});
			
		}
	}
	arrOrdenGraf = [];
	objResult[df + 'T'] += orden.total;
	fs2.appendFileSync('./querysReconstruccion/_logExpF.txt', JSON.stringify(objResult) + "\n", (err) => {
		if (err) throw err;
			////console.log('The "data to append" was appended to file!');
		});
	fsOrdenes.appendFileSync('./querysReconstruccion/_logExpOrdenes.txt', JSON.stringify(vela) + "\n", (err) => {
	if (err) throw err;
		////console.log('The "data to append" was appended to file!');
	});
	fnImprimirOperacion();
	orden = null;
	//return "X";
	return "N";

}


function fnGeneraLineaTendencia_y_orden(j, valorInicial, objNuevo, arrMinimo){
	var linea = {};
	linea.pendiente = proyeccionAlcista;
	linea.coefCorte = corteMinAlcista;
	
	linea.arrPtos = [];
	linea.arrPtos.push(valorInicial);
	linea.arrPtos.push(arrMinimo.pop());
	linea.arrPtos.push(arrMinimo.pop());
	
	
	
	//Graf(FlexGlobals.topLevelApplication).removeEventListener(GeneraDataEvent.AUTOGENERACION, Graf(FlexGlobals.topLevelApplication).fnCicloGenerador);

	arrTendencias.push(linea);
	
		
		
}



function fnEvaluaCierre(origen, vela){
	if(orden != null && origen == orden.origen){
		//console.log(orden);
		
		if(orden.tipo == 'C'){
			if(vela.low < orden.stopLoss || (evaluacion == 2 && orden.stopLoss - orden.open < 0)){
				orden.stopLoss = vela.low < orden.stopLoss ? orden.stopLoss : vela.close;
				return fnCierre("C", origen, vela);
			} else {
				 //console.log(orden.stopLoss);
				 if(vela.high > orden.takeProfit){
					 orden.stopLoss = orden.takeProfit;
					 return fnCierre("C", origen, vela);
				 } else {
					if(vela.high > orden.open + ajusteStop + spread){
						if(orden.stopLoss < orden.open + spread){
							if(vela.close < orden.stopLoss){
								return fnCierre("C", origen, vela);
							} else {
								orden.stopLoss = orden.open + spread + 0.00010;
								orden.takeProfit = vela.close + ajusteStop;
							}
							
						} else {
							if(vela.close > ajusteStop + orden.stopLoss){
								orden.stopLoss = vela.close - ajusteStop;
								orden.takeProfit = vela.close + ajusteStop;
							}
							
						}
					}

					if(vela.close > orden.open + ajusteStop + spread){
						if(orden.stopLoss < orden.open + spread){
							orden.stopLoss = orden.open + spread + 0.00010;
							orden.takeProfit = vela.close + ajusteStop;
						} else {
							if(vela.close > ajusteStop + orden.stopLoss){
								orden.stopLoss = vela.close - ajusteStop;
								orden.takeProfit = vela.close + ajusteStop;
							}
							
						}
						fnImprimirOperacion();
						//console.log(orden.stopLoss);
						return 'A'; 
					}
				 }

					
			}
			
		} else if(orden && orden.tipo == 'V'){
            //console.log('velaClose: ' + vela.close + ' < ' + (orden.open - (ajusteStop + spread)));
			if(vela.high > orden.stopLoss || (evaluacion == 3 && orden.stopLoss - orden.open > 0)){
				orden.stopLoss = vela.high > orden.stopLoss ? orden.stopLoss : vela.close;
				return fnCierre("V", origen, vela);
			} else {
                //console.log(orden.stopLoss);

				if(vela.low < orden.takeProfit){
					orden.stopLoss = orden.takeProfit;
					return fnCierre("V", origen, vela);
				} else {
					if(vela.low < orden.open - (ajusteStop + spread)){
						if(orden.stopLoss > orden.open - spread){
							if(vela.close > orden.stopLoss){
								return fnCierre("V", origen, vela);
							} else {
								orden.stopLoss = orden.open - spread - 0.00010;
								orden.takeProfit = vela.close - ajusteStop;
							}
							
						} else {
							if(vela.close < orden.stopLoss - ajusteStop){
								orden.stopLoss = vela.close + ajusteStop;
								orden.takeProfit = vela.close - ajusteStop;
							}
							
						}
					}


					if(vela.close < orden.open - (ajusteStop + spread)){
						if(orden.stopLoss > orden.open - spread){
							orden.stopLoss = orden.open - spread - 0.00010;
							orden.takeProfit = vela.close - ajusteStop;
						} else {
							if(vela.close < orden.stopLoss - ajusteStop){
								orden.stopLoss = vela.close + ajusteStop;
								orden.takeProfit = vela.close - ajusteStop;
							}
							
						}
						fnImprimirOperacion();
						//console.log(orden.stopLoss);
						return 'A'; 
					}	
				}


				
			}
		}
		
	}
	return 'N';
}

function fnImprimirOperacion(){
	fs.appendFileSync('./querysReconstruccion/_logExp.txt', JSON.stringify(orden) + "\nBUENAS: " + buenas + ", MALAS: " + malas + ", NEUTRAS: " + neutras + "\n", (err) => {
		if (err) throw err;
			////console.log('The "data to append" was appended to file!');
		});
	fsOrdenes.appendFileSync('./querysReconstruccion/_logExpOrdenes.txt', JSON.stringify(orden) + "\nBUENAS: " + buenas + ", MALAS: " + malas + ", NEUTRAS: " + neutras + "\n", (err) => {
		if (err) throw err;
			////console.log('The "data to append" was appended to file!');
		});	
	try{
		//total += Math.abs(arrOrdenes[i]['total']) > 1 ? arrOrdenes[i]['total'] : 0;
		total += orden['total'];//arrOrdenes[i]['total'] < -30 ? -30 : arrOrdenes[i]['total'];
		total2 += orden['totalReal'];
		if(orden['totalReal'] > 0){
			totalPos += orden['totalReal'];
			totalBuenas++;
		} else {
			totalNeg += orden['totalReal'];
			totalMalas++;
		}
		if(orden['tipo'] == 'C'){
			totalCompras += orden['totalReal'];
		} else {
			totalVentas += orden['totalReal'];
		}
	} catch(e){
		
	}	
}

function fnVelaNormal(vela, dato, arrVel, tipo){
	
	/*dato[2] = Number(dato[2]);
	dato[3] = Number(dato[3]);
	dato[4] = Number(dato[4]);*/
	vela.close = dato.close;
	vela.vol += dato.vol;

	


	if(dato.high > vela.high){
		vela.high = dato.high;
		
	}
	var resp = 'N';
	if(dato.low < vela.low){
		vela.low = dato.low;		
	}	
	//console.log(evaluacion + '_' + cont);

	//if(!velaOperativa){
		velaOperativa = {x: vela.id, y:[vela.open, vela.high, vela.low, vela.close], vo: vela};
	/*} else {

	}*/
	
	


    if(orden){
		if(dato.high > orden.max){
			orden.max = dato.high;
			
		}

		if(dato.low < orden.min){
			orden.min = dato.low;		
		}	
		resp = fnEvaluaCierre(tipo, dato);
		
	}
	/*if(resp == "N" && orden == null){
		////console.log(orden);
		resp = objFunciones[evaluacion + '_' + cont](vela, tipo, arrVel);
	}*/
	
	return resp;
	
}//2134068

function fnCalcCuenta(cierre){
	if(cuenta > 0){
		let garantia = cuenta / 10;
		cuenta = cuenta + cierre;
		if(cuenta < garantia){
			cuenta = -1;
		} else {
			if(!loteFijo){
				if(cuenta / 1000 > loteMax){
					
					ponderado = parseInt((loteMax * 100) + '');
					//console.log("INT: " + ponderado);
					ponderado = Number(ponderado) / 100;
				} else {
					if(cuenta / 1000 < loteMin){
						ponderado = parseInt((loteMin * 100) + '');
						//console.log("INT: " + ponderado);
						ponderado = Number(ponderado) / 100;
					} else {
						ponderado = cuenta / 1000;
						ponderado = parseInt(((cuenta / 1000) * 100) + '');
						//console.log("INT: " + ponderado);
						ponderado = Number(ponderado) / 100;
					}
	
				}
			}
						
		}
	}
}

function fnCompra(vela, tipo, arrV, param){
	
		if(cuenta > 0){
			
			var arr = ((arrV[arrV.length - 1].close +  atrGraf) + '').split('.');
			var evaluando = Number(arr[0] + '.' + (Math.round(Number(arr[1]) * Math.pow(10, 4 - arr[1].length))));
			console.log("/********************* - REVISION - *************************/");
			console.log("NIVEL: " + evaluando);
			var ev = false;
			/*for(var nivel in objNiveles){
				console.log((evaluando) + " >= " + nivel);
				if(arrV[arrV.length - 1].close < Number(nivel) && evaluando >= Number(nivel)){
					console.log("Orden Abortada");
					ev = false;
					break;
				}
			}*/
			if(arrV[arrV.length - 1].close > ichi.senkouSpanA && arrV[arrV.length - 1].close > ichi.senkouSpanB && (arrV[arrV.length - 1].low < ichi.senkouSpanA || arrV[arrV.length - 1].low < ichi.senkouSpanB)){
				ev = true;
			}
			console.log("/********************* - FIN REVISION - *************************/");
			if(ev){
				var pos;
				var velaOp = arrV[arrV.length - 1];
				if(param == 'open'){
					pos = 0;
				} else {
					pos = 1;
				}
				orden = {ini: velaOp.id, origen: tipo, tipo: 'C', cierrePost: '',fin: 0, open: vela[param], fecha: vela.fecha, /*atr: atrGraf, */min: vela.low, max: vela.high, prop: 0, bb: bbGraf.upper, res: vela[param] - bbGraf.upper, atr: atrGraf};
				////console.log(arrV);
				var arrFecha = vela.fecha.split('.');				
				var dt = new Date(Number(arrFecha[0]), Number(arrFecha[1]) - 1, Number(arrFecha[2]), 0, 0, 0, 0);
				
				//orden.stopLoss = (-Math.abs(arrV[arrV.length - 3].close - arrV[arrV.length - 2].close) - 26) < -166 ? orden.open - 0.00166 : arrV[arrV.length - 3].close - spread - 0.00010;
				//orden.stopLoss = (-Math.abs(arrV[arrV.length - 2 - pos].close - arrV[arrV.length - 1 - pos].close) - 0.00010 - spread) * ajusteDecimal < -166 ? orden.open - 0.00166 : arrV[arrV.length - 2 - pos].close - spread - 0.00010;
                //orden.stopLoss = arrV[arrV.length - 2 - pos].close - spread - 0.00010;
				
				/*if( orden.ini == 287){
					console.log(3 * atrGraf);
					console.log(vela[param] + 3 * atrGraf);
					exit();
				}*/

				//orden.stopLoss = vela[param] - 0.00450 + spread;
				orden.stopLoss = vela[param] - 2 * atrGraf - spread;
				orden.stopLossIni = Math.round(Math.abs(orden.open - orden.stopLoss) * ajusteDecimal);
				orden.takeProfit = vela[param] + 3 * atrGraf;
				//orden.stopLoss = orden.open - (orden.stopLossIni * 3 / 4) / ajusteDecimal;
				nStopLoss = 0;
				orden.lote = ponderado;
				
				orden.dia = dias[dt.getUTCDay()];
				console.log("************************** INICIO ORDEN ****************************");
				console.log(orden);
				console.log("\n\n\n");	
				velaOperativa.indexLabel = 'I';
				arrOrdenGraf.push(velaOperativa);
				arrOrdenGraf.push(ichi);
				
				/*fsGrafOrden.appendFileSync('./querysReconstruccion/_logExpFGraf' + (ind) + '.txt', "[\n", (err) => {
					if (err) throw err;
						////console.log('The "data to append" was appended to file!');
					});
				fsGrafOrden.appendFileSync('./querysReconstruccion/_logExpFGraf' + (ind) + '.txt', JSON.stringify(velaOperativa) + "\n", (err) => {
					if (err) throw err;
						////console.log('The "data to append" was appended to file!');
					});*/
				
				fs.appendFileSync('./querysReconstruccion/_logExp.txt', JSON.stringify(orden) + " ......\n", (err) => {
					if (err) throw err;
						////console.log('The "data to append" was appended to file!');
					});
				fsOrdenes.appendFileSync('./querysReconstruccion/_logExpOrdenes.txt', JSON.stringify(orden) + "\n", (err) => {
					if (err) throw err;
						////console.log('The "data to append" was appended to file!');
					});
				return "C";	
			}
					
		}
		return "N";
	
}

function fnVenta(vela, tipo, arrV, param){
	
		if(cuenta > 0){
			var arr = ((arrV[arrV.length - 1].close -  atrGraf) + '').split('.');
			var evaluando = Number(arr[0] + '.' + (Math.round(Number(arr[1]) * Math.pow(10, 4 - arr[1].length))));
			console.log("/********************* - REVISION - *************************/");
			console.log("NIVEL: " + evaluando);
			var ev = false;
			/*for(var nivel in objNiveles){
				console.log(arrV[arrV.length - 1].close + " > " + nivel);
				console.log((evaluando) + " <= " + nivel);
				if(arrV[arrV.length - 1].close > Number(nivel) && evaluando <= Number(nivel)){
					console.log("Orden Abortada");
					ev = false;
					break;
				}
			}*/
			if(arrV[arrV.length - 1].close < ichi.senkouSpanA && arrV[arrV.length - 1].close < ichi.senkouSpanB && (arrV[arrV.length - 1].high > ichi.senkouSpanA || arrV[arrV.length - 1].high > ichi.senkouSpanB)/*|| (arrV[arrV.length - 1].close < Math.max(ichi.senkouSpanA, ichi.senkouSpanB) && (arrV[arrV.length - 1].close > Math.min(ichi.senkouSpanA, ichi.senkouSpanB)))*/){
				ev = true;
			}
			console.log("/********************* - FIN REVISION - *************************/");
			if(ev){
				var velaOp = arrV[arrV.length - 1];
				var pos;
				if(param == 'open'){
					pos = 0;
				} else {
					pos = 1;
				}
				
				orden = {ini: velaOp.id, origen: tipo, tipo: 'V', cierrePost: '',fin: 0, open: vela[param], fecha: vela.fecha/*, atr: atrGraf*/, min: vela.low, max: vela.high, prop: 0, bb: bbGraf.lower, res: vela[param] - bbGraf.lower, atr: atrGraf};
				var arrFecha = vela.fecha.split('.');
				var dt = new Date(Number(arrFecha[0]), Number(arrFecha[1]) - 1, Number(arrFecha[2]), 0, 0, 0, 0);
				nStopLoss = 0;
				orden.lote = ponderado;
				//orden.stopLoss = -Math.abs(arrV[arrV.length - 3].close - arrV[arrV.length - 2].close) - spread - 26 - 0.00010 < -166 ? orden.open + 0.00166 : arrV[arrV.length - 3].close + spread + 0.00010;
				//orden.stopLoss = (-Math.abs(arrV[arrV.length - 2 - pos].close - arrV[arrV.length - 1 - pos].close) - 0.00010 - spread) * ajusteDecimal < -166 ? orden.open + 0.00166 : arrV[arrV.length - 2 - pos].close + spread + 0.00010;
                //orden.stopLoss = arrV[arrV.length - 2 - pos].close + spread + 0.00010;
				/*if( orden.ini == 370){
					console.log(objNiveles);
					console.log(3 * atrGraf);
					console.log(vela[param] + 3 * atrGraf);
					exit();
				}*/
				//orden.stopLoss = vela[param] + 0.00450 - spread;
				orden.stopLoss = vela[param] + 2 * atrGraf + spread;
				orden.stopLossIni = Math.round(Math.abs(orden.open - orden.stopLoss) * ajusteDecimal);
				orden.takeProfit = vela[param] - 3 * atrGraf;
				//orden.stopLoss = orden.open + (orden.stopLossIni * 3 / 4) / ajusteDecimal;
				orden.dia = dias[dt.getUTCDay()];
				console.log("************************** INICIO ORDEN ****************************");
				console.log(vela);
				console.log(orden);
				console.log("\n\n\n");
				
				
				arrOrdenGraf.push(velaOperativa);
				arrOrdenGraf.push(ichi);
				/*fsGrafOrden.appendFileSync('./querysReconstruccion/_logExpFGraf' + (ind) + '.txt', "[\n", (err) => {
					if (err) throw err;
						////console.log('The "data to append" was appended to file!');
					});
				fsGrafOrden.appendFileSync('./querysReconstruccion/_logExpFGraf' + (ind) + '.txt', JSON.stringify(velaOperativa) + "\n", (err) => {
					if (err) throw err;
						////console.log('The "data to append" was appended to file!');
					});
				*/
				
				fs.appendFileSync('./querysReconstruccion/_logExp.txt', JSON.stringify(orden) + " .....\n", (err) => {
					if (err) throw err;
						////console.log('The "data to append" was appended to file!');
					});
				fsOrdenes.appendFileSync('./querysReconstruccion/_logExpOrdenes.txt', JSON.stringify(orden) + "\n", (err) => {
					if (err) throw err;
						////console.log('The "data to append" was appended to file!');
					});
				return "V";
			}
			
			
		}
	
		return "N";
}


var atrGraf;
var velaOperativa;

var objNiveles = {};
var objMin = {};
var objMax = {};
var arrMin = [];
var arrMax = [];
var arrElim = [];
var contadorNivel = 1;
var arrTendencias = [];
var proyeccionAlcista;
var corteMinAlcista;


function fnMaxMin(opt, velaAnt, vela){
	if(opt == 'min'){
		
		var arr = String(vela.low).split('.');
		var lowV = Number(arr[0] + '.' + (Math.round(Number(arr[1]) * Math.pow(10, 4 - arr[1].length))));
		arr = String(velaAnt.low).split('.');
		var lowVA= Number(arr[0] + '.' + (Math.round(Number(arr[1]) * Math.pow(10, 4 - arr[1].length))));
		/*console.log("*********************** - MEDIDAS MAXIMOS Y MINIMOS - ******************************");
		console.log(lowVA);
		console.log(lowV);
		console.log(Math.min(lowVA, lowV));
		console.log("*********************** - FIN MEDIDAS MAXIMOS Y MINIMOS - ******************************");
		*/
		var objRes = {res : Math.min(lowVA, lowV), ptos: []};
		
		if(objRes.res == lowVA){
			objRes.ptos.push(velaAnt.id);
		}
		if(objRes.res == lowV){
			objRes.ptos.push(vela.id);
		}
		return objRes;
	} else {
		arr = String(vela.high).split('.');

		 
		var highV= Number(arr[0] + '.' + (Math.round(Number(arr[1]) * Math.pow(10, 4 - arr[1].length))));
		arr = String(velaAnt.high).split('.');
		var highVA= Number(arr[0] + '.' + (Math.round(Number(arr[1]) * Math.pow(10, 4 - arr[1].length))));
		/*console.log("************************* - MEDIDAS MAXIMOS Y MINIMOS - ****************************");
		console.log(highVA);
		console.log(highV);
		console.log(Math.max(highVA, highV));
		console.log("************************* - FIN MEDIDAS MAXIMOS Y MINIMOS - ****************************");*/
		var objRes = {res : Math.max(highVA, highV), ptos: []};
		
		if(objRes.res == highVA){
			objRes.ptos.push(velaAnt.id);
		}
		if(objRes.res == highV){
			objRes.ptos.push(vela.id);
		}
		return objRes;

	}
	
}

var ichi;

function fnVelaNueva(dato, arrVel, tipo){
	//console.log('fnVelaNueva');
	//console.log(tipo);
	var vela = arrVel[arrVel.length - 1];
	var velaAnt = arrVel[arrVel.length - 2];
	var resp = 'N';
	
	/************************************- NIVELES -********************************************/
	if(vela){
		atrGraf = atr.nextValue({close: [vela.close], high: [vela.high], low: [vela.low]});
		ichi = ichimoku.genera({high: vela.high, low: vela.low, period: 2})
		/*arrNube.push({x: vela.id + ichimoku.lento, y: [ichi.senkouSpanA, ichi.senkouSpanB], tipo: 'Nube'});
		arrTenkan.push({x: vela.id, y: ichi.tenkan, tipo: 'Tenkan'});
		arrKinjou.push({x: vela.id, y: ichi.kijun, tipo: 'Kinjou'});
		arrChinko.push({x: vela.id - ichimoku.lento, y: vela.close, tipo: 'Chinko'});*/
		bbGraf = bb.nextValue(Number(vela.close));
		//console.log(bbGraf);
		velaOperativa = {x: vela.id, y:[vela.open, vela.high, vela.low, vela.close], vo: vela};
		
		fs.appendFileSync('./querysReconstruccion/_logExp.txt', JSON.stringify(velaOperativa) + "\n", (err) => {
			if (err) throw err;
				////console.log('The "data to append" was appended to file!');
			});
		
	}
	if(velaAnt){
		
		if(velaAnt.close <= velaAnt.open && vela.close >= vela.open){
			var val = fnMaxMin('min', velaAnt, vela);
			//console.log("EL VAL = " + val);
			if(objNiveles[val.res]){
				if(objNiveles[val.res]['ptos'].indexOf(velaAnt.id) == -1){
					objNiveles[val.res]['cont']++;
					objNiveles[val.res]['ptos'] = objNiveles[val.res]['ptos'].concat(val.ptos);
				}
				
			} else {
				objNiveles[val.res] = {ini: vela.id, cont: 1, ptos: [vela.id]};
			}
			
		} else if(velaAnt.close >= velaAnt.open && vela.close <= vela.open){
			val = fnMaxMin('max', velaAnt, vela);
			//console.log("EL VAL = " + val);
			if(objNiveles[val.res]){
				if(objNiveles[val.res]['ptos'].indexOf(velaAnt.id) == -1){
					objNiveles[val.res]['cont']++;
					objNiveles[val.res]['ptos'] = objNiveles[val.res]['ptos'].concat(val.ptos);
				}
			} else {
				objNiveles[val.res] = {ini: vela.id, cont: 1, ptos: [vela.id]};
			}
		} else {
			for(var num in objNiveles){
				if(num < vela.high && num > vela.low){
					objNiveles[num]['cont']--;
					if(objNiveles[num]['cont'] < 1){
						delete objNiveles[num];
					}
				}
			}
		}

		var objNuevo;
		var n;
		var tendencia = fnEvaluaTendencia(velaAnt, vela);
					
		if(tendencia == TENDENCIA_ALCISTA){//verde-roja => PUNTA
			n  = arrMax.length;
			objNuevo = {num: vela['high'] < velaAnt['high'] ? vela.id : velaAnt.id,  valor: vela['high'] < velaAnt['high'] ? vela['high'] : velaAnt['high']};			
			for(var j = 0; j < n; j++){//ELIMINO LOS PUNTOS BASE MENORES AL NUEVO
				a = arrMax[j];
				//console.log(objNuevo);
				if(a.ptoInicial['valor'] > objNuevo['valor']){
					ptoElim = arrMax.splice(j, 1)['ptoInicial'];
					arrElim.push(ptoElim);
					j--;
					n--;
				} 	
			}
			var nodo;
			for(ptoElim of arrElim){//EN LAS PROYECCIONES DE CADA PUNTO SOBREVIVIENTE ELIMINO LOS PUNTOS ELIMINADOS
				for(nodo of arrMax){
					
					for(var arrPuntos of nodo.arrayPosibles){
						var ind = arrPuntos.indexOf(ptoElim);
						if(ind > -1){
							arrPuntos.splice(ind, 1);
							if(arrPuntos.length == 0){
								nodo.arrayPosibles.splice(nodo.arrayPosibles.indexOf(arrPuntos), 1);
							}	
						}	
					}	
				}	
				
			}
			
			n = arrMax.length;
				for(var jj = 0; jj < n; jj++){//UNA VEZ ELIMINADO DE TODOS LOS ARRAY LOS VALORES MAYORES PROCEDO A INSERTAR EL VALOR NUEVO
					nodo = arrMax[jj];
					if(!nodo.arrayPosibles){
						nodo.arrayPosibles = [];
					}
					
					if(nodo.arrayPosibles.length > 0){
						var m = nodo.arrayPosibles.length;
						for(var s = 0; s < m; s++){
							arrPuntos = nodo.arrayPosibles[s];
							var arrMaximo = [nodo.ptoInicial];
							try{
								for(var gg of arrPuntos){
									
									arrMaximo.push(gg);		
								}	
							} catch(e){
								//console.log(nodo);
								//console.log(j);
								//console.log(nodo.arrayPosibles[s]);
								//console.log(arrPuntos);
								//return 'X';
							}
							
							
							var swPerteneceTendencia = false;
							for(var lin of arrTendencias){
								var res = lin.pendiente * objNuevo['num'] + lin.coefCorte;
								if(objNuevo['valor'] <= res && objNuevo['valor'] - .0001 >= res){
									//lin.arrPtos.addItem(objNuevo);//COSUME RAM
									swPerteneceTendencia = true;
								}
							}
							
							if(!swPerteneceTendencia){
								
								var valorAnterior = arrMaximo[arrMaximo.length - 1];
								arrMaximo.push(objNuevo);
								//Crea orden y saca proyeccion segun pendiente
								var valorInicial = nodo.ptoInicial;
								proyeccionAlcista = Number(valorInicial['valor'] - valorAnterior['valor']) / (valorInicial['num'] - valorAnterior['num']);
								corteMinAlcista = valorAnterior['valor'] - valorAnterior['num'] * proyeccionAlcista;
	//											
								var valorEsperado = proyeccionAlcista * objNuevo['num'] + corteMinAlcista;
								console.log("/******************************** - MEDIDAS PENDIENTE - ************************************************/");
								console.log(objNuevo['valor']);
								console.log(valorEsperado);
								console.log(objNuevo['valor']);
								console.log(valorEsperado);
								console.log("/******************************** - FIN MEDIDAS PENDIENTE - ************************************************/");
								
								//console.log(arrMin);
								//return 'X';
								if(objNuevo['valor'] >= valorEsperado && objNuevo['valor'] - proyeccionAlcista <= valorEsperado){
									
										
										
										
									fnGeneraLineaTendencia_y_orden(jj, valorInicial, objNuevo, arrMaximo);
									/*console.log(arrTendencias);
									return 'X';*/
									
									
									nodo.arrayPosibles.splice(nodo.arrayPosibles.indexOf(arrPuntos));
									m--;
									s--;	
									
									
									
								} else {
									if(objNuevo['valor'] < valorEsperado){
										arrMax.splice(arrMax.indexOf(valorAnterior), 1);
										arrPuntos.shift();
										arrPuntos.push(objNuevo);
										//nodo.arrayPosibles.removeItemAt(nodo.arrayPosibles.getItemIndex(arrPuntos));
									} else {
										arrMax.pop();											
										if(!objMax.hasOwnProperty(valorAnterior.num)){
											a = {};
											a.ptoInicial = valorAnterior;
											a.arrayPosibles = [];
											a.arrayPosibles[0] = []
											a.arrayPosibles[0].push(objNuevo);
											arrMax.push(a);
											objMax[valorAnterior.num] = valorAnterior;
										}
										
										
									}
								}									
							}	
						}		
					} else {
						nodo.arrayPosibles[0] = []
						nodo.arrayPosibles[0].push(objNuevo);
						
					}
				}	
					
			
			
			
		} else if(tendencia == TENDENCIA_BAJISTA){//roja-verde => VALLE
			objNuevo = {num: vela['low'] < velaAnt['low'] ? vela.id : velaAnt.id,  valor: vela['low'] < velaAnt['low'] ? vela['low'] : velaAnt['low']};
			n  = arrMin.length;
			for(var j = 0; j < n; j++){//ELIMINO LOS PUNTOS BASE MENORES AL NUEVO
				a = arrMin[j];
				//console.log(objNuevo);
				if(a.ptoInicial['valor'] > objNuevo['valor']){
					ptoElim = arrMin.splice(j, 1)['ptoInicial'];
					arrElim.push(ptoElim);
					j--;
					n--;
				} 	
			}
			var nodo;
			for(ptoElim of arrElim){//EN LAS PROYECCIONES DE CADA PUNTO SOBREVIVIENTE ELIMINO LOS PUNTOS ELIMINADOS
				for(nodo of arrMin){
					
					for(var arrPuntos of nodo.arrayPosibles){
						var ind = arrPuntos.indexOf(ptoElim);
						if(ind > -1){
							arrPuntos.splice(ind, 1);
							if(arrPuntos.length == 0){
								nodo.arrayPosibles.splice(nodo.arrayPosibles.indexOf(arrPuntos), 1);
							}	
						}	
					}	
				}	
				
			}
		
			
			objNuevo.vela = vela;
			if(n == 0){
				a = {};
				a.ptoInicial = objNuevo;
				a.arrayPosibles = [];
				arrMin.push(a);
				objMin[objNuevo.num] = a;
			} else {
				/*//console.log(a);
				return 'X';*/
				n = arrMin.length;
				for(var jj = 0; jj < n; jj++){//UNA VEZ ELIMINADO DE TODOS LOS ARRAY LOS VALORES MAYORES PROCEDO A INSERTAR EL VALOR NUEVO
					nodo = arrMin[jj];
					if(!nodo.arrayPosibles){
						nodo.arrayPosibles = [];
					}
					
					if(nodo.arrayPosibles.length > 0){
						var m = nodo.arrayPosibles.length;
						for(var s = 0; s < m; s++){
							arrPuntos = nodo.arrayPosibles[s];
							var arrMinimo = [nodo.ptoInicial];
							try{
								for(var gg of arrPuntos){
									
									arrMinimo.push(gg);		
								}	
							} catch(e){
								//console.log(nodo);
								//console.log(j);
								//console.log(nodo.arrayPosibles[s]);
								//console.log(arrPuntos);
								//return 'X';
							}
							
							
							var swPerteneceTendencia = false;
							for(var lin of arrTendencias){
								var res = lin.pendiente * objNuevo['num'] + lin.coefCorte;
								if(objNuevo['valor'] >= res && objNuevo['valor'] - .0001 <= res){
									//lin.arrPtos.addItem(objNuevo);//COSUME RAM
									swPerteneceTendencia = true;
								}
							}
							
							if(!swPerteneceTendencia){
								
								var valorAnterior = arrMinimo[arrMinimo.length - 1];
								arrMinimo.push(objNuevo);
								//Crea orden y saca proyeccion segun pendiente
								var valorInicial = nodo.ptoInicial;
								proyeccionAlcista = Number(valorInicial['valor'] - valorAnterior['valor']) / (valorInicial['num'] - valorAnterior['num']);
								corteMinAlcista = valorAnterior['valor'] - valorAnterior['num'] * proyeccionAlcista;
	//											
								var valorEsperado = proyeccionAlcista * objNuevo['num'] + corteMinAlcista;
								console.log("/******************************* - MEDIDAS PENDIENTE - *************************************************/");
								console.log(objNuevo['valor']);
								console.log(valorEsperado);
								console.log(objNuevo['valor']);
								console.log(valorEsperado);
								console.log("/******************************* - FIN MEDIDAS PENDIENTE - *************************************************/");
								
								//console.log(arrMin);
								//return 'X';
								if(objNuevo['valor'] >= valorEsperado && objNuevo['valor'] - proyeccionAlcista <= valorEsperado){
									
										
										
										
									fnGeneraLineaTendencia_y_orden(jj, valorInicial, objNuevo, arrMinimo);
									//console.log(arrTendencias);
									//return 'X';
									
									
									nodo.arrayPosibles.splice(nodo.arrayPosibles.indexOf(arrPuntos));
									m--;
									s--;	
									
									
									
								} else {
									if(objNuevo['valor'] < valorEsperado){
										arrMin.splice(arrMin.indexOf(valorAnterior), 1);
										arrPuntos.shift();
										arrPuntos.push(objNuevo);
										//nodo.arrayPosibles.removeItemAt(nodo.arrayPosibles.getItemIndex(arrPuntos));
									} else {
										arrMin.pop();											
										if(!objMin.hasOwnProperty(valorAnterior.num)){
											a = {};
											a.ptoInicial = valorAnterior;
											a.arrayPosibles = [];
											a.arrayPosibles[0] = []
											a.arrayPosibles[0].push(objNuevo);
											arrMin.push(a);
											objMin[valorAnterior.num] = valorAnterior;
										}
										
										
									}
								}									
							}	
						}		
					} else {
						nodo.arrayPosibles[0] = []
						nodo.arrayPosibles[0].push(objNuevo);
						
					}
				}	
			}		
			
		}
		
		var velaAux = vela;
		var ext = 1;
		for(var ec in arrTendencias){					
			velaAux[ec.id] = (vela.id) * ec.pendiente + ec.coefCorte;
			if(velaAux[ec.id] > velaAux['close']){
				
				arrTendencias.splice(arrTendencias.indexOf(ec));
		
			} 
			ext++;
		}

	}
	
	
	
	/***************************- FIN NIVELES -********************************/
	
	
	
	
	
	
	
	
	
	////console.log(atrGraf);
	var resp = 'N';
	/*if(orden){
		resp = fnEvaluaCierre(tipo, dato);
		
	}
	if(resp == "N" && orden == null){
		//console.log(orden);
		resp = fnEvaluaVelas(dato, tipo, arrVel);
	}*/
	
	//console.log(orden);
	if(orden != null){	
		//exit();
		console.log(orden.ini + " == " + vela.id)
		if(orden.ini <= vela.id && orden.cierrePost == ''){
			//exit();
			orden.entro = 'OK';	
			orden.cierrePost = orden.tipo == 'C' ? (orden.open <= vela.close ? 'OK' : 'NOOK') : (orden.open >= vela.close ? 'OK' : 'NOOK');
			if(orden.cierrePost == 'NOOK'){
				if(orden.tipo == 'C'){
					if(vela.close > velaAnt.open + (velaAnt.close - velaAnt.open) / 2){
						orden.cierrePost == 'OK';
					} else {
						orden.stopLoss = vela.close;
						fnCierre('close', 'S', vela);
					}
				} else {
					if(vela.close < velaAnt.close + (velaAnt.open - velaAnt.close) / 2){
						orden.cierrePost == 'OK';
					} else {
						orden.stopLoss = vela.close;
						fnCierre('close', 'S', vela);
					}
				}
				
				
			} 
		}
		console.log("////////////////////////////////////////");
		console.log(velaOperativa);
		console.log("////////////////////////////////////////");
		arrOrdenGraf.push(velaOperativa);
		/*fsGrafOrden.appendFileSync('./querysReconstruccion/_logExpFGraf' + (ind) + '.txt', JSON.stringify(velaOperativa) + "\n", (err) => {
			if (err) throw err;
				////console.log('The "data to append" was appended to file!');
			});*/
		
	}
	if(arrVel.length > 30){
		resp = fnEvaluaVelas(dato, tipo, arrVel);
	}
	
	
	
	
	
	
	arrVel.push({open: dato.open, close: dato.close, low: dato.low, high: dato.high, id: objCont[tipo]++, date: dato.date, origen: dato.opt, fecha: dato.fecha, vol: dato.vol});	
	//velaOperativa = {x: objCont[tipo], y:[dato.open, dato.high, dato.low, dato.close], vo: arrVel[arrVel.length - 1]};
	if(arrVel.length > 31){
		arrVel.shift();
	}
	return resp;
}


function fnEvaluaTendencia(velaAnt, vela){
	if(velaAnt.open < velaAnt.close && vela.open > vela.close){
		return TENDENCIA_ALCISTA;
	} else if(velaAnt.open > velaAnt.close && vela.open < vela.close){
		return TENDENCIA_BAJISTA;
	}
	return 0;
}

/*var SenkouSpanA = function(tenkan, kijun){
	this.tenkan, this.kijun
}*/



var MediasJaponesas = function (period){
	this.period = period;
	this.arrData = [];
	this.high = 0;
	this.elim
	this.low = 10000;
};

MediasJaponesas.prototype.genera = function (vela){
	
	//arrData.push(vela);
	//yield arrData;
	//console.log(arrData);
	//this.period = vela.period;
	//console.log(period);
	//for (;;) {
		
		//console.log(vela);
		//console.log(arrData);
		this.arrData.push(vela);
		if(this.arrData.length < this.period){
			//console.log(arrData);
			
			//console.log(arrData);
			this.high = Math.max(this.high, vela.high);
			this.low = Math.min(this.low, vela.low);
			//console.log(high);
			//console.log(low);
			return undefined;
		}  else if(this.arrData.length < this.period + 1){	
			this.high = Math.max(this.high, vela.high);
			this.low = Math.min(this.low, vela.low);
			
		} else {
			//arrData.push(vela);
			//console.log(arrData);

			this.elim = this.arrData.shift();
			
			//console.log(elim);
			/*high = Math.max(high, vela.high);
			low = Math.min(low, vela.low);*/
			if(this.elim.low == this.low){
				this.low = 100000;
				//console.log("length: " + arrData.length);
				for(var i = 0; i < this.arrData.length; i++){
					//console.log(arrData[i]);
					//console.log(i);
					this.low = Math.min(this.low, this.arrData[i].low)
					//console.log("low: " + low);
				}
			}
			if(this.elim.high == this.high){
				this.high = 0;
				for(var i = 0; i < this.arrData.length; i++){
					this.high = Math.max(this.high, this.arrData[i].high)
				}
			}
		}
		return /*{low: low, high: high};//*/this.low + (this.high - this.low) / 2;
	//}	
	


}


		
var period;
	var arrData = [];
	var high = 0;
	var elim;
	var low = 10000;

var Ichimoku = function (rapido, lento, masLento){
	this.cont = 0;
	this.rapido = rapido;
	this.lento = lento;
	this.lento = lento;

	this.tenkan = new MediasJaponesas(rapido);
	this.kijun = new MediasJaponesas(lento);
	this.senkouSpanBCalc = new MediasJaponesas(masLento);
	//this.senkouSpanA = new SenkouSpanA(this.tenkan, this.kijun);
	this.senkouSpanA = [];
	this.senkouSpanB = [];
	for(var i = 0; i < lento - 1; i++){
		this.senkouSpanA.push(undefined);
	}
	for(var i = 0; i < lento - 1; i++){
		this.senkouSpanB.push(undefined);
	}
	//console.log(this.senkouSpanA);
};


Ichimoku.prototype.genera = function (vela){
	var tk = this.tenkan.genera(vela);
	var kj = this.kijun.genera(vela);
	this.senkouSpanA.push(isNaN(Math.min(tk, kj) + (Math.abs(tk - kj) / 2)) ? undefined : Math.min(tk, kj) + (Math.abs(tk - kj) / 2));
	this.senkouSpanB.push(this.senkouSpanBCalc.genera(vela));
	return {tenkan: tk, kijun: kj, senkouSpanA: this.senkouSpanA[this.cont], senkouSpanB: this.senkouSpanB[this.cont++], color: (this.senkouSpanA[this.cont - 1] > this.senkouSpanA[this.cont - 1] ? 'ALZA' : 'BAJA')};
	//return {tenkan: tk, kijun: kj, senkouSpanA: isNaN(Math.min(tk, kj) + (Math.abs(tk - kj) / 2)) ? undefined : Math.min(tk, kj) + (Math.abs(tk - kj) / 2), senkouSpanB: this.senkouSpanBCalc.genera(vela), color: (this.senkouSpanA[this.cont - 1] > this.senkouSpanA[this.cont - 1] ? 'ALZA' : 'BAJA')};
};		
var pruebaMediaJaponesa = new Ichimoku(2, 5, 10);

//var gen = genera();

//console.log(genera());
/*console.log(pruebaMediaJaponesa.genera({high: 10, low: 2, period: 2}));
console.log(pruebaMediaJaponesa.genera({high: 15, low: 5, period: 2}));
console.log(pruebaMediaJaponesa.genera({high: 11, low: 7, period: 2}));
console.log(pruebaMediaJaponesa.genera({high: 18, low: 2, period: 2}));
console.log(pruebaMediaJaponesa.genera({high: 15, low: 2, period: 2}));
console.log(pruebaMediaJaponesa.genera({high: 20, low: 2, period: 2}));
console.log(pruebaMediaJaponesa.genera({high: 21, low: 2, period: 2}));
console.log(pruebaMediaJaponesa.genera({high: 10, low: 2, period: 2}));
console.log(pruebaMediaJaponesa.genera({high: 15, low: 5, period: 2}));
console.log(pruebaMediaJaponesa.genera({high: 11, low: 7, period: 2}));
console.log(pruebaMediaJaponesa.genera({high: 18, low: 2, period: 2}));
console.log(pruebaMediaJaponesa.genera({high: 15, low: 2, period: 2}));
console.log(pruebaMediaJaponesa.genera({high: 20, low: 2, period: 2}));
console.log(pruebaMediaJaponesa.genera({high: 21, low: 2, period: 2}));
console.log(pruebaMediaJaponesa.genera({high: 10, low: 2, period: 2}));
console.log(pruebaMediaJaponesa.genera({high: 15, low: 5, period: 2}));
console.log(pruebaMediaJaponesa.genera({high: 11, low: 7, period: 2}));
console.log(pruebaMediaJaponesa.genera({high: 18, low: 2, period: 2}));
console.log(pruebaMediaJaponesa.genera({high: 15, low: 2, period: 2}));
console.log(pruebaMediaJaponesa.genera({high: 20, low: 2, period: 2}));
console.log(ichimoku.genera({high: 21, low: 2, period: 2}));
*/





var ichimoku = new Ichimoku(3, 12, 24);

var newVela = true;
var dias=["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
    
	
//Create the server and listening to the request


//var arrSec = ['0', '1', '2', '3', '4', '5'];
var sec = -1;
var reqObj;
http.createServer(function onRequest(request, response) {
	request.setEncoding("utf8");
	var content = [];

	request.addListener("data", function(data) {
		content.push(data); //Collect the incoming data
	});
	

	//At the end of request call
	request.addListener("end", function() {
		//setup the response
		response.writeHead( 200, {"Content-Type": "text/plain"} );
		//try{
			ms = content[0];
			////console.log(ms);
			if(ms.toString() != "")
			{
				
				
				var msg = ms.toString();	//Parse the ms into string		
				
				////console.log(msg); // Prints the message in the console
				
				reqObj = JSON.parse(msg);	// If the incoming message is in JSON format, you can parse it as JSON.
				
				var respuesta = "N";
				
				fs3.appendFileSync('./querysReconstruccion/_dataExp.txt', reqObj['fecha'] + ',' + reqObj['date'] + ',' + reqObj['open'] + ',' + reqObj['high'] + ',' + reqObj['low'] + ',' + reqObj['close'] + ',' + reqObj['vol'] + ',' + reqObj['spread'] + "\n", (err) => {
					if (err) throw err;
						////console.log('The "data to append" was appended to file!');
					});
				
				
				//console.log(reqObj.fecha);
				reqObj.close = Number(reqObj.close);
				reqObj.open = Number(reqObj.open);
				reqObj.high = Number(reqObj.high);
				reqObj.low = Number(reqObj.low);
				reqObj.vol = Number(reqObj.vol);
				spread = Number(reqObj.spread);
				reqObj.Ask = Number(reqObj.Ask);
				reqObj.Bid = Number(reqObj.Bid);
				
				//if(reqObj.opt == 'N'){
					//objFunciones[reqObj.date[5] + ''](dato);
					/*arrVelas.push(reqObj);
					fnEvaluaCierre('N', reqObj);
					respuesta = fnEvaluaVelas(reqObj.cierre, 'N', arrVelas);*/
					//respuesta = 'N';
					/*if(reqObj.date[3] == '0' || reqObj.date[3] == '1' || reqObj.date[3] == '2'){
			
						if(newVela == true){
							newVela = false;
							respuesta = fnVelaNueva(reqObj, arrVelas, reqObj.opt);
							
						} else {
							fnVelaNormal(arrVelas[arrVelas.length - 1], reqObj, arrVelas, reqObj.opt);       
						}
					 
					} else {
						newVela = true;
						fnVelaNormal(arrVelas[arrVelas.length - 1], reqObj, arrVelas, reqObj.opt);       				 
				    }*/
				//} else {
					//objFunciones[reqObj.date[5] + ''](dato);					
					////console.log(reqObj);
					/*if(reqObj.date[3] == '3' || reqObj.date[3] == '4' || reqObj.date[3] == '5'){
			
						if(newVela == true){
							newVela = false;
							respuesta = fnVelaNueva(reqObj, arrVelasSombra, reqObj.opt);
							
						} else {
							respuesta = fnVelaNormal(arrVelasSombra[arrVelasSombra.length - 1], reqObj, arrVelasSombra, reqObj.opt);       
						}
					 
					} else {
						newVela = true;
						respuesta = fnVelaNormal(arrVelasSombra[arrVelasSombra.length - 1], reqObj, arrVelasSombra, reqObj.opt);       				 
					}*/

					/************************************-  20 min -****************************************/
					if(reqObj.date[3] == '1' || reqObj.date[3] == '3' || reqObj.date[3] == '5'){
			
						if(newVela == true){
							newVela = false;
							respuesta = fnVelaNueva(reqObj, arrVelasSombra, reqObj.opt);
							
						} else {
							respuesta = fnVelaNormal(arrVelasSombra[arrVelasSombra.length - 1], reqObj, arrVelasSombra, reqObj.opt);       
						}
					 
					} else {
						try{
							newVela = true;
							respuesta = fnVelaNormal(arrVelasSombra[arrVelasSombra.length - 1], reqObj, arrVelasSombra, reqObj.opt);       				 
						} catch(e){
							respuesta = 'N';
						}
					}

					/************************************-  FIN 20 min -****************************************/
					//arrVelasSombra.push(reqObj);
					//respuesta = fnEvaluaVelas(reqObj.cierre, 'S', arrVelasSombra);
				//}
				
				
				
				 
				
				/*
				Here you can have the code to do what you want it to do. You can also use cluster to run a multithreaded app. Or connect to a DB or connect to external web services and collect data, etc
				*/
				
				//Create a dummy response object
				var outObj;
				//console.log(respuesta);
				if(respuesta == "N"){
					outObj = {
						
						value: respuesta, //Just some random value to demonstrate
						msg: "test message",
						cta: cuenta
					}
				} else {
					//console.log(orden);
					outObj = {
						
						value: respuesta, //Just some random value to demonstrate
						msg: "test message",
						stopLoss: orden.stopLoss,
						lote: orden.lote,
						cta: cuenta
					}
				}
					
				
				response.write(JSON.stringify(outObj));	//Write the response
				response.end(); //Close the response

			}
		/*} catch(e) {
			//console.log("ERROR");
		}*/
		

	});

	
	
}).listen(_PORT);

//console.log("Node.js server listening on port "+ _PORT);

