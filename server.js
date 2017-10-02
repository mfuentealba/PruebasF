/* This is example code. Modify it accordingly. For questions, please visit http://penguintraders.com */

//Include the node.js modules that you need. Make sure you install them first with npm install
var bearishengulfingpattern = require('./technicalindicators.js').bearishengulfingpattern;
var bullishengulfingpattern = require('./technicalindicators.js').bullishengulfingpattern;
var fs = require('fs');
var loteMin = 0.01;
var loteMax = 4000;
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


var cuenta = 100;
var ponderado = .1;
var spread = 0.00030;
var ajusteStop = 0.0004;
/*
var objFunciones = {};
objFunciones['ini'] = fnInicial;
objFunciones['0'] = fnVelaNueva;
objFunciones['1'] = fnVelaNormal;
objFunciones['2'] = fnVelaNormal;
objFunciones['3'] = fnVelaNormal;
objFunciones['4'] = fnVelaNormal;
objFunciones['5'] = fnVelaNormal;

objFunciones['ini_2'] = fnInicialSombra;
objFunciones['0_2'] = fnVelaNuevaSombra;
objFunciones['1_2'] = fnVelaNormalSombra;
objFunciones['2_2'] = fnVelaNormalSombra;
objFunciones['3_2'] = fnVelaNormalSombra;
objFunciones['4_2'] = fnVelaNormalSombra;
objFunciones['5_2'] = fnVelaNormalSombra;


objFunciones['signalWait'] = fnSignalWait;
objFunciones['signalEnable'] = fnSignalEnable;
objFunciones['fnArrCruceSMAWMA1'] = fnArrCruceSMAWMA1;
objFunciones['fnArrCruceSMAWMA2'] = fnArrCruceSMAWMA2;
objFunciones['fnCompra'] = fnCompra;
objFunciones['fnVenta'] = fnVenta;
objFunciones['fnEvaluaCompraEstocastico'] = fnEvaluaCompraEstocastico;
objFunciones['fnEvaluaVentaEstocastico'] = fnEvaluaVentaEstocastico;
objFunciones['fnEvaluaEstocastico'] = fnEvaluaEstocastico;
objFunciones['fnEvaluaCompraRSI'] = fnEvaluaCompraRSI;
objFunciones['fnEvaluaVentaRSI'] = fnEvaluaVentaRSI;
objFunciones['fnEvaluaCompraMACD'] = fnEvaluaCompraMACD;
objFunciones['fnEvaluaVentaMACD'] = fnEvaluaVentaMACD;
objFunciones['NO'] = fnNo;
objFunciones['fnVelas'] = fnEvaluaVelas;

*/

var http = require("http");

var _PORT = 8989; //Http port Node.js server will be listening on. Make sure that this is an open port and its the same as the one defined in MT4 indicator/EA.
	
var arrVelas = [{date: 1, open: 0, close: 0, high: 0, low: 100}];
var arrVelasSombra = [{date: 1, open: 0, close: 0, high: 0, low: 100}];	
var arrTamVelas = [];
var tamVelas = 0;	
var orden;
	

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
			opt = 3;
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
			opt = 3;
			console.log('bullishengulfingpattern');
			
		}
	
		
		if(orden == null && sw){
			
			switch(opt){
				case 2:
					fnCompra(dato, tipo, arrV);
					return 'V';
				break;
				case 3:
					fnCompra(dato, tipo, arrV);
					return 'C';
				break;
			}
		}
		
	}
	return "N";
}	

function fnEvaluaCierre(origen, vela){
	if(orden != null && origen == orden.origen){
		console.log(orden);
		if(orden.tipo == 'C'){
			if(vela.close < orden.stopLoss){
				orden.close = orden.stopLoss;
				
				orden.fin = vela.date;
				orden.total = (orden.close - orden.open - spread) * ajusteDecimal;//((vela.open - orden.open) * ajusteDecimal) - 16;	
				orden.totalReal = orden.total * orden.lote;//((vela.open - orden.open) * ajusteDecimal) - 16;	
				
				fnCalcCuenta(orden.totalReal);
				orden.cta = cuenta;
				
				if(orden.total < 0){					
					orden.tipo = 'L';
				}
				fnImprimirOperacion();
				orden = null;
			} else {
				if(vela.close > orden.open + spread + ajusteStop){
					if(orden.stopLoss < orden.open + spread){
						orden.stopLoss = orden.open + spread;
					} else {
						if(vela.close - ajusteStop > orden.stopLoss){
							orden.stopLoss = vela.close - ajusteStop;
						}
						
					}
				}
			}
			
		} else {
			if(vela.close > orden.stopLoss){
				orden.close = orden.stopLoss;
				orden.fin = vela.date;
				orden.total = (orden.open - orden.stopLoss - spread) * ajusteDecimal;//((vela.open - orden.open) * -ajusteDecimal) - 16;
				orden.totalReal = orden.total * orden.lote;//((vela.open - orden.open) * -ajusteDecimal) - 16;
				fnCalcCuenta(orden.totalReal);
				orden.cta = cuenta;
				if(orden.total < 0){
					orden.tipo = 'S';
				}
				fnImprimirOperacion();
				orden = null;
			} else {
				if(vela.close < orden.open - (spread + ajusteStop)){
					if(orden.stopLoss > orden.open - spread){
						orden.stopLoss = orden.open - spread;
					} else {
						if(vela.close + ajusteStop < orden.stopLoss){
							orden.stopLoss = vela.close + ajusteStop;
						}
						
					}
				}
			}
		}
	
	}

}

function fnImprimirOperacion(){
	fs.appendFileSync('./querysReconstruccion/log.txt', JSON.stringify(orden) + "\n", (err) => {
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

function fnVelaNormal(vela, dato){
	
	/*dato[2] = Number(dato[2]);
	dato[3] = Number(dato[3]);
	dato[4] = Number(dato[4]);*/
	vela.close = dato.close;
	if(dato.high > vela.high){
		vela.high = dato.high;
		
	}

	if(dato.low < vela.low){
		vela.low = dato.low;		
	}	
	
	
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

function fnCompra(vela, tipo, arrV){
	
		if(cuenta > 0){
			orden = {origen: tipo, open: vela.close, tipo: 'C', ini: vela.id/*, bollierg: (bbGraf && bbGraf.upper < vela.close ? true : false), valBoll: (bbGraf ? bbGraf.upper : 'none'), vela: arrVelaOperativa[arrVelaOperativa.length - 1], bbGraf: bbGraf*/};
			console.log(arrV);
			orden.stopLoss = (-Math.abs(arrV[arrV.length - 2].close - arrV[arrV.length - 1].close) * ajusteDecimal - 26) < -166 ? orden.open - 0.00166 : arrV[arrV.length - 2].close - spread - 0.00010;
			nStopLoss = 0;
			orden.lote = ponderado;
			console.log("************************** INICIO ORDEN ****************************");
			console.log(orden);
			console.log("\n\n\n");			
		}
	
}

function fnVenta(vela, tipo, arrV){
	
		if(cuenta > 0){
			orden = {origen: tipo, open: Number(vela.close), tipo: 'V', ini: vela.id/*, bollierg: (bbGraf && bbGraf.lower > vela.close ? true : false), valBoll: (bbGraf ? bbGraf.lower : 'none'), vela: arrVelaOperativa[arrVelaOperativa.length - 1], bbGraf: bbGraf*/};
			nStopLoss = 0;
			orden.lote = ponderado;
			orden.stopLoss = (-Math.abs(arrV[arrV.length - 2].close - arrV[arrV.length - 1].close) * ajusteDecimal - 26) < -166 ? orden.open + 0.00166 : arrV[arrV.length - 2].close + spread + 0.00010;
			console.log("************************** INICIO ORDEN ****************************");
			console.log(vela);
			console.log(orden);
			console.log("\n\n\n");
			
			
		}
	
	
}



function fnVelaNueva(dato, arrVel, tipo){
	console.log('fnVelaNueva');
	if(orden){
		fnEvaluaCierre(tipo, dato);
	}
	var resp = fnEvaluaVelas(dato, tipo, arrVel);
	fs.appendFileSync('./querysReconstruccion/log.txt', JSON.stringify(arrVel[arrVel.length - 1]) + "\n", (err) => {
		if (err) throw err;
			//console.log('The "data to append" was appended to file!');
		});
	arrVel.push({open: dato.open, close: dato.close, low: dato.low, high: dato.high, id: arrVel.length, date: dato.date, origen: dato.opt});	
	return resp;
}

var newVela = true;

	
//Create the server and listening to the request
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
				
				
				
				
				
				
				if(reqObj.opt == 'N'){
					//objFunciones[reqObj.date[5] + ''](dato);
					arrVelas.push(reqObj);
					fnEvaluaCierre('N', reqObj);
					respuesta = fnEvaluaVelas(reqObj.cierre, 'N', arrVelas);
					//respuesta = 'N';
				} else {
					//objFunciones[reqObj.date[5] + ''](dato);					
					//console.log(reqObj);
					if(reqObj.date[3] == '3' || reqObj.date[3] == '4' || reqObj.date[3] == '5'){
			
						if(newVela == true){
							newVela = false;
							respuesta = fnVelaNueva(reqObj, arrVelasSombra, reqObj.origen);
							
						} else {
							fnVelaNormal(arrVelasSombra[arrVelasSombra.length - 1], reqObj);       
						}
					 
					} else {
						newVela = true;
						fnVelaNormal(arrVelasSombra[arrVelasSombra.length - 1], reqObj);       				 
				   }				
					//arrVelasSombra.push(reqObj);
					//respuesta = fnEvaluaVelas(reqObj.cierre, 'S', arrVelasSombra);
				}
				
				
				
				console.log(reqObj); 
				
				/*
				Here you can have the code to do what you want it to do. You can also use cluster to run a multithreaded app. Or connect to a DB or connect to external web services and collect data, etc
				*/
				
				//Create a dummy response object
				var outObj = {
					value: respuesta, //Just some random value to demonstrate
					msg: "test message",
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

