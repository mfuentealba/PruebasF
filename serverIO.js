var express = require('express');  
var app = express();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);
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
			console.log("NUEVO VALOR");
			/*memored.store('key1', {firstname: 'Han', lastname: 'Solo'}, function() {
				console.log('Value stored!');
			});*/
			
            this.send('MASTER: Listo el proceso {' + process.pid + '}');	
        break;
    }
	
}






if (cluster.isMaster) {
	console.log(`Master ${process.pid} is running`);
  
	cluster.setupMaster({
	  exec: 'lecturaLog.js',
	  args: [],
	  silent: false
	});
  
    /*const wk = cluster.fork();
    //objLecturaLog[wk.process.pid] = wk;
    console.log(wk.process.pid);
	wk.on('message', fnMaster);
  */
  
  
  
 

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

io.on('connection', function(socket) {  
  console.log('Alguien se ha conectado con Sockets');
  socket.emit('messages', messages);

  socket.on('new-message', function(data) {
    messages.push(data);

    io.sockets.emit('messages', messages);
  });

  socket.on('message', function(data) {
    console.log('message');
    var i = 0;
    for(var str in objLecturaLog){
        i++;
        //console.log(str);
        //console.log(objLecturaLog[str]);
        
        //console.log(cluster.workers);
        break;
    }
    if(i == 0){
      console.log("Creando Fork");
      wk = cluster.fork();
      objLecturaLogPersistente[wk.process.pid] = wk;
      wk.on('message', fnMaster);
	  
	  
    } else {
      console.log("Fork Existente: " + str);
      objLecturaLog[str].process.send('Listo el proceso ' + process.pid);
      
    }
    
  });

  socket.on('contar', function(data) {
    console.log('******contar******');
    messages = [];
    var i = 0;
    for(var str in objLecturaLog){        
        console.log(str);        
        messages.push({  
  id: i++,
  text: str,
  author: "SYSTEM"
});
    }
    

    io.sockets.emit('messages', messages);
    console.log('******FIN******');    
  });
  

});

server.listen(8888, function() {  
  console.log("Servidor corriendo en http://localhost:8888");
});