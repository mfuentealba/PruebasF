var fsLauncher = require('fs');
var secNum = [];
var objSec = {};
var contador = 1;
var ind = 1;
var request = require('request');
var EventEmitter = require('events').EventEmitter;
var arrOrdenGraf = [];
var ee = new EventEmitter();
var init;

for(var i = 0; i < 10; i++){	
	secNum.push("0" + i);
	objSec["0" + i] = i - 1;
}

for(var i = 10; i < 60; i++){	
	secNum.push("" + i);
	objSec["" + i] = i - 1;
}




var bearishengulfingpattern = require('./technicalindicators.js').bearishengulfingpattern;
var bullishengulfingpattern = require('./technicalindicators.js').bullishengulfingpattern;
var bearishharamipattern = require('./technicalindicators.js').bearishharami;
var bullishharamipattern = require('./technicalindicators.js').bullishharami;

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
var fsEval = require('fs');
var fsQuery = require('fs');
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
var ajusteStop = 0.001;
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


var arrVelas = [];
var arrVelasSombra = [];	
var arrTamVelas = [];
var tamVelas = 0;	
var orden;
	
var evaluacion = 0;
var cont = 1;
	
	
function fnEvaluaVelas(dato, tipo, arrV){

	return "N";
}	


function fnCierre(opt, origen, vela){
	var arrFecha = vela.fecha.split('.');				
	var dt = new Date(Number(arrFecha[0]), Number(arrFecha[1]) - 1, Number(arrFecha[2]), 0, 0, 0, 0);
	var df = dias[dt.getUTCDay()];
	velaOperativa.indexLabel = 'F';	
	arrOrdenGraf.push(velaOperativa);
				
	orden.fin = velaOperativa;
	
	//exit();
	orden.close = orden.stopLoss;
	
	//orden.fin = vela.date;
	//spread = 0.0002
	orden.total = opt == 'C' ? (orden.close - orden.open - spread) * ajusteDecimal : (orden.open - orden.stopLoss - spread) * ajusteDecimal;//((vela.open - orden.open) * ajusteDecimal) - 16;	
	orden.totalReal = orden.total * orden.lote;//((vela.open - orden.open) * ajusteDecimal) - 16;	
	orden.prop = opt == 'C' ? -(orden.open - orden.min) * ajusteDecimal / orden.stopLossIni : -(orden.max - orden.open) * ajusteDecimal / orden.stopLossIni;
	console.log(spread);
	console.log(opt + ' ' + orden.close + ' ' + orden.open + ' ' + spread + ' ' + ajusteDecimal);
	console.log(orden.totalReal); 
	
	fnCalcCuenta(orden.totalReal);
	//exit
	orden.cta = cuenta;
	
	if(orden.total < -0.01){					
		orden.tipo = orden.tipo == 'V' ? 'S' : 'L';
		malas++;
		objResult[df + 'M']++;
		objEval[orden.cierrePost].malas++;
		try{
			objEval[orden.cierrePost].total += orden.total;
			
		} catch(e){
			exit();
		}
		
		fsOrdMalas.appendFileSync('./querysReconstruccion/_logExpOrdMalas.txt', "**********************************\n" + JSON.stringify(vela) + "\n" + JSON.stringify(velaOperativa) + "\n" + JSON.stringify(orden) + "\n", (err) => {
			if (err) throw err;
				////console.log('The "data to append" was appended to file!');
			});
		fsGrafOrden.appendFileSync('./querysReconstruccion/ordenGraf/_logExpFGrafMala_' + (orden.ini) + '.txt', JSON.stringify(arrOrdenGraf) + ",\n" + JSON.stringify(arrNube) + ",\n" + JSON.stringify(arrTenkan) + ",\n" + JSON.stringify(arrKinjou), (err) => {
			if (err) throw err;
				////console.log('The "data to append" was appended to file!');
			});
		
	} else {
		if(orden.total > 0.01){
			buenas++;
			objResult[df + 'B']++;
			objEval[orden.cierrePost].buenas++;
			try{
				objEval[orden.cierrePost].total += orden.total;			
				
			} catch(e){
				exit();
			}
			
			fsOrdBuenas.appendFileSync('./querysReconstruccion/_logExpOrdBuenas.txt', "**********************************\n" + JSON.stringify(vela) + "\n"  + JSON.stringify(velaOperativa) + "\n" + JSON.stringify(orden) + "\n", (err) => {
			if (err) throw err;
				////console.log('The "data to append" was appended to file!');
			});
			fsGrafOrden.appendFileSync('./querysReconstruccion/ordenGraf/_logExpFGrafBuena_' + (orden.ini) + '.txt', JSON.stringify([]) + ",\n" + JSON.stringify(arrOrdenGraf) + ",\n" + JSON.stringify(arrNube) + ",\n" + JSON.stringify(arrTenkan) + ",\n" + JSON.stringify(arrKinjou), (err) => {
			if (err) throw err;
				////console.log('The "data to append" was appended to file!');
			});
		} else {
			neutras++;
			objResult[df + 'N']++;
			fsGrafOrden.appendFileSync('./querysReconstruccion/ordenGraf/_logExpFGrafNeutra_' + (orden.ini) + '.txt', JSON.stringify(arrOrdenGraf) + ",\n" + JSON.stringify(arrNube) + ",\n" + JSON.stringify(arrTenkan) + ",\n" + JSON.stringify(arrKinjou), (err) => {
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
	
	fs.appendFileSync('./querysReconstruccion/ordenGraf/_queryExp.txt', "INSERT INTO `ordenes`(`nro_prueba`, `ini`, `origen`, `tipo`, `cierrePost`, `open`, `fecha`, `min`, `max`, `prop`, `bb`, `distanciaBB`, `atr`, `stopLossIni`, `dia`, `total`, `volumen`, `tam`, `tamReal`, `tamProm`, `volProm`, `hora`, `close`, `volSig`) VALUES (10,'" + orden.ini + "','" + orden.origen + "','" + orden.tipo + "','" + orden.cierrePost + "','" + orden.open + "','" + orden.fecha + "','" + orden.min + "','" + orden.max + "','" + orden.prop + "','" + orden.bb + "','" + orden.res + "','" + orden.atr + "','" + orden.stopLossIni + "','" + orden.dia + "','" + orden.total + "','" + orden.vol + "','" + orden.tam + "','" + orden.tamTotal + "','" + orden.tamProm + "','" + orden.volProm + "','" + orden.date + "','" + orden.close + "','" + orden.volSig + "');\n", (err) => {
		if (err) throw err;
			////console.log('The "data to append" was appended to file!');
		});
	fnImprimirOperacion();
	orden = null;
	fsEval.appendFileSync('./querysReconstruccion/ordenGraf/ResultadoEval.txt', JSON.stringify(objEval) + ",\n", (err) => {
		if (err) throw err;
			////console.log('The "data to append" was appended to file!');
		});
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



function fnEvaluaCierre(origen, vela, arrV, opt){
	if(orden != null && orden.trigger == 'rompeTenkan'){
		//exit
		if(opt == 'N'){
			vela = arrV[arrV.length - 1];	
		}
		
		
		if(orden.tipo == 'C'
			&& vela.close > bb.upper
			
			
		){

			//orden.stopLoss = orden.stopLoss > orden.open ? orden.stopLoss : vela.open;
			if(orden.stopLoss > orden.open){
				if(Math.abs(vela.open - vela.close) > Math.abs(vela.high - vela.low) * 2){
					return "N";
				}
				orden.ind++;
			}
			orden.stopLoss = vela.open;
			console.log(vela);	
			
			
			
			return fnCierre("C", origen, vela);
		} else if(
			
				orden.tipo == 'V'
				&& vela.close < bb.lower
			
		){
			//orden.stopLoss = orden.stopLoss < orden.open ? orden.stopLoss : vela.open;
			if(orden.stopLoss < orden.open){
				if(Math.abs(vela.open - vela.close) > Math.abs(vela.high - vela.low) * 2){
					return "N";
				}
				orden.ind++;
			}
			console.log(vela);
			orden.stopLoss = vela.open;	
						
			return fnCierre("V", origen, vela);
		} else {
			if(orden.tipo == 'C' && vela.close > orden.open + ajusteStop / 2 + spread){
				if(orden.stopLoss < orden.open + spread){
					orden.stopLoss = orden.open + spread + 0.00010;
					orden.takeProfit = vela.close + ajusteStop;
				}				
				return 'A'; 
			}

			if(orden.tipo == 'V' && vela.close < orden.open - (ajusteStop / 2 + spread)){
				if(orden.stopLoss > orden.open - spread){
					orden.stopLoss = orden.open - spread - 0.00010;
					orden.takeProfit = vela.close - ajusteStop;
				} 
				return 'A'; 
			}	
		}
	} 
	return 'N';
}



function fnImprimirOperacion(){
	/*fs.appendFileSync('./querysReconstruccion/_logExp.txt', JSON.stringify(orden) + "\nBUENAS: " + buenas + ", MALAS: " + malas + ", NEUTRAS: " + neutras + "\n", (err) => {
		if (err) throw err;
			////console.log('The "data to append" was appended to file!');
		});*/

	
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
		console.log("ERROR fnImprimirOperacion");
	}	
}

function fnVelaNormal(vela, dato, arrVel, tipo){
	
	/*dato[2] = Number(dato[2]);
	dato[3] = Number(dato[3]);
	dato[4] = Number(dato[4]);*/
	var resp = 'N';
	try {
		vela.close = dato.close;
		vela.vol += dato.vol;
	
		
	
	
		if(dato.high > vela.high){
			vela.high = dato.high;
			
		}
		
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
			if(orden.tipo == "C" && orden.open < orden.stopLoss && vela.low < orden.stopLoss){
				orden.ind++;
				//return fnCierre("C", "S", vela);
			}

			if(orden.tipo == "V" && orden.open > orden.stopLoss && vela.low > orden.stopLoss){
				orden.ind++;
				//return fnCierre("V", "S", vela);
			}
			resp = fnEvaluaCierre(tipo, dato, arrVel, 'M');//------->HABILITAR SI ES NECESARIO TESTEAR LAS ORDENES A CADA MOMENTO
			
		} else {
			if(vela.close > bb.upper && vela.close - bb.upper > (bb.upper - vela.open) * 3 / 2){
				
				fnVenta(dato, tipo, arrVel, 'open', 'rompeTenkan');
			} else if(vela.close < bb.lower && bb.lower - vela.close > (vela.open - bb.lower) * 3 / 2){
				fnCompra(dato, tipo, arrVel, 'open', 'rompeTenkan');
			}
			
		}
		/*if(resp == "N" && orden == null){
			////console.log(orden);
			resp = objFunciones[evaluacion + '_' + cont](vela, tipo, arrVel);
		}*/
			
	} catch (error) {
		
	}
	
	return resp;
	
}//2134068

function fnCalcCuenta(cierre){
	if(cuenta > 0){
		let garantia = cuenta / 10;
		cuenta = cuenta + Number(cierre);
		console.log(cuenta + " " + cierre)
		//exit
		if(cuenta < garantia){
			cuenta = -1;
			fsEval.appendFileSync('./querysReconstruccion/ordenGraf/ResultadoEval.txt', JSON.stringify(objEval) + ",\n", (err) => {
				if (err) throw err;
					////console.log('The "data to append" was appended to file!');
				});
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


function fnCompra(vela, tipo, arrV, param, origen){
	
		if(cuenta > 0){
			var velaOp = arrV[arrV.length - 1];
			var arr = ((arrV[arrV.length - 1].close +  atrGraf) + '').split('.');
			var evaluando = Number(arr[0] + '.' + (Math.round(Number(arr[1]) * Math.pow(10, 4 - arr[1].length))));
			console.log("/********************* - REVISION - *************************/");
			console.log("NIVEL: " + evaluando);
			
			console.log("/********************* - FIN REVISION - *************************/");
			
			var pos;
			
			if(param == 'open'){
				pos = 0;
			} else {
				pos = 1;
			}
			orden = {ini: velaOp.id, ind: 0, trigger: origen, origen: tipo, tipo: 'C', cierrePost: '', fin: 0, date: velaOp.date, vol: velaOp.vol, open: vela[param], fecha: vela.fecha, /*atr: atrGraf, */min: vela.low, max: vela.high, prop: 0, bb: bbGraf.upper, res: vela[param] - bbGraf.upper, atr: atrGraf, volProm: volProm, tamProm: tamVelas};
			////console.log(arrV);
			var arrFecha = vela.fecha.split('.');				
			var dt = new Date(Number(arrFecha[0]), Number(arrFecha[1]) - 1, Number(arrFecha[2]), 0, 0, 0, 0);
			
			orden.stopLoss = vela.low - spread - 0.00100;
			orden.stopLossIni = Math.round(Math.abs(orden.open - orden.stopLoss) * ajusteDecimal);
			orden.takeProfit = vela[param] + 3 * atrGraf;
			nStopLoss = 0;
			orden.lote = ponderado;
			orden.tam = Math.abs(velaOp.open - velaOp.close);
			orden.tamTotal = Math.abs(velaOp.high - velaOp.low);
			orden.dia = dias[dt.getUTCDay()];
			console.log("************************** INICIO ORDEN ****************************");
			console.log(orden);
			console.log("\n\n\n");	
			velaOperativa.indexLabel = 'I';
			fsOrdenes.appendFileSync('./querysReconstruccion/_logExpOrdenes.txt', JSON.stringify(orden) + "\n", (err) => {
				if (err) throw err;
					////console.log('The "data to append" was appended to file!');
				});
			return "C";	
			
					
		}
		return "N";
	
}

function fnVenta(vela, tipo, arrV, param, origen){
	var ev = false;
	var velaOp = arrV[arrV.length - 1];
	var arr = ((arrV[arrV.length - 1].close -  atrGraf) + '').split('.');
	var evaluando = Number(arr[0] + '.' + (Math.round(Number(arr[1]) * Math.pow(10, 4 - arr[1].length))));
	if(cuenta > 0){
			
		console.log("/********************* - FIN REVISION - *************************/");
			
				
		var pos;
		if(param == 'open'){
			pos = 0;
		} else {
			pos = 1;
		}
		
		orden = {ini: velaOp.id, ind: 0, trigger: origen,  origen: tipo, tipo: 'V', cierrePost: '',fin: 0, date: velaOp.date, vol: velaOp.vol, open: vela[param], fecha: vela.fecha/*, atr: atrGraf*/, min: vela.low, max: vela.high, prop: 0, bb: bbGraf.lower, res: vela[param] - bbGraf.lower, atr: atrGraf, volProm: volProm, tamProm: tamVelas};
		var arrFecha = vela.fecha.split('.');
		var dt = new Date(Number(arrFecha[0]), Number(arrFecha[1]) - 1, Number(arrFecha[2]), 0, 0, 0, 0);
		nStopLoss = 0;
		orden.lote = ponderado;
		orden.tam = Math.abs(velaOp.open - velaOp.close);
		orden.tamTotal = Math.abs(velaOp.high - velaOp.low);
		orden.stopLoss = vela.high + spread + 0.00100;
		orden.stopLossIni = Math.round(Math.abs(orden.open - orden.stopLoss) * ajusteDecimal);
		orden.takeProfit = vela[param] - 3 * atrGraf;
		//orden.stopLoss = orden.open + (orden.stopLossIni * 3 / 4) / ajusteDecimal;
		orden.dia = dias[dt.getUTCDay()];
		console.log("************************** INICIO ORDEN ****************************");
		console.log(vela);
		console.log(orden);
		velaOperativa.indexLabel = 'I';
		console.log("\n\n\n");
		
		fsOrdenes.appendFileSync('./querysReconstruccion/_logExpOrdenes.txt', JSON.stringify(orden) + "\n", (err) => {
			if (err) throw err;
				////console.log('The "data to append" was appended to file!');
			});
		return "V";
	
	
			
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
var inicioOrden;
var arrHistoriaOrden;
function fnMaxMin(opt, velaAnt, vela){
	if(opt == 'min'){
		
		var arr = String(vela.low).split('.');
		var lowV = Number(arr[0] + '.' + (Math.round(Number(arr[1]) * Math.pow(10, 4 - arr[1].length))));
		arr = String(velaAnt.low).split('.');
		var lowVA= Number(arr[0] + '.' + (Math.round(Number(arr[1]) * Math.pow(10, 4 - arr[1].length))));
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


function fnVelaNueva(dato, arrVel, tipo){
	//console.log('fnVelaNueva');
	//console.log(tipo);
	var vela = arrVel[arrVel.length - 1];
	var velaAnt = arrVel[arrVel.length - 2];
	var resp = 'N';

	//console.log(objEval);
	
	/************************************- NIVELES -********************************************/
	if(vela){
		
		bbGraf = bb.nextValue(Number(vela.close));
		velaOperativa = {x: vela.id, y:[vela.open, vela.high, vela.low, vela.close], vo: vela};
		arrVol.push(vela.vol/5);
		if(arrVol.length < 5){
			volProm += vela.vol/5;
		} else {
			volProm += vela.vol/5 - arrVol.shift();
		}
		
		
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
									
										
										
										
									//fnGeneraLineaTendencia_y_orden(jj, valorInicial, objNuevo, arrMaximo);
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
	
	
	
	
	
	
	
	
	
	
	var resp = 'N';
	if(orden != null){	
		//exit();
		console.log(orden.ini + " == " + vela.id)
		if(orden.ini <= vela.id && orden.cierrePost == ''){
			//exit();
			orden.entro = 'OK';	
			orden.cierrePost = orden.tipo == 'C' ? (orden.open <= vela.close ? 'OK' : 'NOOK') : (orden.open >= vela.close ? 'OK' : 'NOOK');
			orden.volSig = vela.vol;
			if(orden.cierrePost == 'NOOK'){
				
				
				console.log(orden.tipo);
				orden.stopLoss = vela.close;
				//fnCierre(orden.tipo, 'S', vela);
				 
				if(orden.tipo == 'C'){
					
					if(vela.close > velaAnt.open + (velaAnt.close - velaAnt.open) / 3){
						console.log('OK2');
						orden.cierrePost = 'OK2';
						orden.stopLoss = orden.stopLoss + orden.stopLossIni/200000;
					} else {
						console.log('CERRAR');
						orden.stopLoss = vela.close;
						fnCierre(orden.tipo, 'S', vela);
					}
				} else {
					if(vela.close < velaAnt.close + (velaAnt.open - velaAnt.close) / 3){
						console.log('OK2');
						orden.cierrePost = 'OK2';
						orden.stopLoss = orden.stopLoss - orden.stopLossIni/200000;
					} else {
						console.log('CERRAR');
						orden.stopLoss = vela.close;
						fnCierre(orden.tipo, 'S', vela);
					}
				}
				/*console.log(orden);
				exit();				*/
			} 
			try{
				objEval[orden.cierrePost]['cont']++;
				objEval[orden.cierrePost].arrVelas.push({ini: orden.ini, tam: orden.tam, tamTotal: orden.tamTotal, result: 0, resultMin: 0, resultMax: 0});
				
			} catch(e){
				objEval['']['cont']++;
				console.log("[[[[[[[[[[[[[ - SE CAYO - ]]]]]]]]]]]]]");
			}
			
		}
		console.log("////////////////////////////////////////");
		console.log(velaOperativa);
		console.log("////////////////////////////////////////");
		
		/*fsGrafOrden.appendFileSync('./querysReconstruccion/_logExpFGraf' + (ind) + '.txt', JSON.stringify(velaOperativa) + "\n", (err) => {
			if (err) throw err;
				////console.log('The "data to append" was appended to file!');
			});*/
		
	}

	

	if(arrVel.length > 30){
		
		resp = fnEvaluaVelas(dato, tipo, arrVel);
	}
	
	
	arrOrdenGraf.push(velaOperativa);
	
	
	
	
	arrVel.push({open: dato.open, close: dato.close, low: dato.low, high: dato.high, id: objCont[tipo]++, date: dato.date, origen: dato.opt, fecha: dato.fecha, vol: dato.vol});	
	//velaOperativa = {x: objCont[tipo], y:[dato.open, dato.high, dato.low, dato.close], vo: arrVel[arrVel.length - 1]};
	if(arrVel.length > 31){
		arrVel.shift();
	}
	

	return resp;

}


var arrVol = [];
var volProm = 0;
var objEval = {OK:{cont: 0, buenas:0, malas:0, arrVelas:[], total: 0}, NOOK: {cont: 0, buenas:0, malas:0, arrVelas:[], total: 0}, OK2:{cont: 0, buenas:0, malas:0, arrVelas:[], total: 0}, '': {cont: 0, buenas:0, malas:0, arrVelas:[], total: 0}};



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


		
var period;
	var arrData = [];
	var high = 0;
	var elim;
	var low = 10000;






var newVela = true;
var dias=["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
    
var sec = -1;
var reqObj;

	
	

	//At the end of request call
	function fnProcesando(reqObj) {
		//setup the response
		
		//try{
			
			////console.log(ms);
			if(reqObj != null)
			{
				
				
				
				
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
				
				

					/************************************-  5 min -****************************************/
					/*var d = new Date(reqObj.fecha + ':' + reqObj.date);
					d = d.getTime();
					while(d != init++){					
						if((init / 1000) % 5 == 0){
							respuesta = fnVelaNueva(reqObj, arrVelasSombra, reqObj.opt);
							
						} else {
							try{
								newVela = true;
								respuesta = fnVelaNormal(arrVelasSombra[arrVelasSombra.length - 1], reqObj, arrVelasSombra, reqObj.opt);       				 
							} catch(e){
								respuesta = 'N';
							}
						}
						
						
					}
					if((init / 1000) % 5 == 0){
							respuesta = fnVelaNueva(reqObj, arrVelasSombra, reqObj.opt);
							
					} else {
						try{
							newVela = true;
							respuesta = fnVelaNormal(arrVelasSombra[arrVelasSombra.length - 1], reqObj, arrVelasSombra, reqObj.opt);       				 
						} catch(e){
							respuesta = 'N';
						}
					}*/
					

					/************************************-  FIN 5 min -****************************************/
					
					
					/************************************-  1 dia -****************************************/
					/*var d = new Date(reqObj.fecha + ':' + reqObj.date);
					d = d.getTime();
					while(d != init++){					
						if((init / 1000) % 5 == 0){
							respuesta = fnVelaNueva(reqObj, arrVelasSombra, reqObj.opt);
							
						} else {
							try{
								newVela = true;
								respuesta = fnVelaNormal(arrVelasSombra[arrVelasSombra.length - 1], reqObj, arrVelasSombra, reqObj.opt);       				 
							} catch(e){
								respuesta = 'N';
							}
						}
						
						
					}
					if((init / 1000) % 5 == 0){
							respuesta = fnVelaNueva(reqObj, arrVelasSombra, reqObj.opt);
							
					} else {
						try{
							newVela = true;
							respuesta = fnVelaNormal(arrVelasSombra[arrVelasSombra.length - 1], reqObj, arrVelasSombra, reqObj.opt);       				 
						} catch(e){
							respuesta = 'N';
						}
					}*/
					

					/************************************-  FIN 1 dia -****************************************/




					if(reqObj.date[3] == '5' || reqObj.date[3] == '3' || reqObj.date[3] == '5'){
						
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
					
				
				
				return outObj;

			}
		/*} catch(e) {
			//console.log("ERROR");
		}*/
		

	}

	


//console.log("Node.js server listening on port "+ _PORT);

var arrFile = ["./marketdata/EURUSD1.csv"/*, "./marketdata/EURUSD-2016-02.csv", "./marketdata/EURUSD-2016-03.csv", "./marketdata/EURUSD-2016-04_1.csv", "./marketdata/EURUSD-2016-04_2.csv"/*, "./marketdata/EURUSD-2016-05.csv", "./marketdata/EURUSD-2016-06.csv", "./marketdata/EURUSD-2016-07.csv", "./marketdata/EURUSD-2016-08.csv", "./marketdata/EURUSD-2016-09.csv", "./marketdata/EURUSD-2016-10.csv", "./marketdata/EURUSD-2016-11.csv"*/];

var cnt = 0;

function fnLecturaArchivo(err, data){
	console.log(err);
	var arr = [];
	if(arrFile.length == cnt){
		//console.log(data);
		try{
			arr = arr.concat(('' + data).split("\n"));	
		} catch(e){
			console.log(err);
		}
		
		
		init = arr[0].split(',');
		init = new Date(init[0] + ':' + init[1]);
		init = init.getTime();
		
		//for(let i in arr){
		for(let i = 1; i < arr.length/1 - 1; i++){	
			var dato = arr[i - 1].split(',');
			var cierre = arr[i].split(',')[2];
			//var arrFecha = dato[0].split(".");	
			var sw = true;
			var objReq = {"open": dato[2], "close": dato[5], "high": dato[3], "low": dato[4], "spread": 0.00015, "opt": "S", "date": dato[1], "fecha": (dato[0]), "vol": Number(dato[6])};
			
			//request.post({url: 'http://localhost:9191', form: objReq}, fnRecepcion);
			var resp = fnProcesando(objReq);
			if(resp.cta == -1){
				break;
			}
			//console.log();
									
		}
		
	}
}


console.log('inicio Proceso');


//fs.readFile("FIX.4.4-TOMADOR_DE_ORDENES-ORDERROUTER.messages_20170809.log", 'utf8', function(err, data) {
fs.readFile(arrFile[cnt++], 'utf8', function(err, data) {
	
		
	
	fnLecturaArchivo(err, data);
});

//console.log("FIN");
	


