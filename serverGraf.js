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
				ind++;	
				
			break;
			case 3:
				velaOperativa.indexLabel = resp;
				fs.appendFileSync('./querysReconstruccion/_logGraf_' + (ind) + '.txt', JSON.stringify(velaOperativa) + ",\n", (err) => {
					if (err) throw err;
						//console.log('The "data to append" was appended to file!');
					});
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



function fnVelaNueva(dato, arrVel, tipo){
	console.log('fnVelaNueva');
	console.log(tipo);
	atrGraf = atr.nextValue({close: [dato.close], high: [dato.high], low: [dato.low]});
	
	var vela = arrVel[arrVel.length - 1];
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

