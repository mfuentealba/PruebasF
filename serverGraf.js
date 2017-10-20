var bearishengulfingpattern = require('./technicalindicators.js').bearishengulfingpattern;
var bullishengulfingpattern = require('./technicalindicators.js').bullishengulfingpattern;
var BB = require('./technicalindicators.js').BollingerBands;
var darkcloudcover = require('./technicalindicators.js').darkcloudcover;
var downsidetasukigap = require('./technicalindicators.js').downsidetasukigap;
//var Doji = require('./technicalindicators.js').Doji;
var dragonflydoji = require('./technicalindicators.js').dragonflydoji;
var gravestonedoji = require('./technicalindicators.js').gravestonedoji;
var bullishharami = require('./technicalindicators.js').bullishharami;
var bearishharamicross = require('./technicalindicators.js').bearishharamicross;
var bullishharamicross = require('./technicalindicators.js').bullishharamicross;
var bullishmarubozu = require('./technicalindicators.js').bullishmarubozu;
var bearishmarubozu = require('./technicalindicators.js').bearishmarubozu;
var eveningdojistar = require('./technicalindicators.js').eveningdojistar;
var eveningstar = require('./technicalindicators.js').eveningstar;
var bearishharami = require('./technicalindicators.js').bearishharami;
var piercingline = require('./technicalindicators.js').piercingline;
var bullishspinningtop = require('./technicalindicators.js').bullishspinningtop;
var bearishspinningtop = require('./technicalindicators.js').bearishspinningtop;
var morningdojistar = require('./technicalindicators.js').morningdojistar;
var morningstar = require('./technicalindicators.js').morningstar;
var threeblackcrows = require('./technicalindicators.js').threeblackcrows;
var threewhitesoldiers = require('./technicalindicators.js').threewhitesoldiers;
var threeoutsidedown = require('./technicalindicators.js').threeOutSideDown;
var threeoutsideup = require('./technicalindicators.js').threeOutSideUp;

const TENDENCIA_ALCISTA = 1;
const TENDENCIA_BAJISTA = -1;

var ar = ['g'];

var obj1 = {data: 'hola'};
ar.push(obj1);

//console.log(ar.indexOf(obj1));

ar.splice(1, 1);
//console.log(ar.indexOf(obj1));

var p = "12344";
console.log(p.substr(0, 10));
console.log(Math.round(Number(p) * Math.pow(10, 4 - p.length)));

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





var http = require("http");

var _PORT = 9292; //Http port Node.js server will be listening on. Make sure that this is an open port and its the same as the one defined in MT4 indicator/EA.
	
var arrVelas = [{id: 1, date: 1, open: 0, close: 0, high: 0, low: 100}];
var arrVelasSombra = [{id: 1, date: 1, open: 0, close: 0, high: 0, low: 100}];	
var arrTamVelas = [];
var tamVelas = 0;	
var orden;
	
var evaluacion = 0;
var cont = 1;
var ind = 1;
var arrSubVela = [];
var contSubVela = 5;



function fnEvaluaTendencia(velaAnt, vela){
	if(velaAnt.open < velaAnt.close && vela.open > vela.close){
		return TENDENCIA_ALCISTA;
	} else if(velaAnt.open > velaAnt.close && vela.open < vela.close){
		return TENDENCIA_BAJISTA;
	}
	return 0;
}




function fnGenerarNiveles(x){
	/*fs.appendFileSync('./querysReconstruccion/_logGraf_' + (ind) + '.txt', JSON.stringify(objNiveles) + ",\n", (err) => {
					if (err) throw err;
						////console.log('The "data to append" was appended to file!');
					});*/
	for(var str in objNiveles){
		
		if(objNiveles[str]){
			
			if(objNiveles[str]['cont'] > 1){
				fs.appendFileSync('./querysReconstruccion/_logGraf_' + (ind) + '.txt',"[\n", (err) => {
					if (err) throw err;
						////console.log('The "data to append" was appended to file!');
					});
				for(var i = objNiveles[str]['ini']  > contadorNivel ? objNiveles[str]['ini'] : contadorNivel; i < x; i++){
					var obj = {x: i, y: Number(str), tipo: "N", ini: objNiveles[str]['ini'], ptos: objNiveles[str]['ptos']};
					fs.appendFileSync('./querysReconstruccion/_logGraf_' + (ind) + '.txt', JSON.stringify(obj) + ",\n", (err) => {
					if (err) throw err;
						////console.log('The "data to append" was appended to file!');
					});
				}
				fs.appendFileSync('./querysReconstruccion/_logGraf_' + (ind) + '.txt',"],\n", (err) => {
					if (err) throw err;
						////console.log('The "data to append" was appended to file!');
					});
				
				
			}
			
		}				
		
	}
	

	
	for(var k = 0; k < arrTendencias.length; k++){
		fs.appendFileSync('./querysReconstruccion/_logGraf_' + (ind) + '.txt',"[\n", (err) => {
			if (err) throw err;
				////console.log('The "data to append" was appended to file!');
			});
		for(i = contadorNivel; i < x; i++){
			var obj = {x: i, y: Number(i * arrTendencias[k].pendiente + arrTendencias[k].coefCorte), tipo: "T"};
				fs.appendFileSync('./querysReconstruccion/_logGraf_' + (ind) + '.txt', JSON.stringify(obj) + ",\n", (err) => {
				if (err) throw err;
					////console.log('The "data to append" was appended to file!');
				});
			
		}
		fs.appendFileSync('./querysReconstruccion/_logGraf_' + (ind) + '.txt',"],\n", (err) => {
			if (err) throw err;
				////console.log('The "data to append" was appended to file!');
			});
		
	}
	/*fs.appendFileSync('./querysReconstruccion/_logGraf_' + (ind) + '.txt', JSON.stringify(objNiveles) + ",\n", (err) => {
					if (err) throw err;
						////console.log('The "data to append" was appended to file!');
					});
	console.log(arrTendencias);*/

	contadorNivel = x;
	
}
	
function fnEvaluaVelas(dato, tipo, arrV, resp, velaOperativa){
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
		evaluacion = 0;
		if(bearishengulfingpattern(input)){
		//if(eveningstar(input)){
		//if(eveningdojistar(input)){
		//if(threeblackcrows(input)){
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
		//if(morningstar(input)){
		//if(threewhitesoldiers(input)){
			sw = true;
			evaluacion = 3;
			//console.log('bullishengulfingpattern');
			
		}
	
								
		switch(evaluacion){
			case 2:		
				velaOperativa.indexLabel = resp;
				fs.appendFileSync('./querysReconstruccion/_logGraf_' + (ind) + '.txt', JSON.stringify(velaOperativa) + ",\n", (err) => {
					if (err) throw err;
						////console.log('The "data to append" was appended to file!');
					});
				fs.appendFileSync('./querysReconstruccion/_logGraf_' + (ind) + '.txt',"],\n", (err) => {
					if (err) throw err;
						////console.log('The "data to append" was appended to file!');
					});
				fnGenerarNiveles(velaOperativa.x);	
				ind++;	
				fs.appendFileSync('./querysReconstruccion/_logGraf_' + (ind) + '.txt',"[\n", (err) => {
					if (err) throw err;
						////console.log('The "data to append" was appended to file!');
					});
			break;
			case 3:
				velaOperativa.indexLabel = resp;
				fs.appendFileSync('./querysReconstruccion/_logGraf_' + (ind) + '.txt', JSON.stringify(velaOperativa) + ",\n", (err) => {
					if (err) throw err;
						////console.log('The "data to append" was appended to file!');
					});
				fs.appendFileSync('./querysReconstruccion/_logGraf_' + (ind) + '.txt',"],\n", (err) => {
					if (err) throw err;
						////console.log('The "data to append" was appended to file!');
					});
				fnGenerarNiveles(velaOperativa.x);	
				ind++;	
				fs.appendFileSync('./querysReconstruccion/_logGraf_' + (ind) + '.txt',"[\n", (err) => {
					if (err) throw err;
						////console.log('The "data to append" was appended to file!');
					});
				
			break;
		}	
		
	}
	fs.appendFileSync('./querysReconstruccion/_logGraf_' + (ind) + '.txt', JSON.stringify(velaOperativa) + ",\n", (err) => {
					if (err) throw err;
						////console.log('The "data to append" was appended to file!');
					});
	return "N";
}	

var j = 1;

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
	j++;
	if(j <= contSubVela && arrSubVela.length > 0){
		//console.log('fnVelaNormal');
		if(dato.high > arrSubVela[arrSubVela.length - 1].high){
			arrSubVela[arrSubVela.length - 1].high = dato.high;
			
		}
		var resp = 'N';
		if(dato.low < arrSubVela[arrSubVela.length - 1].low){
			arrSubVela[arrSubVela.length - 1].low = dato.low;		
		}	
	} else {
		j = 1;
		//console.log('fnVelaNormal++');
		arrSubVela.push(vela);
	}
	
	

	
	
	return resp;
	
}//2134068


var atrGraf;
var arrTamSubVelas = [];
var tamSubVelas = 0;

function fnEvaluaSubVelas(dato, arrV, tipo){
	if(arrV.length == 0){
		//console.log('fnEvaluaSubVelasNOOK');
		return "N";
	}	
	//console.log('fnEvaluaSubVelasOK');
	var vela = arrV[arrV.length - 1];
	arrTamSubVelas.push((vela.high - vela.low) / 4);
	if(arrTamSubVelas.length > 4){
		tamSubVelas += ((vela.high - vela.low) / 4) - arrTamSubVelas.shift();
		
		sw = true;
	} else {
		tamSubVelas += (vela.high - vela.low) / 4;
		sw = false;
	}
	var opt = 0;
	if(arrV.length > 2 && sw){
		
		var input = {
			open: [arrV[arrV.length - 3].open * ajusteDecimal, arrV[arrV.length - 2].open * ajusteDecimal, arrV[arrV.length - 1].open * ajusteDecimal],
			high: [arrV[arrV.length - 3].high * ajusteDecimal, arrV[arrV.length - 2].high * ajusteDecimal, arrV[arrV.length - 1].high * ajusteDecimal],
			close: [arrV[arrV.length - 3].close * ajusteDecimal, arrV[arrV.length - 2].close * ajusteDecimal, arrV[arrV.length - 1].close * ajusteDecimal],
			low: [arrV[arrV.length - 3].low * ajusteDecimal, arrV[arrV.length - 2].low * ajusteDecimal, arrV[arrV.length - 1].low * ajusteDecimal],
			tamVelas: tamSubVelas * ajusteDecimal
		  };
		
		sw = false;
		evaluacion = 0;
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
			tamVelas: tamSubVelas * ajusteDecimal
		  };
		if(bullishengulfingpattern(input)){
		//if(threeoutsideup(input)){
			sw = true;
			evaluacion = 3;
			//console.log('bullishengulfingpattern');
			
		}
	
								
		switch(evaluacion){
			case 2:
				return 'V1';				
			
			case 3:
				return 'C1';
			
		}	
		
	}
	//console.log(arrV[arrV.length - 1].open);
	//console.log(arrV[arrV.length - 1].close);
	if(arrV[arrV.length - 1].open - arrV[arrV.length - 1].close > 0){
		return 'V2';
	} else if(arrV[arrV.length - 1].open - arrV[arrV.length - 1].close < 0){
		return 'C2';
	}
	return "N";
}


function fnMaxMin(opt, velaAnt, vela){
	if(opt == 'min'){
		
		var arr = String(vela.low).split('.');
		var lowV = Number(arr[0] + '.' + (Math.round(Number(arr[1]) * Math.pow(10, 4 - arr[1].length))));
		arr = String(velaAnt.low).split('.');
		var lowVA= Number(arr[0] + '.' + (Math.round(Number(arr[1]) * Math.pow(10, 4 - arr[1].length))));
		console.log("*****************************************************");
		console.log(lowVA);
		console.log(lowV);
		console.log(Math.min(lowVA, lowV));
		console.log("*****************************************************");
		
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
		console.log("*****************************************************");
		console.log(highVA);
		console.log(highV);
		console.log(Math.max(highVA, highV));
		console.log("*****************************************************");
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

function fnVelaNueva(dato, arrVel, tipo){
	//console.log('fnVelaNueva');
	//console.log(tipo);
	atrGraf = atr.nextValue({close: [dato.close], high: [dato.high], low: [dato.low]});
	
	var vela = arrVel[arrVel.length - 1];
	var velaAnt = arrVel[arrVel.length - 2];
	
	
	/**************************-NIVELES-*********************************/
	//console.log(velaAnt);
	//console.log(vela);
	if(velaAnt){
		/*if(vela.id == 200){
			exit();

		}*/
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
				console.log(objNuevo);
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
								console.log("/********************************************************************************/");
								console.log(objNuevo['valor']);
								console.log(valorEsperado);
								console.log(objNuevo['valor']);
								console.log(valorEsperado);
								console.log("/********************************************************************************/");
								
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
				console.log(objNuevo);
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
								console.log("/********************************************************************************/");
								console.log(objNuevo['valor']);
								console.log(valorEsperado);
								console.log(objNuevo['valor']);
								console.log(valorEsperado);
								console.log("/********************************************************************************/");
								
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
	

	
	bbGraf = bb.nextValue(Number(vela.close));
	//console.log(bbGraf);
	velaOperativa = {x: vela.id, y:[vela.open, vela.high, vela.low, vela.close], vo: vela};
	
	
	var resp = 'N';
	resp = fnEvaluaSubVelas(dato, arrSubVela, tipo);
	resp = fnEvaluaVelas(dato, tipo, arrVel, resp, velaOperativa);
	
	
	
	//console.log(atrGraf);
	
	arrSubVela = [];
	j = 1;
	arrSubVela.push(vela);
	
	
	arrVel.push({open: dato.open, close: dato.close, low: dato.low, high: dato.high, id: cont++, date: dato.date, origen: dato.opt, fecha: dato.fecha, vol: dato.vol});	
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
			////console.log(ms);
			if(ms.toString() != "")
			{
				
				
				var msg = ms.toString();	//Parse the ms into string		
				
				////console.log(msg); // Prints the message in the console
				
				var reqObj = JSON.parse(msg);	// If the incoming message is in JSON format, you can parse it as JSON.
				
				var respuesta = "N";
				
				
				
				
				//console.log(reqObj.fecha);
				reqObj.close = Number(reqObj.close);
				reqObj.open = Number(reqObj.open);
				reqObj.high = Number(reqObj.high);
				reqObj.low = Number(reqObj.low);
				reqObj.vol = Number(reqObj.vol);
				reqObj.Ask = Number(reqObj.Ask);
				reqObj.Bid = Number(reqObj.Bid);
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
				//console.log(respuesta);
				if(respuesta == "N"){
					outObj = {
						
						value: respuesta, //Just some random value to demonstrate
						msg: "test message",
						cta: 100
					}
				} else if(respuesta == "X"){
					exit();
				} else {
					//console.log(orden);
					outObj = {
						
						value: respuesta, //Just some random value to demonstrate
						msg: "test message",
						stopLoss: orden.stopLoss,
						lote: orden.lote,
						cta: 100
					}
				}
					
				
				response.write(JSON.stringify(outObj));	//Write the response
				response.end(); //close the response

			}
		/*} catch(e) {
			//console.log("ERROR");
		}*/
		

	});

	
	
}).listen(_PORT);

//console.log("Node.js server listening on port "+ _PORT);

