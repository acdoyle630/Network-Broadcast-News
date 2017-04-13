/*jshint esversion: 6*/

const net = require('net');
let clients =[];

const server = net.createServer((c) => {
  c.on('data', ( data ) => {
    clients.push(c);
    if(clients.length > 1){
    for(var i = 0; i < clients.length; i++){
      console.log(clients.length);
      clients[i].write(data);
    }
    }
  });
});
server.listen(6969, () => {
  console.log('server');
});


