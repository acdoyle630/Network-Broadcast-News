/*jshint esversion: 6*/

const net = require('net');

const client = net.connect({port:6969}, () => {
  process.stdin.on('data', ( data ) => {
    client.write(data);
  });

    client.on('data', (data) => {
    console.log(data.toString());
  });
});

