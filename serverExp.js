var fsLauncher = require('fs');
var secNum = [];
var objSec = {};
var contador = 1;

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
		console.log(err);
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
ini = {low:[], high:[], close:[], period: 14};
var atr = new ATR(ini);
var fs = require('fs');
var fs2 = require('fs');
var fs3 = require('fs');
var fsGraf = require('fs');
var fsOrdenes = require('fs');
var fsOrdMalas = require('fs');
var fsOrdBuenas = require('fs');
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

var objResult = {lunB: 0, lunM: 0, lunN: 0, lunT: 0, marB: 0, marM: 0, marN: 0, marT: 0, mieB: 0, mieM: 0, mieN: 0, mieT: 0, jueB: 0, jueM: 0, jueN: 0, jueT: 0, vieB: 0, vieM: 0, vieN: 0, vieT: 0}
"lun", "mar", "mie", "jue", "vie"



var cuenta = 100;
var ponderado = .1;
var spread = 0.00020;
var ajusteStop = 0.0004;
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
	//console.log(fnVentaEval);
	evaluacion = 0;
	cont = 1;
	if(vela.open > vela.close){
		return fnVenta(vela, tipo, arrVel, 'close');
		
	}
	return 'N';
}

function fnCompraEval(vela, tipo, arrVel){
	//console.log(fnCompraEval);
	evaluacion = 0;
	cont = 1;
	if(vela.open < vela.close){
		return fnCompra(vela, tipo, arrVel, 'close');
		
	}
	return 'N';
}



function fnNo(dato){
	//console.log(fnCompraEval);
	return 'N';
}

function fnSi(dato){
	//console.log(fnVentaEval);
	cont ++;
	return 'N';
}

var http = require("http");

var _PORT = 9191; //Http port Node.js server will be listening on. Make sure that this is an open port and its the same as the one defined in MT4 indicator/EA.
	
var arrVelas = [{id: 1, date: 1, open: 0, close: 0, high: 0, low: 100}];
var arrVelasSombra = [{id: 1, date: 1, open: 0, close: 0, high: 0, low: 100}];	
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
			console.log('bearishengulfingpattern');
			
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
			console.log('bullishengulfingpattern');
			
		}
	
		/*
		if(orden == null && sw){
			var arrFecha = dato.fecha.split('.');
			var dt = new Date(Number(arrFecha[0]), Number(arrFecha[1]) - 1, Number(arrFecha[2]), 0, 0, 0, 0);
				
			if(dias[dt.getUTCDay()] == 'jue'){			
								
				switch(evaluacion){
					case 2:
						evaluacion = 0;
						return fnVenta(dato, tipo, arrV, 'open');
					
					case 3:
						evaluacion = 0;
						return fnCompra(dato, tipo, arrV, 'open');
					
				}
				
			}
			
		}
		*/
	}
	return "N";
}	

function fnEvaluaCierre(origen, vela){
	if(orden != null && origen == orden.origen){
		console.log(orden);
		var arrFecha = vela.fecha.split('.');				
		var dt = new Date(Number(arrFecha[0]), Number(arrFecha[1]) - 1, Number(arrFecha[2]), 0, 0, 0, 0);
		var df = dias[dt.getUTCDay()];	
		if(orden.tipo == 'C'){
			if(vela.low < orden.stopLoss){
				orden.close = orden.stopLoss;
				
				orden.fin = vela.date;
				orden.total = (orden.close - orden.open - spread) * ajusteDecimal;//((vela.open - orden.open) * ajusteDecimal) - 16;	
				orden.totalReal = orden.total * orden.lote;//((vela.open - orden.open) * ajusteDecimal) - 16;	
				orden.prop = -(orden.open - orden.min) * ajusteDecimal / orden.stopLossIni;
				fnCalcCuenta(orden.totalReal);
				orden.cta = cuenta;
				
				if(orden.total < -0.01){					
					orden.tipo = 'L';
					malas++;
					objResult[df + 'M']++;
					fsOrdMalas.appendFileSync('./querysReconstruccion/_logExpOrdMalas.txt', "**********************************\n" + JSON.stringify(vela) + "\n" + JSON.stringify(orden) + "\n", (err) => {
						if (err) throw err;
							//console.log('The "data to append" was appended to file!');
						});
					
				} else {
					if(orden.total > 0.01){
						buenas++;
						objResult[df + 'B']++;
						fsOrdBuenas.appendFileSync('./querysReconstruccion/_logExpOrdBuenas.txt', "**********************************\n" + JSON.stringify(vela) + "\n" + JSON.stringify(orden) + "\n", (err) => {
						if (err) throw err;
							//console.log('The "data to append" was appended to file!');
						});
					} else {
						neutras++;
						objResult[df + 'N']++;
					}
				}
				objResult[df + 'T'] += orden.total;
				fs2.appendFileSync('./querysReconstruccion/_logExpF.txt', JSON.stringify(objResult) + "\n", (err) => {
					if (err) throw err;
						//console.log('The "data to append" was appended to file!');
					});
                fsOrdenes.appendFileSync('./querysReconstruccion/_logExpOrdenes.txt', JSON.stringify(vela) + "\n", (err) => {
                if (err) throw err;
                    //console.log('The "data to append" was appended to file!');
                });
				fnImprimirOperacion();
				orden = null;
				//return "X";
				return "N";
			} else {
				if(vela.close > orden.open + ajusteStop/2 + spread){
					if(orden.stopLoss < orden.open + spread){
						orden.stopLoss = orden.open + spread;
					} else {
						if(vela.close > ajusteStop + orden.stopLoss){
							orden.stopLoss = vela.close - ajusteStop;
						}
						
					}
					fnImprimirOperacion();
					return 'A'; 
				}
			}
			
		} else {
            console.log('velaClose: ' + vela.close + ' < ' + (orden.open - (ajusteStop + spread)));
			if(vela.high > orden.stopLoss){
				orden.close = orden.stopLoss;
				orden.fin = vela.date;
				orden.total = (orden.open - orden.stopLoss - spread) * ajusteDecimal;//((vela.open - orden.open) * -ajusteDecimal) - 16;
				orden.totalReal = orden.total * orden.lote;//((vela.open - orden.open) * -ajusteDecimal) - 16;
				orden.prop = -(orden.max - orden.open) * ajusteDecimal / orden.stopLossIni;
				fnCalcCuenta(orden.totalReal);
				orden.cta = cuenta;
				if(orden.total < -0.01){
					orden.tipo = 'S';
					malas++;
					objResult[df + 'M']++;
					fsOrdMalas.appendFileSync('./querysReconstruccion/_logExpOrdMalas.txt', "**********************************\n" + JSON.stringify(vela) + "\n" + JSON.stringify(orden) + "\n", (err) => {
						if (err) throw err;
							//console.log('The "data to append" was appended to file!');
						});
				} else {
					if(orden.total > 0.01){
						buenas++;
						objResult[df + 'B']++;
						fsOrdBuenas.appendFileSync('./querysReconstruccion/_logExpOrdBuenas.txt', "**********************************\n" + JSON.stringify(vela) + "\n" + JSON.stringify(orden) + "\n", (err) => {
						if (err) throw err;
							//console.log('The "data to append" was appended to file!');
						});
					} else {
						neutras++;
						objResult[df + 'N']++;
					}
				}
				objResult[df + 'T'] += orden.total;
				fs2.appendFileSync('./querysReconstruccion/_logExpF.txt', JSON.stringify(objResult) + "\n", (err) => {
					if (err) throw err;
						//console.log('The "data to append" was appended to file!');
					});
                fsOrdenes.appendFileSync('./querysReconstruccion/_logExpOrdenes.txt', JSON.stringify(vela) + "\n", (err) => {
                    if (err) throw err;
                        //console.log('The "data to append" was appended to file!');
                    });
				fnImprimirOperacion();
				orden = null;
				//return "X";
				return "N";
			} else {
                
				if(vela.close < orden.open - (ajusteStop/2 + spread)){
					if(orden.stopLoss > orden.open - spread){
						orden.stopLoss = orden.open - spread;
					} else {
						if(vela.close < orden.stopLoss - ajusteStop){
							orden.stopLoss = vela.close + ajusteStop;
						}
						
					}
					fnImprimirOperacion();
					return 'A'; 
				}
			}
		}
		
	}
	return 'N';
}

function fnImprimirOperacion(){
	fs.appendFileSync('./querysReconstruccion/_logExp.txt', JSON.stringify(orden) + "\nBUENAS: " + buenas + ", MALAS: " + malas + ", NEUTRAS: " + neutras + "\n", (err) => {
		if (err) throw err;
			//console.log('The "data to append" was appended to file!');
		});
	fsOrdenes.appendFileSync('./querysReconstruccion/_logExpOrdenes.txt', JSON.stringify(orden) + "\nBUENAS: " + buenas + ", MALAS: " + malas + ", NEUTRAS: " + neutras + "\n", (err) => {
		if (err) throw err;
			//console.log('The "data to append" was appended to file!');
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
	console.log(evaluacion + '_' + cont);
    if(orden){
		if(dato.high > orden.max){
			orden.max = dato.high;
			
		}

		if(dato.low < orden.min){
			orden.min = dato.low;		
		}	
		resp = fnEvaluaCierre(tipo, dato);
		
	}
	if(resp == "N" && orden == null){
		//console.log(orden);
		resp = objFunciones[evaluacion + '_' + cont](vela, tipo, arrVel);
	}
	
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
					console.log("INT: " + ponderado);
					ponderado = Number(ponderado) / 100;
				} else {
					if(cuenta / 1000 < loteMin){
						ponderado = parseInt((loteMin * 100) + '');
						console.log("INT: " + ponderado);
						ponderado = Number(ponderado) / 100;
					} else {
						ponderado = cuenta / 1000;
						ponderado = parseInt(((cuenta / 1000) * 100) + '');
						console.log("INT: " + ponderado);
						ponderado = Number(ponderado) / 100;
					}
	
				}
			}
						
		}
	}
}

function fnCompra(vela, tipo, arrV, param){
	
		if(cuenta > 0){
			//if(vela.close - arrV[arrV.length - 1].close > 0){
				var pos;
				if(param == 'open'){
					pos = 0;
				} else {
					pos = 1;
				}
				orden = {ini: vela.id, origen: tipo, open: vela[param], tipo: 'C', fecha: vela.fecha, /*atr: atrGraf, */min: vela.low, max: vela.high, prop: 0, bb: bbGraf.upper, res: vela[param] - bbGraf.upper, atr: atrGraf};
				//console.log(arrV);
				var arrFecha = vela.fecha.split('.');				
				var dt = new Date(Number(arrFecha[0]), Number(arrFecha[1]) - 1, Number(arrFecha[2]), 0, 0, 0, 0);
				
				//orden.stopLoss = (-Math.abs(arrV[arrV.length - 3].close - arrV[arrV.length - 2].close) - 26) < -166 ? orden.open - 0.00166 : arrV[arrV.length - 3].close - spread - 0.00010;
				orden.stopLoss = (-Math.abs(arrV[arrV.length - 2 - pos].close - arrV[arrV.length - 1 - pos].close) - 0.00010 - spread) * ajusteDecimal < -166 ? orden.open - 0.00166 : arrV[arrV.length - 2 - pos].close - spread - 0.00010;
                orden.stopLoss = arrV[arrV.length - 2 - pos].close - spread - 0.00010;
				orden.stopLossIni = Math.round(Math.abs(orden.open - orden.stopLoss) * ajusteDecimal);
				orden.stopLoss = orden.open - (orden.stopLossIni * 3 / 4) / ajusteDecimal;
				nStopLoss = 0;
				orden.lote = ponderado;
				
				orden.dia = dias[dt.getUTCDay()];
				console.log("************************** INICIO ORDEN ****************************");
				console.log(orden);
				console.log("\n\n\n");	
				fs.appendFileSync('./querysReconstruccion/_logExp.txt', JSON.stringify(orden) + " ......\n", (err) => {
					if (err) throw err;
						//console.log('The "data to append" was appended to file!');
					});
				fsOrdenes.appendFileSync('./querysReconstruccion/_logExpOrdenes.txt', JSON.stringify(orden) + "\n", (err) => {
					if (err) throw err;
						//console.log('The "data to append" was appended to file!');
					});
				return "C";	
			//}
					
		}
		return "N";
	
}

function fnVenta(vela, tipo, arrV, param){
	
		if(cuenta > 0){
			//if(arrV[arrV.length - 1].close - vela.close > 0){
				var pos;
				if(param == 'open'){
					pos = 0;
				} else {
					pos = 1;
				}
				
				orden = {ini: vela.id, origen: tipo, open: vela[param], tipo: 'V', fecha: vela.fecha/*, atr: atrGraf*/, min: vela.low, max: vela.high, prop: 0, bb: bbGraf.lower, res: vela[param] - bbGraf.lower, atr: atrGraf};
				var arrFecha = vela.fecha.split('.');
				var dt = new Date(Number(arrFecha[0]), Number(arrFecha[1]) - 1, Number(arrFecha[2]), 0, 0, 0, 0);
				nStopLoss = 0;
				orden.lote = ponderado;
				//orden.stopLoss = -Math.abs(arrV[arrV.length - 3].close - arrV[arrV.length - 2].close) - spread - 26 - 0.00010 < -166 ? orden.open + 0.00166 : arrV[arrV.length - 3].close + spread + 0.00010;
				//orden.stopLoss = (-Math.abs(arrV[arrV.length - 2 - pos].close - arrV[arrV.length - 1 - pos].close) - 0.00010 - spread) * ajusteDecimal < -166 ? orden.open + 0.00166 : arrV[arrV.length - 2 - pos].close + spread + 0.00010;
                orden.stopLoss = arrV[arrV.length - 2 - pos].close + spread + 0.00010;
				orden.stopLossIni = Math.round(Math.abs(orden.open - orden.stopLoss) * ajusteDecimal);
				orden.stopLoss = orden.open + (orden.stopLossIni * 3 / 4) / ajusteDecimal;
				orden.dia = dias[dt.getUTCDay()];
				console.log("************************** INICIO ORDEN ****************************");
				console.log(vela);
				console.log(orden);
				console.log("\n\n\n");
				fs.appendFileSync('./querysReconstruccion/_logExp.txt', JSON.stringify(orden) + " .....\n", (err) => {
					if (err) throw err;
						//console.log('The "data to append" was appended to file!');
					});
				fsOrdenes.appendFileSync('./querysReconstruccion/_logExpOrdenes.txt', JSON.stringify(orden) + "\n", (err) => {
					if (err) throw err;
						//console.log('The "data to append" was appended to file!');
					});
				return "V";
			//}
			
			
		}
	
		return "N";
}


var atrGraf;
function fnVelaNueva(dato, arrVel, tipo){
	console.log('fnVelaNueva');
	console.log(tipo);
	atrGraf = atr.nextValue({close: [dato.close], high: [dato.high], low: [dato.low]});
	
	var vela = arrVel[arrVel.length - 1];
	bbGraf = bb.nextValue(Number(vela.close));
	console.log(bbGraf);
	velaOperativa = {x: vela.id, y:[vela.open, vela.high, vela.low, vela.close], vo: vela};
	
	fs.appendFileSync('./querysReconstruccion/_logExp.txt', JSON.stringify(velaOperativa) + "\n", (err) => {
		if (err) throw err;
			//console.log('The "data to append" was appended to file!');
		});
	
	console.log(atrGraf);
	var resp = 'N';
	if(orden){
		resp = fnEvaluaCierre(tipo, dato);
		
	}
	if(resp == "N" && orden == null){
		console.log(orden);
		resp = fnEvaluaVelas(dato, tipo, arrVel);
	}
	
	
	arrVel.push({open: dato.open, close: dato.close, low: dato.low, high: dato.high, id: objCont[tipo]++, date: dato.date, origen: dato.opt, fecha: dato.fecha, vol: dato.vol});	
	if(arrVel.length > 12){
		arrVel.shift();
	}
	return resp;
}

var newVela = true;
var dias=["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
    
	
//Create the server and listening to the request


//var arrSec = ['0', '1', '2', '3', '4', '5'];
var sec = -1;

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
			//console.log(ms);
			if(ms.toString() != "")
			{
				
				
				var msg = ms.toString();	//Parse the ms into string		
				
				//console.log(msg); // Prints the message in the console
				
				var reqObj = JSON.parse(msg);	// If the incoming message is in JSON format, you can parse it as JSON.
				
				var respuesta = "N";
				
				fs3.appendFileSync('./querysReconstruccion/_dataExp.txt', reqObj['fecha'] + ',' + reqObj['date'] + ',' + reqObj['open'] + ',' + reqObj['high'] + ',' + reqObj['low'] + ',' + reqObj['close'] + ',' + reqObj['vol'] + ',' + reqObj['spread'] + "\n", (err) => {
					if (err) throw err;
						//console.log('The "data to append" was appended to file!');
					});
				
				
				console.log(reqObj.fecha);
				reqObj.close = Number(reqObj.close);
				reqObj.open = Number(reqObj.open);
				reqObj.high = Number(reqObj.high);
				reqObj.low = Number(reqObj.low);
				reqObj.vol = Number(reqObj.vol);
				spread = Number(reqObj.spread)
				
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
					//console.log(reqObj);
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
						newVela = true;
						respuesta = fnVelaNormal(arrVelasSombra[arrVelasSombra.length - 1], reqObj, arrVelasSombra, reqObj.opt);       				 
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
				console.log(respuesta);
				if(respuesta == "N"){
					outObj = {
						
						value: respuesta, //Just some random value to demonstrate
						msg: "test message",
						cta: cuenta
					}
				} else {
					console.log(orden);
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
			console.log("ERROR");
		}*/
		

	});

	
	
}).listen(_PORT);

console.log("Node.js server listening on port "+ _PORT);

