const cluster = require('cluster');
const numCPUs = require('os').cpus().length;



function fnMaster(msg){
	/*console.log(msg);
	console.log(process.pid);*/
	if(msg.cmd == 'fix'){
		
	} else {
		this.send('Listo el proceso ' + process.pid);	
	}
	
	
	
}

if (cluster.isMaster) {
	console.log(`Master ${process.pid} is running`);
  
	cluster.setupMaster({
	  exec: 'lecturaLog.js',
	  args: [],
	  silent: false
	});
  
	const wk = cluster.fork();
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

	
	
	