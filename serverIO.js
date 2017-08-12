var express = require('express');  
const Shared = require('mmap-object');
 


const shared_object = new Shared.Create('filename')

shared_object['new_key'] = 'some value'
shared_object.new_property = 'some other value'

// Erase a key
delete shared_object['new_key']

shared_object.close();

// Read a file
/*const read_only_shared_object = new Shared.Open('filename')

console.log(`My value is ${read_only_shared_object.new_property}`)
*/

var app = express();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;




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
            var read_only_shared_object = new Shared.Open('filename');

            console.log(`MASTER: My value is ${read_only_shared_object.new_property}`)
        break;
    }
	
}






if (cluster.isMaster) {
	console.log(`Master ${process.pid} is running`);
  
	cluster.setupMaster({
	  exec: 'httpServer.js',
	  args: [],
	  silent: false
  });
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  

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