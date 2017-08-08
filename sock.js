var io = require("socket.io")("http://localhost:8888");

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