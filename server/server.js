/*jshint esversion: 6*/

const net = require('net');
let clients =[];

const server = net.createServer((c) => {
  clients.push(c);
  c.on('data', ( data ) => {
    for(var i = 0; i < clients.length; i++){
      console.log(c);
      console.log(clients);
      clients[i].write(data);
    }
  });
});
server.listen(6969, () => {
  console.log('server');
});


