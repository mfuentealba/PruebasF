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


function fnGenerarNiveles(x){
	fs.appendFileSync('./querysReconstruccion/_logGraf_' + (ind) + '.txt', JSON.stringify(objNiveles) + ",\n", (err) => {
					if (err) throw err;
						//console.log('The "data to append" was appended to file!');
					});
	for(var str in objNiveles){
		
		if(objNiveles[str]){
			
			if(objNiveles[str]['cont'] > 1){
				fs.appendFileSync('./querysReconstruccion/_logGraf_' + (ind) + '.txt',"[\n", (err) => {
					if (err) throw err;
						//console.log('The "data to append" was appended to file!');
					});
				for(var i = objNiveles[str]['ini']; i < x; i++){
					var obj = {x: i, y: Number(str)};
					fs.appendFileSync('./querysReconstruccion/_logGraf_' + (ind) + '.txt', JSON.stringify(obj) + ",\n", (err) => {
					if (err) throw err;
						//console.log('The "data to append" was appended to file!');
					});
				}
				fs.appendFileSync('./querysReconstruccion/_logGraf_' + (ind) + '.txt',"],\n", (err) => {
					if (err) throw err;
						//console.log('The "data to append" was appended to file!');
					});
				
				
			}
			
		}				
	}
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
		//if(morningstar(input)){
		//if(threewhitesoldiers(input)){
			sw = true;
			evaluacion = 3;
			console.log('bullishengulfingpattern');
			
		}
	
								
		switch(evaluacion){
			case 2:		
				velaOperativa.indexLabel = resp;
				fs.appendFileSync('./querysReconstruccion/_logGraf_' + (ind) + '.txt', JSON.stringify(velaOperativa) + ",\n", (err) => {
					if (err) throw err;
						//console.log('The "data to append" was appended to file!');
					});
				fnGenerarNiveles(velaOperativa.x);	
				ind++;	
				
			break;
			case 3:
				velaOperativa.indexLabel = resp;
				fs.appendFileSync('./querysReconstruccion/_logGraf_' + (ind) + '.txt', JSON.stringify(velaOperativa) + ",\n", (err) => {
					if (err) throw err;
						//console.log('The "data to append" was appended to file!');
					});
				fnGenerarNiveles(velaOperativa.x);
				ind++;
				
			break;
		}	
		
	}
	fs.appendFileSync('./querysReconstruccion/_logGraf_' + (ind) + '.txt', JSON.stringify(velaOperativa) + ",\n", (err) => {
					if (err) throw err;
						//console.log('The "data to append" was appended to file!');
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
		console.log('fnVelaNormal');
		if(dato.high > arrSubVela[arrSubVela.length - 1].high){
			arrSubVela[arrSubVela.length - 1].high = dato.high;
			
		}
		var resp = 'N';
		if(dato.low < arrSubVela[arrSubVela.length - 1].low){
			arrSubVela[arrSubVela.length - 1].low = dato.low;		
		}	
	} else {
		j = 1;
		console.log('fnVelaNormal++');
		arrSubVela.push(vela);
	}
	
	

	
	
	return resp;
	
}//2134068


var atrGraf;
var arrTamSubVelas = [];
var tamSubVelas = 0;

function fnEvaluaSubVelas(dato, arrV, tipo){
	if(arrV.length == 0){
		console.log('fnEvaluaSubVelasNOOK');
		return "N";
	}	
	console.log('fnEvaluaSubVelasOK');
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
			console.log('bearishengulfingpattern');
			
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
			console.log('bullishengulfingpattern');
			
		}
	
								
		switch(evaluacion){
			case 2:
				return 'V1';				
			
			case 3:
				return 'C1';
			
		}	
		
	}
	console.log(arrV[arrV.length - 1].open);
	console.log(arrV[arrV.length - 1].close);
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
		var lowV = Number(arr[0] + '.' + arr[1].substring(0, arr[1].length - 1 > 4 ? 4 : arr[1].length - 1));
		arr = String(velaAnt.low).split('.');
		var lowVA = Number(arr[0] + '.' + arr[1].substring(0, arr[1].length - 1 > 4 ? 4 : arr[1].length - 1));
		return Math.min(lowVA, lowV);	
	} else {
		arr = String(vela.high).split('.');
		var highV = Number(arr[0] + '.' + arr[1].substring(0, arr[1].length - 1 > 4 ? 4 : arr[1].length - 1));
		arr = String(velaAnt.high).split('.');
		var highVA = Number(arr[0] + '.' + arr[1].substring(0, arr[1].length - 1 > 4 ? 4 : arr[1].length - 1));
		return Math.max(highVA, highV);	
	}
	
}

var objNiveles = {};
var objMin = {};
var objMax = {};
var arrMin = [];
var arrMax = [];
var arrElim = [];
var contadorNivel = 1;

function fnVelaNueva(dato, arrVel, tipo){
	console.log('fnVelaNueva');
	console.log(tipo);
	atrGraf = atr.nextValue({close: [dato.close], high: [dato.high], low: [dato.low]});
	
	var vela = arrVel[arrVel.length - 1];
	var velaAnt = arrVel[arrVel.length - 2];
	
	
	/**************************-NIVELES-*********************************/
	console.log(velaAnt);
	console.log(vela);
	if(velaAnt){
		if(velaAnt.close <= velaAnt.open && vela.close >= vela.open){
				var val = fnMaxMin('min', velaAnt, vela);
				console.log("EL VAL = " + val);
				if(objNiveles[val]){
					objNiveles[val]['cont']++;
				} else {
					objNiveles[val] = {ini: vela.id, cont: 1};
				}
				
			} else if(velaAnt.close >= velaAnt.open && vela.close <= vela.open){
				val = fnMaxMin('max', velaAnt, vela);
				console.log("EL VAL = " + val);
				if(objNiveles[val]){
					objNiveles[val]['cont']++;
				} else {
					objNiveles[val] = {ini: vela.id, cont: 1};
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

			var objNuevo = {num: vela['Close'] < velaAnt['Close'] ? vela.id : velaAnt.id,  valor: vela['Close'] < velaAnt['Close'] ? vela['Close'] : velaAnt['Close']};
			var n  = arrMin.length;
			for(var j = 0; j < n; j++){//ELIMINO LOS PUNTOS BASE MENORES AL NUEVO
				a = arrMin[j];
				if(a.ptoInicial['valor'] > objNuevo['valor']){
					ptoElim = arrMin.splice(j, 0)['ptoInicial'];
					arrElim.push(ptoElim);
					j--;
					n--;
				} 	
			}

	}
	

	/**************************-FIN NIVELES-*********************************/
	
	/****************************************-NIVELES-**********************************/
					/*vela = modelApp.arrDataGrafVelas.source[modelApp.arrDataGrafVelas.length - 1];
					var velaAnterior:VelaVO = modelApp.arrDataGrafVelas.source[modelApp.arrDataGrafVelas.length - 2];
					
					
				
					var item:Object;
					
					if(modelApp.contVela == 372){//1883
						modelApp.contVela = 372;
					}
					
					var objNuevo:Object = {num: vela['Close'] < velaAnterior['Close'] ? modelApp.contVela : modelApp.contVela - 1,  valor: vela['Close'] < velaAnterior['Close'] ? vela['Close'] : velaAnterior['Close']};
					if(modelApp.arrMinimos.length > 10){
						trace("tiene " + modelApp.arrMinimos.length + "NODOS DE MINIMOS" );
					}
					
					var arrElim:Array = [];
					var ptoElim:Object;
					var a:NodoPendientes;
					var n:int = modelApp.arrMinimos.length;
					
					
					
					
					
					for(var j:int = 0; j < n; j++){//ELIMINO LOS PUNTOS BASE MENORES AL NUEVO
						a = NodoPendientes(modelApp.arrMinimos.getItemAt(j));
						if(a.ptoInicial['valor'] > objNuevo['valor']){
							ptoElim = modelApp.arrMinimos.removeItemAt(j)['ptoInicial'];
							arrElim.push(ptoElim);
							j--;
							n--;
						} 	
					}
					for each(ptoElim in arrElim){//EN LAS PROYECCIONES DE CADA PUNTO SOBREVIVIENTE ELIMINO LOS PUNTOS ELIMINADOS
						for each(var nodo:NodoPendientes in modelApp.arrMinimos){
							
							for each(var arrPuntos:ArrayCollection in nodo.arrayPosibles){
								var ind:int = arrPuntos.getItemIndex(ptoElim);
								if(ind > -1){
									arrPuntos.removeItemAt(ind);
									if(arrPuntos.length == 0){
										nodo.arrayPosibles.removeItemAt(nodo.arrayPosibles.getItemIndex(arrPuntos));
									}	
								}	
							}	
						}	
						
					}
					
					
					
					
					
					
					var tendencia:int = fnEvaluaTendencia(velaAnterior, vela);
					
					if(tendencia == TENDENCIA_ALCISTA){//verde-roja => PUNTA
						
						
						var nivel:int = vela['High'] <= velaAnterior['High'] ? velaAnterior['High'] : vela['High'];
						if(modelApp.objDataNiveles.hasOwnProperty('EURUSD|' + nivel)){
							var i:int = modelApp.arrDataNiveles.getItemIndex(modelApp.objDataNiveles['EURUSD|' + nivel]);
							item = modelApp.arrDataNiveles.getItemAt(i);
							item.mov = 'Resistencia';
							item.cant++;						
							var dist:int = modelApp.arrDataGraf.source[modelApp.arrDataGraf.length - 1]['sec'] - item.arrSec[item.arrSec.length - 1]['sec']; 
							item.arrSec.addItem({sec: modelApp.arrDataGraf.source[modelApp.arrDataGraf.length - 1]['sec'], dist: dist, vela: modelApp.arrDataGrafVelas.length - 1, accion: 'resistencia'});
							modelApp.arrDataNiveles.setItemAt(item, i);
						} else {
							item = {};			
							item.movIni = 'EURUSD|' + nivel;
							item.divisa = 'EURUSD';
							item.mov = 'Resistencia';
							item.cant = 1;
							item.arrSec = new ArrayCollection([{sec: modelApp.arrDataGraf.source[modelApp.arrDataGraf.length - 1]['sec'], dist: 0, vela: modelApp.arrDataGrafVelas.length - 1, accion: 'resistencia'}]);
							modelApp.arrDataNiveles.addItem(item);
							modelApp.objDataNiveles[item.movIni] = item;
						}
						
						
						
						
					} else if(tendencia == TENDENCIA_BAJISTA){//roja-verde => VALLE
						
					
						
						objNuevo.vela = vela;
						if(n == 0){
							a = new NodoPendientes();
							a.ptoInicial = objNuevo;
							modelApp.arrMinimos.addItem(a);
							modelApp.objMin[objNuevo.num] = a;
						} else {
							n = modelApp.arrMinimos.length;
							for(j = 0; j < n; j++){//UNA VEZ ELIMINADO DE TODOS LOS ARRAY LOS VALORES MAYORES PROCEDO A INSERTAR EL VALOR NUEVO
								nodo = NodoPendientes(modelApp.arrMinimos.getItemAt(j));
								if(nodo.arrayPosibles.length > 0){
									var m:int = nodo.arrayPosibles.length;
									for(var s:int = 0; s < m; s++){
										arrPuntos = ArrayCollection(nodo.arrayPosibles.getItemAt(s));
										var arrMin:ArrayCollection = new ArrayCollection([nodo.ptoInicial]);
										arrMin.addAll(arrPuntos);	
										var swPerteneceTendencia:Boolean = false;
										for each(var lin:EcuacionRectaVO in modelApp.arrTendencias){
											var res:Number = lin.pendiente * objNuevo['num'] + lin.coefCorte;
											if(objNuevo['valor'] >= res && objNuevo['valor'] - 10 <= res){
												//lin.arrPtos.addItem(objNuevo);//COSUME RAM
												swPerteneceTendencia = true;
											}
										}
										
										if(!swPerteneceTendencia){
											var valorAnterior:Object = arrMin.getItemAt(arrMin.length - 1);
											arrMin.addItem(objNuevo);
											//Crea orden y saca proyeccion segun pendiente
											var valorInicial:Object = nodo.ptoInicial;
											modelApp.proyeccionAlcista = (valorInicial['valor'] - valorAnterior['valor']) / (valorInicial['num'] - valorAnterior['num']);
											modelApp.corteMinAlcista = valorAnterior['valor'] - valorAnterior['num'] * modelApp.proyeccionAlcista;
//											if(objNuevo['valor'] >= modelApp.proyeccionAlcista * objNuevo['num'] + modelApp.corteMinAlcista && objNuevo['valor'] - modelApp.proyeccionAlcista <= modelApp.proyeccionAlcista * objNuevo['num'] + modelApp.corteMinAlcista){
											var valorEsperado:Number = modelApp.proyeccionAlcista * objNuevo['num'] + modelApp.corteMinAlcista;
											if(objNuevo['valor'] >= valorEsperado && objNuevo['valor'] - modelApp.proyeccionAlcista <= valorEsperado){
												
													
													
													
												fnGeneraLineaTendencia_y_orden(j, valorInicial, objNuevo, arrMin);
												
												
												
												nodo.arrayPosibles.removeItemAt(nodo.arrayPosibles.getItemIndex(arrPuntos));
												m--;
												s--;	
												
												
												
											} else {
												if(objNuevo['valor'] < valorEsperado){
													arrMin.removeItemAt(arrMin.getItemIndex(valorAnterior));
													arrPuntos.removeItemAt(0);
													arrPuntos.addItem(objNuevo);
													//nodo.arrayPosibles.removeItemAt(nodo.arrayPosibles.getItemIndex(arrPuntos));
												} else {
													arrMin.removeItemAt(arrMin.length - 1);											
													if(!modelApp.objMin.hasOwnProperty(valorAnterior.num)){
														a = new NodoPendientes();
														a.ptoInicial = valorAnterior;
														a.arrayPosibles.addItem(new ArrayCollection([objNuevo]));
														modelApp.arrMinimos.addItem(a);
														modelApp.objMin[valorAnterior.num] = valorAnterior;
													}
													
													
												}
											}									
										}	
									}		
								} else {
									nodo.arrayPosibles.addItem(new ArrayCollection([objNuevo]));
								}
							}	
						}		
						
					}
					
					var velaAux:VelaVO = modelApp.arrDataGrafVelas.getItemAt(modelApp.arrDataGrafVelas.length - 1) as VelaVO;
					var ext:int = 1;
					for each(var ec:EcuacionRectaVO in modelApp.arrTendencias){					
						velaAux[ec.id] = (modelApp.contVela) * ec.pendiente + ec.coefCorte;
						if(velaAux[ec.id] > velaAux['Close'] || ec.ordAsoc['ganancia'] < ec.ordAsoc['sl']){
							if(ec.ordAsoc){
								ec.ordAsoc['estado'] = 'Cerrado';
								ec.resultado = ec.ordAsoc.ganancia; 
								ec.velaSalida = velaAux;
								velaAux.num = modelApp.contVela;
								modelApp.arrDataGrafOrdExec.setItemAt(ec.ordAsoc, modelApp.arrDataGrafOrdExec.getItemIndex(ec.ordAsoc)); 
								modelApp.proyeccionAlcistaBL = false;
								
								
							}
							modelApp.arrTendencias.removeItemAt(modelApp.arrTendencias.getItemIndex(ec));
					
						} else {
							if(ec.ordAsoc['ganancia'] > 0){
								if(ec.ordAsoc.sl < ec.ordAsoc['ganancia'] - 30){
									ec.ordAsoc.sl = ec.ordAsoc['ganancia'] - 30;
								}
							}
							
						}
						ext++;
					}
					*/
					/**************************************************************/
					
	
	
	
	
	bbGraf = bb.nextValue(Number(vela.close));
	console.log(bbGraf);
	velaOperativa = {x: vela.id, y:[vela.open, vela.high, vela.low, vela.close], vo: vela};
	
	
	var resp = 'N';
	resp = fnEvaluaSubVelas(dato, arrSubVela, tipo);
	resp = fnEvaluaVelas(dato, tipo, arrVel, resp, velaOperativa);
	
	
	
	console.log(atrGraf);
	
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
			//console.log(ms);
			if(ms.toString() != "")
			{
				
				
				var msg = ms.toString();	//Parse the ms into string		
				
				//console.log(msg); // Prints the message in the console
				
				var reqObj = JSON.parse(msg);	// If the incoming message is in JSON format, you can parse it as JSON.
				
				var respuesta = "N";
				
				
				
				
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
						cta: 100
					}
				} else {
					console.log(orden);
					outObj = {
						
						value: respuesta, //Just some random value to demonstrate
						msg: "test message",
						stopLoss: orden.stopLoss,
						lote: orden.lote,
						cta: 100
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

