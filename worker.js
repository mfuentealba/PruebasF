const cluster = require('cluster');

process.on('message', (msg) => {
		
	console.log(msg + ' ' + process.pid);
	
});
process.send({ cmd: process.pid });
console.log(`Worker ${process.pid} started`);
//console.log(test);