var express = require('express');  
/*const Shared = require('mmap-object'); 
const shared_object = new Shared.Create('filename');*/



var d = new Date("2014.01.01:23:06");
console.log(d);
console.log(d.getTime());
var app = express();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

/*function* gen() 
{ 
	var a=0,b=undefined,c=0; 
	
	while(a<20)
	{ 
		if(b!=undefined) 
		{ 
			a=b; // resetea la variuable "a" para que empiece desde el valor indicado como parametro en yield
			c++; // suma un reset mas a la cantidad total hasta ahora
		} 
		b=yield a+','+c; // retorna el valor de "a" concatenado con "c" y en el siguiente next()recibe un valor para "b"
		a++; 
	} 
	return 'yield terminados. Esto es el return.';
} 

var secuencia = gen();

console.log(secuencia.next()); // Object { value="0,0",  done=false}
console.log(secuencia.next()); // Object { value="1,0",  done=false}
console.log(secuencia.next()); // Object { value="2,0",  done=false}
console.log(secuencia.next(10)); // Object { value="10,1",  done=false} 
console.log(secuencia.next()); // Object { value="11,1",  done=false}
console.log(secuencia.next()); // Object { value="12,1",  done=false}
console.log(secuencia.next(5)); // Object { value="5,2",  done=false} 
console.log(secuencia.next()); // Object { value="6,2",  done=false}
console.log(secuencia.next(19)); // Object { value="19,3",  done=false} 
console.log(secuencia.next()); // Object { value="20,3",  done=false}
console.log(secuencia.next()); // Object { value="yield terminados. Esto es el return.",  done=true}
*/


function *crearGenerador() {
    let primero = yield 1;
    let segundo = yield primero + 2;       // 4 + 2
    yield segundo + 3;                   // 5 + 3
}

let generador = crearGenerador();

console.log(generador.next());           // "{ value: 1, done: false }"
console.log(generador.next(4));          // "{ value: 6, done: false }"
console.log(generador.next(5));          // "{ value: 8, done: false }"
console.log(generador.next());           // "{ value: undefined, done: true }"+

var BufferClass = function(){
	
	console.log(this.x)
}

BufferClass.prototype.x = 2;


/*var h = new BufferClass();
console.log(h.x);
*/

var objLecturaLog = {};
var objLecturaLogPersistente = {};
var wk;
function fnMaster(msg){
	 // console.log(msg);
    //console.log(process.pid);
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
        case 'enviarMkdt':
          console.log("*********--enviarMkdt--***********");
          //console.log(this.socket);
          //this.socket.emit('fnAdd', msg.data);
          io.sockets.emit('fnAdd', msg.data);
        break;
        default:
            this.send('MASTER: Listo el proceso {' + process.pid + '}');	
        break;
    }
	
}



/**********CARGAR DATA TOMADOR********************************************************************************************************/


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
    //exec: 'tendencias.1.js',
    //exec: 'archivosConsolidados.js',
	  //exec: 'lecturaMarketData.js',
	  args: [],
	  silent: false
  });
    /*const wk = cluster.fork();
    //objLecturaLog[wk.process.pid] = wk;
    console.log(wk.process.pid);
	wk.on('message', fnMaster);//106933421
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


app.get('/chart', function(req, res) {  
  res.status(200).send("Hello!");
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
      wk.socket = this;
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