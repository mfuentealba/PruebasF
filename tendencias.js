var abandonedbaby = require('technicalindicators').abandonedbaby;

var bearishengulfingpattern = require('technicalindicators').bearishengulfingpattern;
var bullishengulfingpattern = require('technicalindicators').bullishengulfingpattern;
var darkcloudcover = require('technicalindicators').darkcloudcover;
var downsidetasukigap = require('technicalindicators').downsidetasukigap;
//var Doji = require('technicalindicators').Doji;
var dragonflydoji = require('technicalindicators').dragonflydoji;
var gravestonedoji = require('technicalindicators').gravestonedoji;
var bullishharami = require('technicalindicators').bullishharami;
var bearishharamicross = require('technicalindicators').bearishharamicross;
var bullishharamicross = require('technicalindicators').bullishharamicross;
var bullishmarubozu = require('technicalindicators').bullishmarubozu;
var bearishmarubozu = require('technicalindicators').bearishmarubozu;
var eveningdojistar = require('technicalindicators').eveningdojistar;
var eveningstar = require('technicalindicators').eveningstar;
var bearishharami = require('technicalindicators').bearishharami;
var piercingline = require('technicalindicators').piercingline;
var bullishspinningtop = require('technicalindicators').bullishspinningtop;
var bearishspinningtop = require('technicalindicators').bearishspinningtop;
var morningdojistar = require('technicalindicators').morningdojistar;
var morningstar = require('technicalindicators').morningstar;
var threeblackcrows = require('technicalindicators').threeblackcrows;
var threewhitesoldiers = require('technicalindicators').threewhitesoldiers;





//var result        = AbandonedBaby.logic(threeDayInput);
//console.log('Is Abandoned Baby : '+ result);
var fs = require('fs');
var fs2 = require('fs');
var EventEmitter = require('events').EventEmitter;
const Stochastic = require('technicalindicators').Stochastic;
var SMA = require('technicalindicators').SMA;
var WMA = require('technicalindicators').WMA;
var RSI = require('technicalindicators').RSI;
var MACD = require('technicalindicators').MACD;
var inputIni = {
	  high: [],
	  low: [],
	  close: [],
	  period: 10,
	  signalPeriod: 3
	};
var stochastic = new Stochastic(inputIni);
var smaProducer = new SMA({period : 20, values : []});
var wma = new WMA({
      period : 10,
      values : []
    });
	
	
var inputRSI = {
  values : [],
  period : 28
};
var rsi = new RSI(inputRSI);
var stoc;

var rsiCalc;
var macdCalc;

var macdInput = {
  values            : [],
  fastPeriod        : 24,
  slowPeriod        : 52,
  signalPeriod      : 18 ,
  SimpleMAOscillator: false,
  SimpleMASignal    : false
}
var macd = new MACD(macdInput);


var arrOrdenes = [];
var arrSMA = [];
var arrWMA = [];


const cluster = require('cluster');
var arr;

var vela;
var velaOperativa;
var vela2;
var vela3;
var orden;
var cont = 0;


function fnInicial(dato){
	dato[3] = Number(dato[3]);
	vela = {date: 1, open: dato[3], close: dato[3], low: dato[3], high: dato[3]};
	vela2 = {date: 1, open: dato[3], close: dato[3], low: dato[3], high: dato[3]};
	vela3 = {date: 1, open: dato[3], close: dato[3], low: dato[3], high: dato[3]};
	
	arrVelaOperativa.push(vela);
	arrVelaFuerza.push(vela2);
	arrVelaReferencia.push(vela3);
	
}


function fnSignals(dato){
	valorWMA = wma.nextValue(vela.close);
	valorSMA = smaProducer.nextValue(vela.close);
	arrSMA.push({x: vela.date, y:valorSMA});
	arrWMA.push({x: vela.date, y:valorWMA});
	//objFunciones[signalIni](valorWMA, valorSMA, dato);
	
	
	return;
}

var arrCruceSMAWMA = [];
/*
var BufferClass = function(){}

BufferClass.prototype.nivel = 2;
BufferClass.prototype.fnArrPush = function(arr){
	
}*/

function fnSignalWait(valorWMA, valorSMA, dato){
	
	if(arrVelaOperativa.length == 28){
		signalIni = 'signalEnable';
		objFunciones[signalIni](valorWMA, valorSMA, dato);
	}
	
}

function fnArrCruceSMAWMA1(){
	return 'NO';
}

var objResultadoCruceWMASMA = {'1, -1': 'fnEvaluaCompraEstocastico', '-1, 1': 'fnEvaluaVentaEstocastico', '1, 1': 'NO', '-1, -1': 'NO', '0, 0': 'NO', '-1, 0': 'NO', '0, -1': 'NO', '0, 1': 'NO', '1, 0': 'NO'};
//var objResultadoCruceWMASMA = {'1, -1': 'fnCompra', '-1, 1': 'fnVenta', '1, 1': 'NO', '-1, -1': 'NO', '0, 0': 'NO', '-1, 0': 'NO', '0, -1': 'NO', '0, 1': 'NO', '1, 0': 'NO'};
var objResultadoEstocastico = {'C1': 'fnEvaluaCompraRSI', 'C-1': 'NO', 'C0': 'NO', 'V1': 'NO', 'V-1': 'fnEvaluaVentaRSI', 'V0': 'NO'};
var objResultadoRSI = {'C1': 'fnEvaluaCompraMACD', 'C-1': 'NO', 'C0': 'NO', 'V1': 'NO', 'V-1': 'fnEvaluaVentaMACD', 'V0': 'NO'};
var objResultadoMACD = {'C1, 1': 'fnCompra', 'V-1, -1': 'fnVenta'};

function fnEvaluaCompraEstocastico(dato){
	if(orden != null){
		if(orden.tipo == 'V'){
			
			orden.close = dato[3];
			orden.vo.indexLabel = 'v';
			orden.fin = vela2.date;
			orden.obs = "señal";
			orden.total = ((dato[3] - orden.open) * -100000) - 16;
			if(orden.total < 0){
				orden.vo.indexLabel = 'S';
			}	
			console.log(orden);
			orden = null;
			//if(stoc.k < 70 && stoc.d < 70){
				var res = objResultadoEstocastico['C' + (stoc.k - stoc.d) / Math.abs((stoc.k - stoc.d))];		
			/*} else {
				res = 'NO';
			}*/		
		} else {
			res = 'NO';
		}
	} else {
		//if(stoc.k < 70 && stoc.d < 70){
			var res = objResultadoEstocastico['C' + (stoc.k - stoc.d) / Math.abs((stoc.k - stoc.d))];		
		/*} else {
			res = 'NO';
		}*/
	}
	  
	////console.log(stoc);
	
	
	////console.log("***********fnEvaluaCompraEstocastico************* " + res);
	res = objFunciones[res](dato);
	return res;
	
}


function fnEvaluaVentaEstocastico(dato){
	if(orden != null){
		if(orden.tipo == 'C'){
			
			orden.close = dato[3];
			orden.vo.indexLabel = 'c';
			
			orden.fin = vela.date;
			orden.obs = 'señal';
			orden.total = ((dato[3] - orden.open) * 100000) - 16;	
			if(orden.total < 0){
				orden.vo.indexLabel = 'L';
			}
			console.log(orden);
			orden = null;
			//if(stoc.k > 30 && stoc.d > 30){
				var res = objResultadoEstocastico['V' + (stoc.k - stoc.d) / Math.abs((stoc.k - stoc.d))];	
			/*} else {
				res = 'NO';
			}*/	
		} else {
			res = 'NO';
		}
	} else {
		//if(stoc.k > 30 && stoc.d > 30){
			var res = objResultadoEstocastico['V' + (stoc.k - stoc.d) / Math.abs((stoc.k - stoc.d))];	
		/*} else {
			res = 'NO';
		}*/
	}
	
	
	////console.log("**********fnEvaluaVentaEstocastico***********" + res);
	res = objFunciones[res](dato);
	return res;
	
	
}

function fnEvaluaEstocastico(dato){
	
	if(stoc.k > 70 && stoc.d > 70){
		var res = objFunciones['fnEvaluaVentaEstocastico'](dato);	
	} else if(stoc.k < 30 && stoc.d < 30){
		var res = objFunciones['fnEvaluaCompraEstocastico'](dato);	
	} else {
		res = 'NO';
	}
	
	////console.log("**********fnEvaluaEstocastico***********" + res);
	//res = objFunciones[res](dato);
	return res;
}


function fnEvaluaCompraRSI(dato){
	
	  
	////console.log(stoc);
	
	var res = objResultadoRSI['C' + (rsiCalc - 50) / Math.abs((rsiCalc - 50))];	
	////console.log("***********fnEvaluaCompraRSI************* " + res);
	res = objFunciones[res](dato);
	return res;
	
}


function fnEvaluaVentaRSI(dato){
	var res = objResultadoRSI['V' + (rsiCalc - 50) / Math.abs((rsiCalc - 50))];	
	////console.log("**********fnEvaluaVentaRSI***********" + res);
	res = objFunciones[res](dato);
	return res;
	
	
}


function fnEvaluaCompraMACD(dato){
	try{
		////console.log(macdCalc);
		
		var res = objResultadoMACD['C' + (macdCalc.MACD / Math.abs(macdCalc.MACD)) + ', ' + (macdCalc.signal / Math.abs(macdCalc.signal))] ? objResultadoMACD['C' + (macdCalc.MACD / Math.abs(macdCalc.MACD)) + ', ' + (macdCalc.signal / Math.abs(macdCalc.signal))] : 'NO';	
		if(res == undefined){
			res = 'NO'; 
		}
		//console.log('C' + (macdCalc.MACD / Math.abs(macdCalc.MACD)) + ', ' + (macdCalc.signal / Math.abs(macdCalc.signal)));
		//console.log("***********fnEvaluaCompraMACD************* " + res);
		//res = objFunciones[res](dato);
		return res;
	} catch(e){
		return 'NO';
	}
	  
	
	
}


function fnEvaluaVentaMACD(dato){
	try{
		//console.log(macdCalc);
		var res = objResultadoMACD['V' + (macdCalc.MACD / Math.abs(macdCalc.MACD)) + ', ' + (macdCalc.signal / Math.abs(macdCalc.signal))] ? objResultadoMACD['V' + (macdCalc.MACD / Math.abs(macdCalc.MACD)) + ', ' + (macdCalc.signal / Math.abs(macdCalc.signal))] : 'NO';
		//console.log('*****V' + (macdCalc.MACD / Math.abs(macdCalc.MACD)) + ', ' + (macdCalc.signal / Math.abs(macdCalc.signal)) + "*******");
		//console.log("**********fnEvaluaVentaMACD***********" + res);
		//res = objFunciones[res](dato);
		return res;
	} catch(e){
		return 'NO';
	}
	
	
	
}


function fnArrCruceSMAWMA2(dato){
	
	var res = objResultadoCruceWMASMA[arrCruceSMAWMA[0]/Math.abs(arrCruceSMAWMA[0]) + ', ' +  arrCruceSMAWMA[1]/Math.abs(arrCruceSMAWMA[1])];
//	//console.log(arrCruceSMAWMA[0]/Math.abs(arrCruceSMAWMA[0]) + ', ' +  arrCruceSMAWMA[1]/Math.abs(arrCruceSMAWMA[1]));
	arrCruceSMAWMA.shift();
	//console.log("*********fnArrCruceSMAWMA2*********** " + res);
	////console.log(objResultadoEstocastico[res]);
	res = objFunciones[res](dato);
	return res;
}

function fnSignalEnable(valorWMA, valorSMA, dato){
	
	arrCruceSMAWMA.push(valorSMA - valorWMA);
	var sign = objFunciones['fnArrCruceSMAWMA' + arrCruceSMAWMA.length](dato);
	//var sign = objFunciones['fnEvaluaEstocastico'](dato);
	//console.log('*****fnSignalEnable****' + sign);
	if(sign != 'NO'){
		//console.log('********' + sign);
		objFunciones[sign](dato);
		
	}
		
}


var arrEval = [];


function fnEvaluaVelas(dato){
	if(arrVelaOperativa2.length > 2){
		var input = {
		  open: [arrVelaOperativa2[arrVelaOperativa2.length - 3]['y'][0] * 100000, arrVelaOperativa2[arrVelaOperativa2.length - 2]['y'][0] * 100000, arrVelaOperativa2[arrVelaOperativa2.length - 1]['y'][0] * 100000],
		  high: [arrVelaOperativa2[arrVelaOperativa2.length - 3]['y'][1] * 100000, arrVelaOperativa2[arrVelaOperativa2.length - 2]['y'][1] * 100000, arrVelaOperativa2[arrVelaOperativa2.length - 1]['y'][1] * 100000],
		  close: [arrVelaOperativa2[arrVelaOperativa2.length - 3]['y'][3] * 100000, arrVelaOperativa2[arrVelaOperativa2.length - 2]['y'][3] * 100000, arrVelaOperativa2[arrVelaOperativa2.length - 1]['y'][3] * 100000],
		  low: [arrVelaOperativa2[arrVelaOperativa2.length - 3]['y'][2] * 100000, arrVelaOperativa2[arrVelaOperativa2.length - 2]['y'][2] * 100000, arrVelaOperativa2[arrVelaOperativa2.length - 1]['y'][2] * 100000]
		};
		//var abandonedBaby = new AbandonedBaby ();
		//console.log();
		if(abandonedbaby(input)){
			console.log('abandonedbaby');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = "1";
		}
		var sw = false;
		if(bearishengulfingpattern(input)){
			sw = true;
			arrEval.push(2);
			console.log('bearishengulfingpattern');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "2";
		}
		if(bullishengulfingpattern(input)){
			sw = true;
			arrEval.push(3);
			console.log('bullishengulfingpattern');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "3";
		}
		if(darkcloudcover(input)){
			console.log('darkcloudcover');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "4";
		}
		
		
		if(arrEval.length > 1 && sw){
			if(arrEval[arrEval.length - 2] == arrEval[arrEval.length - 1]){
				if(orden == null){
					console.log(arrVelaOperativa2[arrVelaOperativa2.length - 1]['y'][1]  + " >= " + arrWMA[arrWMA.length - 1].y + " >= " + arrVelaOperativa2[arrVelaOperativa2.length - 1]['y'][2])
					if(Number(arrVelaOperativa2[arrVelaOperativa2.length - 1]['y'][1]) >= Number(arrWMA[arrWMA.length - 1].y) && Number(arrWMA[arrWMA.length - 1].y) >=  Number(arrVelaOperativa2[arrVelaOperativa2.length - 1]['y'][2])){
						if(arrEval[arrEval.length - 2] == 2){
							fnVenta(dato);
						} else {
							fnCompra(dato);
						}
					}
						
				}
				
				
				
				
			} else {
				if(orden != null){
					if(orden.tipo == 'C'){
						
						orden.close = dato[3];
						orden.vo.indexLabel = 'C';
						
						orden.fin = vela.date;
						orden.obs = 'señal';
						orden.total = (((dato[3] - orden.open) * 100000) - 16) * Math.abs(orden.tamVela);	
						orden.totalReal = ((dato[3] - orden.open) * 100000) - 16;	
						if(orden.total < 0){
							orden.vo.indexLabel = 'L';
						}
						console.log(orden);
						orden = null;							
					} else {
						orden.close = dato[3];
						orden.vo.indexLabel = 'v';
						orden.fin = vela2.date;
						orden.obs = "señal";
						orden.total = (((dato[3] - orden.open) * -100000) - 16) * Math.abs(orden.tamVela);
						orden.totalReal = ((dato[3] - orden.open) * -100000) - 16;	
						if(orden.total < 0){
							orden.vo.indexLabel = 'S';
						}	
						console.log(orden);
						orden = null;
							
					}
				} else {
					
				}
			}
		}
		
		
		
		if(downsidetasukigap(input)){
			console.log('downsidetasukigap');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "5";
		}
		/*if(dragonflydoji(input)){
			console.log('dragonflydoji');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "6";
		}
		if(gravestonedoji(input)){
			console.log('gravestonedoji');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "7";
		}*/
		if(bullishharami(input)){
			console.log('bullishharami');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "8";
		}
		/*if(bearishharamicross(input)){
			console.log('bearishharamicross');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "9";
		}
		if(bullishharamicross(input)){
			console.log('bullishharamicross');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "10";
		}
		if(bullishmarubozu(input)){
			console.log('bullishmarubozu');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "11";
		}
		if(bearishmarubozu(input)){
			console.log('bearishmarubozu');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "12";
		}
		if(eveningdojistar(input)){
			console.log('eveningdojistar');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "13";
		}
		if(bearishharami(input)){
			console.log('bearishharami');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "14";
		}
		if(piercingline(input)){
			console.log('piercingline');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "15";
		}
		if(bullishspinningtop(input)){
			console.log('bullishspinningtop');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "16";
		}
		if(bearishspinningtop(input)){
			console.log('bearishspinningtop');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "17";
		}*/
		if(morningdojistar(input)){
			console.log('morningdojistar');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "18";
		}
		if(morningstar(input)){
			console.log('morningstar');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "19";
		}
		/*if(threeblackcrows(input)){
			console.log('threeblackcrows');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "20";
		}
		if(threewhitesoldiers(input)){
			console.log('threewhitesoldiers');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "21";
		}*/
		
	}
}

function fnVelaNueva(dato){
	////console.log('fnVelaNueva');
	velaOperativa = {x: vela.date, y:[vela.open, vela.high, vela.low, vela.close]};
	dato[3] = Number(dato[3]);
	//arrVelaOperativa2.push([vela.date, vela.low, vela.open, vela.close, vela.high]);
	////console.log(velaOperativa);
	arrVelaOperativa2.push(velaOperativa);
	fnEvaluaVelas(dato);
	
	var input = {
	  high: [vela.high],
	  low: [vela.low],
	  close: [vela.close],
	  period: 10,
	  signalPeriod: 3
	};
	
	stoc = stochastic.nextValue(input);
	rsiCalc = rsi.nextValue(vela.close);
	macdCalc = macd.nextValue(vela.close);
	////console.log(stochastic.nextValue(input));
	////console.log(smaProducer.nextValue(vela.close));
	////console.log(wma.nextValue(vela.close));
	////console.log(macdCalc);
	//console.log(stoc);
	////console.log(macd.nextValue(vela.close));
	
	fnSignals(dato);
		
	
	
	//arrVelaFuerza2.push([vela2.date, vela2.low, vela2.open, vela2.close, vela2.high]);
	arrVelaFuerza2.push({x: vela2.date, y: [vela2.open, vela2.high, vela2.low, vela2.close]});
	
	vela = {open: dato[3], close: dato[3], low: dato[3], high: dato[3]};
	
	vela2 = {open: (vela2.open + vela2.close) / 2, close: (vela2.open + vela2.close) / 2, low: (vela2.open + vela2.close) / 2, high: (vela2.open + vela2.close) / 2};
	
	////console.log(vela);
	////console.log(vela2);
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
	
	objFunciones['0'] = fnVelaNormal2;
}

function fnVelaNormal2(dato){
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
	objFunciones['0'] = fnVelaNueva;
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

function fnNo(dato){
	return 'NO';
}

var arrVelaOperativa = [];
var arrVelaReferencia = [];
var arrVelaFuerza = [];
var arrVelaOperativa2 = [];
var arrVelaReferencia2 = [];
var arrVelaFuerza2 = [];
var arrMedia14 = [];
var signalIni = 'signalWait';

var objFunciones = {};
objFunciones['ini'] = fnInicial;
objFunciones['0'] = fnVelaNueva;
objFunciones['1'] = fnVelaNormal;
objFunciones['2'] = fnVelaNormal;
objFunciones['3'] = fnVelaNormal;
objFunciones['4'] = fnVelaNormal;
objFunciones['5'] = fnVelaNormal;
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


function fnCompra(close){
	var dato = close;
	if((vela2.close - vela2.open) * 100000 > 11){
		orden = {open: close[3], tipo: 'C'/*, fecIni: close[1]*/, ini: vela2.date, stopLoss: -316, tamVela: (vela2.close - vela2.open) * 100000, tamVelaAnt: (arrVelaFuerza[arrVelaFuerza.length - 2].close - arrVelaFuerza[arrVelaFuerza.length - 2].open) * 100000/*, pendienteOrden: (arrCalculoMedia14[arrCalculoMedia14.length - 1] - arrCalculoMedia14[arrCalculoMedia14.length - 2])*/};
		velaOperativa.markerType = "circle";
		orden.vo = velaOperativa;
		velaOperativa.markerSize = 1000;
		velaOperativa.markerColor = "brown";
		velaOperativa.indexLabel = "C";
		nStopLoss = 0;
		
		console.log("************************** INICIO ORDEN ****************************");
		console.log(vela);
		console.log(stoc);
		console.log(rsiCalc);
		console.log(macdCalc);
		console.log(orden);
		console.log("\n\n\n");
		
		
		
		//ee.removeAllListeners('orden');
		//ee.on('orden', fnCerrarOrdenCompra);
		arrOrdenes.push(orden);
	}
	
}

function fnVenta(close){
	var dato = close;
	if((vela2.close - vela2.open) * 100000 < -11){
		orden = {open: close[3], tipo: 'V', /*fecIni: close[1], */ini: vela2.date, stopLoss: -316, tamVela: (vela2.close - vela2.open) * 100000, tamVelaAnt: (arrVelaFuerza[arrVelaFuerza.length - 2].close - arrVelaFuerza[arrVelaFuerza.length - 2].open) * 100000/*, pendienteOrden: (arrCalculoMedia14[arrCalculoMedia14.length - 1] - arrCalculoMedia14[arrCalculoMedia14.length - 2])*/};
		velaOperativa.markerType = "circle";
		orden.vo = velaOperativa;
		velaOperativa.markerSize = 1000;
		velaOperativa.markerColor = "brown";
		velaOperativa.indexLabel = "V";
		nStopLoss = 0;
		
		console.log("************************** INICIO ORDEN ****************************");
		console.log((vela2.close - vela2.open) * 100000);
		console.log(vela);
		console.log(stoc);
		console.log(rsiCalc);
		console.log(macdCalc);
		console.log(orden);
		console.log("\n\n\n");
		
		
		arrOrdenes.push(orden);	
	}
	
}




process.on('message', (msg) => {
	//console.log('inicio Proceso');
	process.send({ cmd: 'inicio Proceso', data: process.pid });
	//console.log(msg + ' ' + process.pid);
	
	//fs.readFile("FIX.4.4-TOMADOR_DE_ORDENES-ORDERROUTER.messages_20170809.log", 'utf8', function(err, data) {
	fs.readFile("./marketdata/EURUSD-2015-04.csv", 'utf8', function(err, data) {
	//fs.readFile("./marketdata/NZDUSD-2016-04.csv", 'utf8', function(err, data) {
		/*//console.log(fs);
		fs.close(2, function(){});
		delete fs;*/
		console.log(err);
		arr = data.split("\n");
		arrVelaFuerza = [];
		arrVelaFuerza2 = [];
		arrVelaOperativa = [];
		arrVelaOperativa2 = [];
		arrVelaReferencia = [];
		arrVelaReferencia2 = [];
		var cont = 0;
		objFunciones['ini'](arr[0].split(','));
		//for(let i in arr){
		for(let i = 0; i < arr.length/1 - 1; i++){	
			var dato = arr[i].split(',');
			//objFunciones[dato[1][13] % 5](dato);				
			objFunciones[dato[1][12]](dato);
			/*if(orden != null){
				if(orden.tipo == 'C'){
					if(((dato[3] - orden.open) * 100000) - 16 < orden.stopLoss || (vela2.close - vela2.open) * 10000 < -3){
						orden.close = dato[3];
						orden.vo.indexLabel = 'c';
						//orden.fecFin = dato[1];
						orden.fin = vela.date;
						orden.obs = ((dato[3] - orden.open) * 100000) - 16 < orden.stopLoss ? "stopLoss" : 'señal';
						orden.total = ((dato[3] - orden.open) * 100000) - 16;	
						if(orden.total < 0){
							orden.vo.indexLabel = 'L';
						}
						//ee.on('orden', fnAbrirOrden);
						orden = null;
				} else {
					if(((dato[3] - orden.open) * -100000) - 16 < orden.stopLoss || (vela2.close - vela2.open) * 100000 > 3){
						orden.close = dato[3];
						//orden.fecFin = dato[1];
						orden.vo.indexLabel = 'v';
						orden.fin = vela2.date;
						orden.obs = "stopLoss";
						orden.total = ((dato[3] - orden.open) * -100000) - 16;
						if(orden.total < 0){
							orden.vo.indexLabel = 'S';
						}
						//ee.on('orden', fnAbrirOrden);
						orden = null;
				}
					
			}*/
			
		}
		
		var total = 0;
		var totalPos = 0;
		var totalNeg = 0;
		var totalCompras = 0;
		var totalVentas = 0;
		if(arrOrdenes.length > 0 && arrOrdenes[arrOrdenes.length - 1]['close'] == null){
			//arrOrdenes.pop();
			orden.close = dato[3];
			orden.fecFin = dato[1];
			orden.fin = vela2.date;
			orden.obs = "stopLoss";
			orden.total = ((dato[3] - orden.open) * 100000 * (orden.tipo == 'V' ? -1 : 1)) - 16;
			
			//ee.on('orden', fnAbrirOrden);
			orden = null;
		}
		
		
		fs2.appendFileSync('./querysReconstruccion/ordenes.txt', "******************************************************************\n", (err) => {
				if (err) throw err;
					//console.log('The "data to append" was appended to file!');
				});
		
		
		//
		for(let i in arrOrdenes){//8624190
			fs2.appendFileSync('./querysReconstruccion/ordenes.txt', JSON.stringify(arrOrdenes[i]) + "\n", (err) => {
				if (err) throw err;
					//console.log('The "data to append" was appended to file!');
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
					//console.log('The "data to append" was appended to file!');
				});




		//console.log("FINALIZANDO");
		process.send({ cmd: 'fin proceso', data: process.pid });
		process.send({ cmd: 'enviarMkdt', data: [arrVelaFuerza2, arrVelaOperativa2, arrVelaReferencia, arrSMA, arrWMA] });
		console.log(arrEval);
		
	});
	
	//console.log("FIN");
	
});
process.send({ cmd: process.pid });

