var abandonedbaby = require('./technicalindicators.js').abandonedbaby;

var bearishengulfingpattern = require('./technicalindicators.js').bearishengulfingpattern;
var bullishengulfingpattern = require('./technicalindicators.js').bullishengulfingpattern;
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

var BB = require('./technicalindicators.js').BollingerBands;

var period = 14

var ini = {
period : period, 
values : [] ,
stdDev : 2
    
}

var bb = new BB(ini);
var bbGraf;
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


var cuenta = 500;
var ponderado = .5;
var spread = 0.00030;
var ajusteStop = 0.0004




//var result        = AbandonedBaby.logic(threeDayInput);
//console.log('Is Abandoned Baby : '+ result);
var fs = require('fs');
var fs2 = require('fs');
var fsLog = require('fs');
var EventEmitter = require('events').EventEmitter;
const Stochastic = require('./technicalindicators.js').Stochastic;
var SMA = require('./technicalindicators.js').SMA;
var WMA = require('./technicalindicators.js').WMA;
var RSI = require('./technicalindicators.js').RSI;
var MACD = require('./technicalindicators.js').MACD;
var inputIni = {
	  high: [],
	  low: [],
	  close: [],
	  period: 10,
	  signalPeriod: 3
	};
var stochastic = new Stochastic(inputIni);
var smaProducer = new SMA({period : 200, values : []});
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
var arrUpper = [];
var arrLower = [];
var arrMiddle = [];

const cluster = require('cluster');
var arr;

var vela;
var velaSombra;
var velaOperativa;
var vela2;
var vela3;
var orden;
var cont = 0;


function fnInicial(dato){
	dato[4] = Number(dato[4]);
	vela = {date: 1, open: dato[4], close: dato[4], low: dato[4], high: dato[4]};
	vela2 = {date: 1, open: dato[4], close: dato[4], low: dato[4], high: dato[4]};
	vela3 = {date: 1, open: dato[4], close: dato[4], low: dato[4], high: dato[4]};
	
	arrVelaOperativa.push(vela);
/*bbGraf = bb.nextValue(Number(vela.close));
	arrLower.push(bbGraf.lower);
	arrMiddle.push(bbGraf.middle);
	arrUpper.push(bbGraf.upper);
*/
	fnInicialSombra(dato);
}

function fnInicialSombra(dato){
	
	dato[4] = Number(dato[4]);
	velaSombra = {date: 1, open: dato[4] + desfaseSombra, close: dato[4] + desfaseSombra, low: dato[4] + desfaseSombra, high: dato[4] + desfaseSombra};	
	arrVelaOperativaSombra.push(velaSombra);
}


function fnSignals(dato){
	vela.close = Number(vela.close);
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
			orden.total = ((dato[3] - orden.open) * -ajusteDecimal) - 16;
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
			orden.total = ((dato[3] - orden.open) * ajusteDecimal) - 16;	
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
var arrTamVelas = [];
var tamVelas = 0;


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


function fnEvaluaVelas(dato, tipo, arrV){
	arrTamVelas.push((vela.high - vela.low) / 10);
	if(arrTamVelas.length > 10){
		tamVelas += ((vela.high - vela.low) / 10) - arrTamVelas.shift();
		
		sw = true;
	} else {
		tamVelas += (vela.high - vela.low) / 10;
		sw = false;
	}
	if(arrV.length > 2 && sw){
		
		//var abandonedBaby = new AbandonedBaby ();
		//console.log();

		 


		
		
		var input = {
			open: [arrV[arrV.length - 3].open * ajusteDecimal, arrV[arrV.length - 2].open * ajusteDecimal, arrV[arrV.length - 1].open * ajusteDecimal],
			high: [arrV[arrV.length - 3].high * ajusteDecimal, arrV[arrV.length - 2].high * ajusteDecimal, arrV[arrV.length - 1].high * ajusteDecimal],
			close: [arrV[arrV.length - 3].close * ajusteDecimal, arrV[arrV.length - 2].close * ajusteDecimal, arrV[arrV.length - 1].close * ajusteDecimal],
			low: [arrV[arrV.length - 3].low * ajusteDecimal, arrV[arrV.length - 2].low * ajusteDecimal, arrV[arrV.length - 1].low * ajusteDecimal],
			tamVelas: tamVelas * ajusteDecimal
		  };
		
		//console.log(tamVelas);
		//console.log(input);
		sw = false;
		/*if(abandonedbaby(input)){
			console.log('abandonedbaby');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = "1";
		}*/
		//console.log('RES:  ' + threeoutsidedown(input));
		
		if(bearishengulfingpattern(input)){
		//if(threeoutsidedown(input)){
			/*console.log('****************stoc********************');
			console.log("vela: " + velaOperativa.x);
			console.log(stoc);*/
			sw = true;
			arrEval.push(2);
			console.log('bearishengulfingpattern');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "2";
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
			arrEval.push(3);
			console.log('bullishengulfingpattern');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "3";
		}
	
		
		/*
		
		if(orden != null){
			if((orden.tipo == 'C' && stoc.k > 80 && stoc.d > 80) ){
				
				orden.close = dato[3];
				//orden.vo.indexLabel = 'C';
				
				orden.fin = vela.date;
				orden.obs = 'señal';
				orden.total = (((dato[3] - orden.open) * ajusteDecimal) - 16) * Math.abs(orden.lote);	
				orden.totalReal = ((dato[3] - orden.open) * ajusteDecimal) - 16;	
				
				fnCalcCuenta(orden.total);
				
				if(orden.totalReal < 0){
					orden.vo.indexLabel = 'L';
					orden.tipo = 'L';
				}
				console.log(orden);
				orden = null;							
				//sw = true;
			} else if((orden.tipo == 'V' && stoc.k < 20 && stoc.d < 20)){
				orden.close = dato[3];
				//orden.vo.indexLabel = 'v';
				orden.fin = vela2.date;
				orden.obs = "señal";
				orden.total = (((dato[3] - orden.open) * -ajusteDecimal) - 16) * Math.abs(orden.lote);
				orden.totalReal = ((dato[3] - orden.open) * -ajusteDecimal) - 16;
				fnCalcCuenta(orden.total);
				if(orden.totalReal < 0){
					orden.vo.indexLabel = 'S';
					orden.tipo = 'S';
				}	
				console.log(orden);
				orden = null;
				//sw = true;
					
			}
		}

		*/

		/*if(darkcloudcover(input)){
			console.log('darkcloudcover');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "4";
		}
		*/
		
		if(orden == null && sw){
			//console.log(arrV[arrV.length - 1]['y'][1]  + " >= " + arrWMA[arrWMA.length - 1].y + " >= " + arrV[arrV.length - 1]['y'][2])
			//if(Number(arrVelaOperativa2[arrVelaOperativa2.length - 1]['y'][1]) >= Number(arrWMA[arrWMA.length - 1].y) && Number(arrWMA[arrWMA.length - 1].y) >=  Number(arrVelaOperativa2[arrVelaOperativa2.length - 1]['y'][2])){
				console.log('****************stoc********************');
				//console.log("vela: " + velaOperativa.x);
				//console.log(stoc);
				
				switch(arrEval[arrEval.length - 1]){
					case 2:
						fnVenta(dato, tipo, arrV);
					break;
					case 3:
						fnCompra(dato, tipo, arrV);
					break;
				}
				
				
			//}
					
		
		}
		
		
		
						
	
	
		
		
		/*if(downsidetasukigap(input)){
			console.log('downsidetasukigap');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "5";
		}*/
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
		/*if(bullishharami(input)){
			console.log('bullishharami');
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = (velaOperativa.indexLabel != null ? '-' : '') + "8";
		}*/
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
		/*if(morningdojistar(input)){
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
		}*/
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
var arrStoc = [];


function fnImprimirOperacion(){
	fs2.appendFileSync('./querysReconstruccion/ordenes.txt', JSON.stringify(orden) + "\n", (err) => {
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


function fnEvaluaCierre(origen){
	//console.log();
	if(orden != null && origen == orden.origen){
		console.log(orden);
		if(orden.tipo == 'C'){
			//if((((vela.close - orden.open) * ajusteDecimal) - spread) * orden.lote < orden.stopLoss){
			console.log(vela);
			if(vela.close < orden.stopLoss){
				orden.close = orden.stopLoss;
				orden.vo.indexLabel = 'C';
				//orden.fecFin = dato[1];
				orden.fin = vela.date;
				//orden.obs = ((vela.open - orden.open) * ajusteDecimal) - spread < orden.stopLoss ? "stopLoss" : 'señal';
				//orden.total = orden.stopLoss;//((vela.open - orden.open) * ajusteDecimal) - 16;	
				orden.total = (orden.close - orden.open - spread) * ajusteDecimal;//((vela.open - orden.open) * ajusteDecimal) - 16;	
				//orden.totalReal = orden.stopLoss;//((vela.open - orden.open) * ajusteDecimal) - 16;	
				orden.totalReal = orden.total * orden.lote;//((vela.open - orden.open) * ajusteDecimal) - 16;	
				
				fnCalcCuenta(orden.totalReal);
				orden.cta = cuenta;
				
				if(orden.total < 0){
					orden.vo.indexLabel = 'L';
					orden.tipo = 'L';
				}
				//ee.on('orden', fnAbrirOrden);
				fnImprimirOperacion();
				orden = null;
			} else {
				//if((((vela.close - orden.open) * ajusteDecimal) - spread) * orden.lote > (40 * orden.lote)){
				if(vela.close > orden.open + spread + ajusteStop){
					if(orden.stopLoss < orden.open + spread){
						orden.stopLoss = orden.open + spread;
					} else {
						//if((((vela.close - orden.open) * ajusteDecimal) - spread) * orden.lote - (40 * orden.lote) > orden.stopLoss){
						if(vela.close - ajusteStop > orden.stopLoss){
							//orden.stopLoss = (((vela.close - orden.open) * ajusteDecimal) - spread) * orden.lote - (40 * orden.lote);
							orden.stopLoss = vela.close - ajusteStop;
						}
						
					}
				}
			}
			/*if(vela.close){
				
			}*/
		} else {
			//console.log(dato[1] + " - " + orden.open + " = " + ((dato[1] - orden.open) * -ajusteDecimal));
			
			if(vela.close > orden.stopLoss){
				/*console.log(vela);
				console.log(dato);
				console.log("eval=" + vela.close + " - " + orden.open + " = " + ((vela.close - orden.open) * -ajusteDecimal));
				console.log(vela.open + " - " + orden.open + " * -ajusteDecimal= " + ((vela.open - orden.open) * -ajusteDecimal));*/
				orden.close = orden.stopLoss;
				//orden.fecFin = dato[1];
				orden.vo.indexLabel = 'V';
				orden.fin = vela.date;
				orden.obs = "stopLoss";
				//console.log(vela.open + " - " + orden.open + " = " + ((vela.open - orden.open) * -ajusteDecimal));
				//orden.total = orden.stopLoss;//((vela.open - orden.open) * -ajusteDecimal) - 16;
				orden.total = (orden.open - orden.stopLoss - spread) * ajusteDecimal;//((vela.open - orden.open) * -ajusteDecimal) - 16;
				orden.totalReal = orden.total * orden.lote;//((vela.open - orden.open) * -ajusteDecimal) - 16;
				//orden.max = ((vela.low - orden.open) * ajusteDecimal) - spread;
				fnCalcCuenta(orden.totalReal);
				orden.cta = cuenta;
				if(orden.total < 0){
					orden.vo.indexLabel = 'S';
					orden.tipo = 'S';
				}
				//ee.on('orden', fnAbrirOrden);
				fnImprimirOperacion();
				orden = null;
			} else {
				/*if((((vela.close - orden.open) * -ajusteDecimal) - spread) * orden.lote > (40 * orden.lote)){
					if(orden.stopLoss < 0){
						orden.stopLoss = 0;
					} else {
						if((((vela.close - orden.open) * -ajusteDecimal) - spread) * orden.lote - (40 * orden.lote) > orden.stopLoss){
							orden.stopLoss = (((vela.close - orden.open) * -ajusteDecimal) - spread) * orden.lote - (40 * orden.lote);
						}
						
					}
				}*/
				if(vela.close < orden.open - (spread + ajusteStop)){
					if(orden.stopLoss > orden.open - spread){
						orden.stopLoss = orden.open - spread;
					} else {
						//if((((vela.close - orden.open) * ajusteDecimal) - spread) * orden.lote - (40 * orden.lote) > orden.stopLoss){
						if(vela.close + ajusteStop < orden.stopLoss){
							//orden.stopLoss = (((vela.close - orden.open) * ajusteDecimal) - spread) * orden.lote - (40 * orden.lote);
							orden.stopLoss = vela.close + ajusteStop;
						}
						
					}
				}
			}
		}
	
	}

}




function fnVelaNueva(dato){
	//console.log('fnVelaNueva');
	velaOperativa = {x: vela.date, y:[vela.open, vela.high, vela.low, vela.close]};
	dato[1] = Number(dato[1]);
	dato[2] = Number(dato[2]);
	dato[3] = Number(dato[3]);
	dato[4] = Number(dato[4]);
	//arrVelaOperativa2.push([vela.date, vela.low, vela.open, vela.close, vela.high]);
	////console.log(velaOperativa);
	arrVelaOperativa2.push(velaOperativa);
	
	
	fnEvaluaCierre('N');
	
	fnEvaluaVelas(dato, 'N', arrVelaOperativa);

	
	/*var input = {
	  high: [vela.high],
	  low: [vela.low],
	  close: [vela.close],
	  period: 10,
	  signalPeriod: 3
	};
	
	stoc = stochastic.nextValue(input);
	arrStoc.push(stoc);
	rsiCalc = rsi.nextValue(vela.close);
	macdCalc = macd.nextValue(vela.close);
	*/
	////console.log(smaProducer.nextValue(vela.close));
	////console.log(wma.nextValue(vela.close));
	////console.log(macdCalc);
	//console.log(stoc);
	////console.log(macd.nextValue(vela.close));
	
	//fnSignals(dato);
		
	
	
	
	//arrVelaFuerza2.push({x: vela2.date, y: [vela2.open, vela2.high, vela2.low, vela2.close]});
	
	vela = {open: dato[1], close: dato[4], low: dato[3], high: dato[2]};
	
	//vela2 = {open: (vela2.open + vela2.close) / 2, close: (vela2.open + vela2.close) / 2, low: (vela2.open + vela2.close) / 2, high: (vela2.open + vela2.close) / 2};
	
	////console.log(vela);
	////console.log(vela2);
	//arrVelaFuerza.push(vela2)
	arrVelaOperativa.push(vela);
	vela.date = arrVelaOperativa.length;
	objFunciones[((parseInt(dato[0][11]) + 3) % 5) + '_2'](dato);
	//vela2.date = arrVelaOperativa.length;
	cont++;
	/*if(cont == 4){
		cont = 0;
		vela3 = {open: dato[1], close: dato[4], low: dato[3], high: dato[2]};
		arrVelaReferencia.push(vela3);
		vela3.date = arrVelaReferencia.length;
		//break;
	}*/
	
	objFunciones['0'] = fnVelaNormal2;
}




function fnVelaNuevaSombra(dato){
	//console.log('fnVelaNueva');
	velaOperativaSombra = {x: velaSombra.date, y:[velaSombra.open, velaSombra.high, velaSombra.low, velaSombra.close]};
	dato[1] = Number(dato[1]);
	dato[2] = Number(dato[2]);
	dato[3] = Number(dato[3]);
	dato[4] = Number(dato[4]);
	//arrVelaOperativa2.push([vela.date, vela.low, vela.open, vela.close, vela.high]);
	////console.log(velaOperativa);
	arrVelaOperativaSombra2.push(velaOperativaSombra);
	fnEvaluaCierre('S');
	
	fnEvaluaVelas(dato, 'S', arrVelaOperativaSombra);

	
	velaSombra = {open: dato[1] + desfaseSombra, close: dato[4] + desfaseSombra, low: dato[3] + desfaseSombra, high: dato[2] + desfaseSombra};
	arrVelaOperativaSombra.push(velaSombra);
	velaSombra.date = arrVelaOperativaSombra.length;
	
	objFunciones['0_2'] = fnVelaNormalSombra2;
}

function fnVelaNormal2(dato){
	
	dato[2] = Number(dato[2]);
	dato[3] = Number(dato[3]);
	dato[4] = Number(dato[4]);
	vela.close = dato[4];
	/*vela3.close = dato[4];
	vela2.close = (dato[4] + vela2.open + vela2.low + vela2.high) / 4;*/
	if(dato[2] > vela.high){
		vela.high = dato[2];
		
	}

	if(dato[3] < vela.low){
		vela.low = dato[3];
		
	}
	
	objFunciones[((parseInt(dato[0][11]) + 3) % 5) + '_2'](dato);
	
	/*if(vela2.close > vela2.high){
		
		vela2.high = vela2.close;
	} else {
		if(vela2.close < vela2.low){
			
			vela2.low = vela2.close;
		}
	}
	if(dato[2] > vela3.high){
		vela3.high = dato[2];
		
	}
	 
	if(dato[3] < vela3.low){
		vela3.low = dato[3];
		
	}*/
}//2134068


function fnVelaNormalSombra2(dato){
	
	var high = Number(dato[2]) + desfaseSombra;
	var low = Number(dato[3]) + desfaseSombra;
	var closeN = Number(dato[4]) + desfaseSombra;
	velaSombra.close = closeN;
	if(high > velaSombra.high){
		velaSombra.high = high;		
	}

	if(low < velaSombra.low){
		velaSombra.low = low;		
	}
	
	
}//2134068


function fnVelaNormal(dato){
	objFunciones['0'] = fnVelaNueva;
	
	dato[2] = Number(dato[2]);
	dato[3] = Number(dato[3]);
	dato[4] = Number(dato[4]);
	vela.close = dato[4];
	/*vela3.close = dato[4];
	vela2.close = (dato[4] + vela2.open + vela2.low + vela2.high) / 4;
	if(dato[2] > vela.high){
		vela.high = dato[2];
		
	}*/

	if(dato[2] > vela.high){
		vela.high = dato[2];
		
	}

	if(dato[3] < vela.low){
		vela.low = dato[3];
		
	}
	
	objFunciones[((parseInt(dato[0][11]) + 3) % 5) + '_2'](dato);
	
	/*if(vela2.close > vela2.high){
		
		vela2.high = vela2.close;
	} else {
		if(vela2.close < vela2.low){
			
			vela2.low = vela2.close;
		}
	}
	if(dato[2] > vela3.high){
		vela3.high = dato[2];
		
	}
	 
	if(dato[3] < vela3.low){
		vela3.low = dato[3];
		
	}*/
}

function fnVelaNormalSombra(dato){
	objFunciones['0_2'] = fnVelaNuevaSombra;
	
	var high = Number(dato[2]) + desfaseSombra;
	var low = Number(dato[3]) + desfaseSombra;
	var closeN = Number(dato[4]) + desfaseSombra;
	velaSombra.close = closeN;
	if(high > velaSombra.high){
		velaSombra.high = high;		
	}

	if(low < velaSombra.low){
		velaSombra.low = low;		
	}
}

function fnNo(dato){
	return 'NO';
}

var arrVelaOperativa = [];
var arrVelaOperativaSombra = [];
var arrVelaReferencia = [];
var arrVelaFuerza = [];
var arrVelaOperativaSombra2 = [];
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


function fnCompra(close, tipo, arrV){
	var dato = close;
	//if(bbGraf && bbGraf.upper > arrVelaOperativa[arrVelaOperativa.length - 1].close){
		if(cuenta > 0){
			/*console.log(arrStoc[arrStoc.length - 2]);
			console.log(arrStoc[arrStoc.length - 1]);*/
			
			orden = {origen: tipo, open: close[3], tipo: 'C', ini: vela.date/*, bollierg: (bbGraf && bbGraf.upper < vela.close ? true : false), valBoll: (bbGraf ? bbGraf.upper : 'none'), vela: arrVelaOperativa[arrVelaOperativa.length - 1], bbGraf: bbGraf*/};
			velaOperativa.markerType = "circle";
			orden.vo = velaOperativa;
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = "C";
			console.log(arrV);
			orden.stopLoss = (-Math.abs(arrV[arrV.length - 2].close - arrV[arrV.length - 1].close) * ajusteDecimal - 26) < -166 ? orden.open - 0.00166 : arrV[arrV.length - 2].close - spread - 0.00010;
			//orden.stopLoss = arrVelaOperativa[arrVelaOperativa.length - 2].close - spread - 0.00010;
			//orden.stopLoss = (-Math.abs(arrVelaOperativa[arrVelaOperativa.length - 2].close - arrVelaOperativa[arrVelaOperativa.length - 1].close) * ajusteDecimal - 26) * ponderado < -316 * ponderado ? -316 * ponderado : (-Math.abs(arrVelaOperativa[arrVelaOperativa.length - 2].close - arrVelaOperativa[arrVelaOperativa.length - 1].close) * ajusteDecimal - spread - 10) * ponderado;
			//orden.stopLoss = -Math.abs(arrVelaOperativa[arrVelaOperativa.length - 2].close - arrVelaOperativa[arrVelaOperativa.length - 1].close) * ajusteDecimal - 26 < -316 ? -316 : arrVelaOperativa[arrVelaOperativa.length - 2].close - 0.00026;
			nStopLoss = 0;
			orden.lote = ponderado;
			console.log("************************** INICIO ORDEN ****************************");
			console.log(orden);
			console.log("\n\n\n");
			
			
			
			//ee.removeAllListeners('orden');
			//ee.on('orden', fnCerrarOrdenCompra);
			//arrOrdenes.push(orden);
		}
	//}
	
	
}

function fnVenta(close, tipo, arrV){
	var dato = close;
	//if((vela2.close - vela2.open) * ajusteDecimal < -11){
		/*console.log(arrVelaOperativa[arrVelaOperativa.length - 3]);
		console.log(arrVelaOperativa[arrVelaOperativa.length - 2]);
		console.log(arrVelaOperativa[arrVelaOperativa.length - 1]);*/
	//if(bbGraf && bbGraf.lower < arrVelaOperativa[arrVelaOperativa.length - 1].close){
		if(cuenta > 0){
			/*console.log(arrStoc[arrStoc.length - 2]);
			console.log(arrStoc[arrStoc.length - 1]);*/
			//console.log(vela2.close - vela2.open);
			orden = {origen: tipo, open: Number(close[3]), tipo: 'V', ini: vela.date/*, bollierg: (bbGraf && bbGraf.lower > vela.close ? true : false), valBoll: (bbGraf ? bbGraf.lower : 'none'), vela: arrVelaOperativa[arrVelaOperativa.length - 1], bbGraf: bbGraf*/};
			velaOperativa.markerType = "circle";
			orden.vo = arrV[arrV.length - 1];
			velaOperativa.markerSize = 1000;
			velaOperativa.markerColor = "brown";
			velaOperativa.indexLabel = "V";
			nStopLoss = 0;
			orden.lote = ponderado;
			//orden.stopLoss = (-Math.abs(arrVelaOperativa[arrVelaOperativa.length - 2].close - arrVelaOperativa[arrVelaOperativa.length - 1].close) * ajusteDecimal - 26) * ponderado < -316 * ponderado ? -316 * ponderado : (-Math.abs(arrVelaOperativa[arrVelaOperativa.length - 2].close - arrVelaOperativa[arrVelaOperativa.length - 1].close) * ajusteDecimal - spread - 10) * ponderado;
			orden.stopLoss = (-Math.abs(arrV[arrV.length - 2].close - arrV[arrV.length - 1].close) * ajusteDecimal - 26) < -166 ? orden.open + 0.00166 : arrV[arrV.length - 2].close + spread + 0.00010;
			//orden.stopLoss = arrVelaOperativa[arrVelaOperativa.length - 2].close + spread + 0.00010;
			//orden.stopLoss = -Math.abs(arrVelaOperativa[arrVelaOperativa.length - 2].close - arrVelaOperativa[arrVelaOperativa.length - 1].close) * ajusteDecimal - 26;
			console.log("************************** INICIO ORDEN ****************************");
			//console.log((vela2.close - vela2.open) * ajusteDecimal);
			console.log(vela);
			/*console.log(stoc);
			console.log(rsiCalc);
			console.log(macdCalc);*/
			console.log(orden);
			console.log("\n\n\n");
			
			
			//arrOrdenes.push(orden);	
		}
	//}
	
	
}




process.on('message', (msg) => {
	//console.log('inicio Proceso');
	process.send({ cmd: 'inicio Proceso', data: process.pid });
	//console.log(msg + ' ' + process.pid);
	
	//fs.readFile("FIX.4.4-TOMADOR_DE_ORDENES-ORDERROUTER.messages_20170809.log", 'utf8', function(err, data) {
	fs.readFile("./marketdata/DAT_NT_EURUSD_M1_TOTAL.csv", 'utf8', function(err, data) {
	//fs.readFile("./marketdata/DAT_NT_USDJPY_M1_TOTAL.csv", 'utf8', function(err, data) {
		
	//fs.readFile("./marketdata/DAT_NT_EURAUD_M1_TOTAL.csv", 'utf8', function(err, data) {
	//fs.readFile("./marketdata/DAT_NT_EURUSD_M1_2000.csv", 'utf8', function(err, data) {
	//fs.readFile("./marketdata/DAT_NT_GBPCHF_M1_TOTAL.csv", 'utf8', function(err, data) {
	//fs.readFile("./marketdata/NZDUSD-2016-04.csv", 'utf8', function(err, data) {
		/*//console.log(fs);
		fs.close(2, function(){});
		delete fs;*/
		if(err){
			console.log(err);
			return;
		}
		
		arr = data.split("\n");
		console.log(arr.length);
		/*arrVelaFuerza = [];
		arrVelaFuerza2 = [];*/
		arrVelaOperativa = [];
		arrVelaOperativa2 = [];
		/*arrVelaReferencia = [];
		arrVelaReferencia2 = [];*/
		var cont = 0;
		objFunciones['ini'](arr[0].split(';'));
		var anio = '0'
		//for(let i in arr){
		for(let i = 0; /*arrVelaOperativa2.length < 400*/i < arr.length/1 - 1; i++){	
			var dato = arr[i].split(';');
			
			
			/*if(orden != null){
				if(orden.tipo == 'C'){
					if(((dato[3] - orden.open) * ajusteDecimal) - 16 < orden.stopLoss){
						orden.close = dato[1];
						orden.vo.indexLabel = 'C';
						//orden.fecFin = dato[1];
						orden.fin = vela.date;
						orden.obs = ((dato[1] - orden.open) * ajusteDecimal) - 16 < orden.stopLoss ? "stopLoss" : 'señal';
						orden.total = ((dato[1] - orden.open) * ajusteDecimal) - 16;	
						orden.totalReal = ((dato[1] - orden.open) * ajusteDecimal) - 16;	
						if(orden.total < 0){
							orden.vo.indexLabel = 'L';
							orden.tipo = 'L';
						}
						//ee.on('orden', fnAbrirOrden);
						orden = null;
					}
				} else {
					//console.log(dato[1] + " - " + orden.open + " = " + ((dato[1] - orden.open) * -ajusteDecimal));
					
					if(((dato[3] - orden.open) * -ajusteDecimal) - 16 < orden.stopLoss){
						console.log(dato);
						console.log("eval=" + dato[3] + " - " + orden.open + " = " + ((dato[3] - orden.open) * -ajusteDecimal));
						console.log(dato[1] + " - " + orden.open + " * -ajusteDecimal= " + ((dato[1] - orden.open) * -ajusteDecimal));
						orden.close = dato[1];
						//orden.fecFin = dato[1];
						orden.vo.indexLabel = 'V';
						orden.fin = vela2.date;
						orden.obs = "stopLoss";
						console.log(dato[1] + " - " + orden.open + " = " + ((dato[1] - orden.open) * -ajusteDecimal));
						orden.total = ((dato[1] - orden.open) * -ajusteDecimal) - 16;
						orden.totalReal = ((dato[1] - orden.open) * -ajusteDecimal) - 16;
						if(orden.total < 0){
							orden.vo.indexLabel = 'S';
							orden.tipo = 'S';
						}
						//ee.on('orden', fnAbrirOrden);
						orden = null;
					}	
				}
			
			}*/
			
			if(dato[0][3] != anio){
				anio = dato[0][3];
				fs2.appendFileSync('./querysReconstruccion/ordenes.txt', "\nCUENTA:: " + cuenta +  "\n", (err) => {
					if (err) throw err;
						//console.log('The "data to append" was appended to file!');
					});
			}
			if(cuenta == -1){
				break;
			}
			//objFunciones[0 + ''](dato);//-->VELAS DE UN MINUTO			
			//objFunciones[dato[0][12] % 5](dato);//--> VELAS DE 5 MIN
			objFunciones[((parseInt(dato[0][11]) + 0) % 5) + ''](dato);//-->VELAS DE UNA HORA			
			//objFunciones[(dato[0][9] + '' + dato[0][10]) % 4](dato);//-->VELAS DE CUATRO HORA 
		}
		fs2.appendFileSync('./querysReconstruccion/ordenes.txt', "\nCUENTA:: " + cuenta +  "\n", (err) => {
			if (err) throw err;
				//console.log('The "data to append" was appended to file!');
			});
		


		if(arrOrdenes.length > 0 && arrOrdenes[arrOrdenes.length - 1]['close'] == null){
			//arrOrdenes.pop();
			orden.close = dato[3];
			orden.fecFin = dato[1];
			orden.fin = vela2.date;
			orden.obs = "final";
			orden.total = 0//((dato[3] - orden.open) * ajusteDecimal * (orden.tipo == 'V' ? -1 : 1)) - 16;
			orden.totalReal = 0;//((dato[3] - orden.open) * ajusteDecimal * (orden.tipo == 'V' ? -1 : 1)) - 16;
			
			
			//ee.on('orden', fnAbrirOrden);
			//orden = null;
		}
		
		
		fs2.appendFileSync('./querysReconstruccion/ordenes.txt', "******************************************************************\n", (err) => {
				if (err) throw err;
					//console.log('The "data to append" was appended to file!');
				});
		
		
		//
		/*for(let i in arrOrdenes){//8624190
			fs2.appendFileSync('./querysReconstruccion/ordenes.txt', JSON.stringify(arrOrdenes[i]) + "\n", (err) => {
				if (err) throw err;
					//console.log('The "data to append" was appended to file!');
				});
			try{
				//total += Math.abs(arrOrdenes[i]['total']) > 1 ? arrOrdenes[i]['total'] : 0;
				total += arrOrdenes[i]['total'];//arrOrdenes[i]['total'] < -30 ? -30 : arrOrdenes[i]['total'];
				total2 += arrOrdenes[i]['totalReal'];
				if(arrOrdenes[i]['totalReal'] > 0){
					totalPos += arrOrdenes[i]['totalReal'];
					totalBuenas++;
				} else {
					totalNeg += arrOrdenes[i]['totalReal'];
					totalMalas++;
				}
				if(arrOrdenes[i]['tipo'] == 'C'){
					totalCompras += arrOrdenes[i]['totalReal'];
				} else {
					totalVentas += arrOrdenes[i]['totalReal'];
				}
			} catch(e){
				
			}	
			
		}*/
		fs2.appendFileSync('./querysReconstruccion/ordenes.txt', "TOTAL GRAL:: " + total2 +  "\n" +  "TOTAL BUENAS: " + totalPos +  "\n" +  "TOTAL MALAS: " + totalNeg +  "\nTOTAL COMPRAS: " + totalCompras +  "\n" +  "TOTAL VENTAS: " + totalVentas + "\nOperaciones Buenas: " + totalBuenas + "\nOperaciones Malas: " + totalMalas, (err) => {
				if (err) throw err;
					//console.log('The "data to append" was appended to file!');
				});




		//console.log("FINALIZANDO");
		//console.log(arrSMA);
		process.send({ cmd: 'fin proceso', data: process.pid });
		process.send({ cmd: 'enviarMkdt', data: [arrVelaOperativaSombra2, arrVelaOperativa2, arrVelaReferencia, arrUpper, arrLower, arrMiddle/*, arrSMA, arrWMA*/] });
		/*console.log(arrVelaOperativa2[5834]);
		console.log(arrVelaOperativa2[5835]);*/
		
	});
	
	//console.log("FIN");
	
});
process.send({ cmd: process.pid });

