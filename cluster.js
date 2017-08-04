const WebSocket = require('ws');
var EventEmitter = require('events').EventEmitter;
//var wrapEmitter = require('emitter-listener');
 
var ee = new EventEmitter();


 var id = 0;
const wss = new WebSocket.Server({ port: 8888 });
 
wss.on('connection', function connection(ws) {
	
	const cluster = require('cluster');
	const http = require('http');
	const numCPUs = require('os').cpus().length;



	function fnMaster(msg){
		console.log(msg);
		console.log(process.pid);
		this.send('Listo el proceso ' + process.pid);
		
		
	}

	if (cluster.isMaster) {
	  console.log(`Master ${process.pid} is running`);
	  
	  cluster.setupMaster({
		  exec: 'worker.js',
		  args: [],
		  silent: false
	});
	  
	  for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	  }
	  
	  
	  for (const id in cluster.workers) {
		cluster.workers[id].on('message', fnMaster);
		cluster.workers[id].testeo = ws
	  }
	  
	 

	console.log('Listo!!');

	  cluster.on('exit', (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died`);
		cluster.fork();
	  });
	} else {
	  
	  /*process.on('message', (msg) => {
		
		console.log(msg + ' ' + process.pid);
	  });
	  process.send({ cmd: process.pid });
	  console.log(`Worker ${process.pid} started`);*/
	}

	
	
	
	
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
	console.log(cluster.Worker);
	for (const id in cluster.workers) {
		cluster.workers[id].send('XXXX');
		
	  }
	
	
	
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
	
     
    });
  
  console.log(ws.ee);
  ws.send('something');
});



