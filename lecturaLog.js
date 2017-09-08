var fs = require('fs');
var fs2 = require('fs');
const cluster = require('cluster');
var arr;
const tagsFixs = require('./resources/fixtagnums.js');
const utilFix = require('./fixutils.js');
var EventEmitter = require('events').EventEmitter;
//var cache = require('memory-cache');


function fnExecRpt(data){
	//console.log(data);
	//utilFix.convertToMap(data)
	h2 = {};
			
	var campos = [];
	var valores = [];	
	for(var str in data){
		switch(tagsFixs['keyvals'][str]) { 
			case "BodyLength":				
			break;
			case "CheckSum":				
			break;
			case "MsgSeqNum":				
			break;
			case "MsgType":				
			break;
			case "SendingTime":				
			break;
			case "PartyIDSource":				
			break;
			case "PartyID":				
			break;
			case "PartyRole":				
			break;
			case "NoPartyIDs":				
			break;
			case "Broker":
				campos.push(tagsFixs['keyvals'][str]);
				valores.push('LVPOOL');
			break;
			case "":				
			break;
			case "TransactTime":	
				campos.push(tagsFixs['keyvals'][str]);
				var hora = h[str].split('-')[1];
				var dia = h[str].split('-')[0];
				dia = dia.substring(0, 4) + '-' + dia.substring(4, 6) + '-' + dia.substring(6, 8);
				valores.push(hora);
				var arrHora = hora.split(":");
				arrHora[0] -= 4;
				arrHora[0] = arrHora[0] > 9 ? arrHora[0] : '0' + arrHora[0];
				hora = arrHora.join(":");
				h[tagsFixs['keyvals']["TransactTime"]] = dia + " " + hora;
				
			break;
			default:
				if(h[str] != 'FIX.4.4' && str != ''){
					campos.push(tagsFixs['keyvals'][str]);
					valores.push(h[str]);
					
				}
				
			break;
		}
		
		//console.log("'" + str + "'");
		//tagsFixs['keyvals'][str];
		//h2[tagsFixs['keyvals'][str]] = h[str];
	}
	//console.log(h2);
	
	
	fs2.appendFileSync('./querysReconstruccion/query.txt', "insert into [Etrading].[dbo].[tbl_ExecRpt] ([" + campos.join('],[') + "], [fechaCreacion]) VALUES ('" + valores.join("','") + "',convert(datetime,'" + h[tagsFixs['keyvals']["TransactTime"]] + "', 121))\n", (err) => {
	  if (err) throw err;
	  console.log('The "data to append" was appended to file!');
	});
	
	//process.send({ cmd: 'fix', data: data });
}



var ee = new EventEmitter();

ee.on('8', fnExecRpt);
ee.on('3', fnExecRpt);
ee.on('9', fnExecRpt);





process.on('message', (msg) => {
	console.log('inicio Proceso');
	process.send({ cmd: 'inicio Proceso', data: process.pid });
	console.log(msg + ' ' + process.pid);
	
	//fs.readFile("FIX.4.4-TOMADOR_DE_ORDENES-ORDERROUTER.messages_20170809.log", 'utf8', function(err, data) {
	fs.readFile("FIX.4.4-ORDERROUTER-TOMADOR_DE_ORDENES.messages_20170908.log", 'utf8', function(err, data) {
		arr = data.split("\n");
		for(let i in arr){
			/*var h = arr[i][arr[i].length - 1];//[arr[i].length - 1] + '';//arr[i].substring(arr[i].length - 1, 1);
			var aux = arr[i].split(" ");
			var fix = [aux[0],...aux[1].split(h)];*/
			h = utilFix.convertToMap(arr[i]);
			
			//h = utilFix.convertToFIX(h);
			ee.emit(h['35'], h);
			//var fix = arr[i].split(h);
			/*if(h['35'] != 'A'){
				process.send({ cmd: 'fix', data: h });	
			}*/
			
			/*console.log(h);
			console.log('DATO: ' + fix[1]);*/
			
			//break;
		}
		var query = "update [Etrading].[dbo].[tbl_ExecRpt] set secondaryordid = '',  [underLyingLastQty] = 0,[underLyingLastPx] = 0, execrefid = '', [maxFloor] = 0 ,[clOrdLinkID] = ''  ,[senderSubID] = '',[deliverToCompID] = '' ,[onBehalfOfCompID] = '',[secondaryClOrdID] = '' "
		fs2.appendFileSync('./querysReconstruccion/query.txt', query + "\n", (err) => {
		  if (err) throw err;
		  console.log('The "data to append" was appended to file!');
		});
		
		var query = "update [Etrading].[dbo].[tbl_ExecRpt]   set securitytype = ''       where securitytype is null ";
      
		fs2.appendFileSync('./querysReconstruccion/query.txt', query + "\n", (err) => {
		  if (err) throw err;
		  console.log('The "data to append" was appended to file!');
		});
		
		var query = "update [Etrading].[dbo].[tbl_ExecRpt]   set [origClOrdID] = ''       where origClOrdID is null    ";
		fs2.appendFileSync('./querysReconstruccion/query.txt', query + "\n", (err) => {
		  if (err) throw err;
		  console.log('The "data to append" was appended to file!');
		});
		
		
		var query = "update [Etrading].[dbo].[tbl_ExecRpt]  set      price = 0       where price is null ";
		fs2.appendFileSync('./querysReconstruccion/query.txt', query + "\n", (err) => {
		  if (err) throw err;
		  console.log('The "data to append" was appended to file!');
		});
		
		process.send({ cmd: 'fin proceso', data: process.pid });
		
	});


	/*fs.watch("FIX.4.4-TOMADOR_DE_ORDENES-ORDERROUTER.messages_20170804.log", { encoding: 'utf8' }, (eventType, filename) => {
	  if (filename) {
		console.log(eventType);
		
	  }
	});*/
	
});
process.send({ cmd: process.pid });

