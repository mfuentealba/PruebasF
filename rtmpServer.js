const RtmpServer = require('rtmp-server');
const rtmpServer = new RtmpServer();
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

rtmpServer.on('error', err => {
  throw err;
});

rtmpServer.on('client', client => {
  //client.on('command', command => {
  //  console.log(command.cmd, command);
  //});

  client.on('connect', () => {
     console.log('connect', client.app);
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
  
  ee.on('newOrderSingle', (data) => {
    console.log('client disconnected');
  });
});

rtmpServer.listen(1935);