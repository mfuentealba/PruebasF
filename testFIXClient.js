var EventEmitter = require('events').EventEmitter;
//var wrapEmitter = require('emitter-listener');
 
var ee = new EventEmitter();

/*
ee.on('test', function (value) {
	console.log('EVENTOOOOOOO');
     
    });
*/
var id = 0;
 
/* 
var wrapEmitter = require('emitter-listener');
wrapEmitter(ee,
	  function mark(listener) {
		listener.id = id++;
	  },
	  function prepare(listener) {
		console.log('listener id is %d', listener.id);
	  }
  );
*/
ee.emit('test', 20);

var fix = require("./fix.js");

var session = fix.createClient("FIX.4.4", "CLIENTE", "LOGVIEWER", 6064, "172.16.240.79");
session.connectAndLogon(6064,'172.16.240.79');

/*var session = fix.createClient("FIX.4.4", "TOMADOR_DE_ORDENES", "ORDERROUTER", 7822, "antuco.larrainvial.com");
session.connectAndLogon(7822,'antuco.larrainvial.com');*/



/*session.getMessages(function(err, msg){
    if(err){
        console.log('Err from data store: '+err);     
    }
    else{
        console.log('Msg from data store: '+JSON.stringify(msg)); 
    }
});*/

session.on("connect", 
	function(){ 
		console.log("EVENT connect"); 		
		//this.write({'8':'"FIX.4.4','9':'258','35':'D','34':'3','49':'CLIENTE','50':'mfuentealba','52':'20170728-22:39:34.974','56':'LOGVIEWER','1':'115189387-00','11':'3260101e60384c80','21':'3','38':'5','40':'2','44':'1','54':'2','55':'AESGENER','59':'0','60':'20170728-22:39:34.967','63':'3','100':'XSGO','207':'XSGO','453':'2','448':'LVPOOL','447':'D','452':'1','448':'666','447':'D','452':'7','10':'186'});
	});
session.on("end", function(){ console.log("EVENT end"); });
session.on("logon", 
	function(sender, target){ 
		console.log("EVENT logon: "+ sender + ", " + target); 
		
	});
session.on("logoff", function(sender, target){ console.log("EVENT logoff: "+ sender + ", " + target); });
session.on("incomingmsg", 
	function(sender,target,msg){ 
		console.log("EVENT incomingmsg: "+ JSON.stringify(msg)); 
		//console.log(ee);
		ee.emit('p', 90);
		
	});
session.on("outgoingmsg", function(sender,target,msg){ console.log("EVENT outgoingmsg: "+ JSON.stringify(msg)); });

/*
const RtmpServer = require('rtmp-server');
const rtmpServer = new RtmpServer();
 
var arrClientes = []; 
 
rtmpServer.on('error', err => {
  throw err;
});
 
rtmpServer.on('client', client => {
  client.on('command', command => { 
    console.log(command.cmd, command); 
  }); 
 
  client.on('connect', () => {
     console.log('connect', client.app);
	 arrClientes.push(client.app);
	 console.log('connect', arrClientes);
	 client.emit('dataDone()', 'dataDone()');
  });
  
  client.on('play', ({ streamName }) => {
    console.log('PLAY', streamName);
  });
  
  client.on('publish', ({ streamName }) => {
    console.log('PUBLISH', streamName);
  });
  
  client.on('stop', () => {
    console.log('client disconnected');
  });
});
 
rtmpServer.listen(1935);
*/


/*
var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8888, function() {
    console.log((new Date()) + ' Server is listening on port 8888');
});

wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    
    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
	connection.sendUTF("HOLA");
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            //connection.sendUTF(message.utf8Data);
			session.write({'8':'"FIX.4.4','9':'258','35':'D','34':'3','49':'CLIENTE','50':'mfuentealba','52':'20170728-22:39:34.974','56':'LOGVIEWER','1':'115189387-00','11':'3260101e60384c80','21':'3','38':'5','40':'2','44':'1','54':'2','55':'AESGENER','59':'0','60':'20170728-22:39:34.967','63':'3','100':'XSGO','207':'XSGO','453':'2','448':'LVPOOL','447':'D','452':'1','448':'666','447':'D','452':'7','10':'186'});
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});*/
const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: 8888 });
 
wss.on('connection', function connection(ws) {
	
	const cluster = require('cluster');	
	cluster.setupMaster({
		  exec: 'worker2.js',
		  args: [],
		  silent: false
	});
	cluster.fork();	 
	cluster.workers[0].on('message', fnMaster);
	
	
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
	console.log(ws.wrapEmitter);
	session.write({'8':'"FIX.4.4','9':'258','35':'D','34':'3','49':'CLIENTE','50':'mfuentealba','52':'20170728-22:39:34.974','56':'LOGVIEWER','1':'115189387-00','11':'3260101e60384c80','21':'3','38':'5','40':'2','44':'1','54':'2','55':'AESGENER','59':'0','60':'20170728-22:39:34.967','63':'3','100':'XSGO','207':'XSGO','453':'2','448':'LVPOOL','447':'D','452':'1','448':'666','447':'D','452':'7','10':'186'});
  });
  
  ws.id = id++;
  //console.log(wrapEmitter);
  ws["ee" + id] = ee;
  ws["ee" + id].on('p', function (value) {
	console.log("\n" + ws.id);
	
  ws.on("close", function(code, reason){
	console.log("\n" + ws.id + " CERRADO"); 
	this.terminate();
	var i = ee._events.p.indexOf(this['ee' + ws.id]);
	console.log(i);
	console.log(ee);
  });
	
      /*t.equal(value, 31, "got expected value");
      t.deepEqual(values, [1, 2], "both marker functions were called");*/
    });
  /*ws.wrapEmitter = require('emitter-listener');
  ws.wrapEmitter(ee,
	  function mark(listener) {
		listener.id = id++;
	  },
	  function prepare(listener) {
		console.log('listener id is %d', listener.id);
	  }
  );*/
  console.log(ws.ee);
  ws.send('something');
});