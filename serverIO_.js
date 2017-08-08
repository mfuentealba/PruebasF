var express = require('express');  
var app = express();  
var server = require('http').Server(app);  

const cluster = require('cluster');
var objLecturaLog = {};
var objLecturaLogPersistente = {};
var wk;
function fnMaster(msg){
	  console.log(msg);
    console.log(process.pid);
    switch(msg.cmd){
        case 'inicio Proceso':
          delete objLecturaLog[msg.data];
        break;
        case 'fin proceso':
          objLecturaLog[msg.data] = objLecturaLogPersistente[msg.data];
        break;
        case 'fix':
          console.log("***************************");
          console.log(msg.data);
        break;
        default:
            this.send('MASTER: Listo el proceso {' + process.pid + '}');	
        break;
    }
	
}

if (cluster.isMaster) {
	console.log(`Master ${process.pid} is running`);
  
	cluster.setupMaster({
	  exec: 'sock.js',
	  args: [],
	  silent: false
	});
  
    const wk = cluster.fork();
    //objLecturaLog[wk.process.pid] = wk;
    console.log(wk.process.pid);
	wk.on('message', fnMaster);
  
  
  
  
 

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




var messages = [{  
  id: 1,
  text: "Hola soy un mensaje",
  author: "Carlos Azaustre"
}];

app.use(express.static('public'));

app.get('/hello', function(req, res) {  
  res.status(200).send("Hello World!");
});



server.listen(8888, function() {  
  console.log("Servidor corriendo en http://localhost:8888");
});