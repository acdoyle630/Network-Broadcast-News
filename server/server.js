/*jshint esversion: 6*/

const net = require('net');
let clients =[];
let users = 1;

const server = net.createServer((c) => {
  clients.push(c);
  server.userName = '{ADMIN}';
  c.on('data', ( data ) => {
  process.stdin.on('data', ( data ) => {
    for(var i = 0; i< clients.length; i++){
      clients[i].write(server.userName + data);
    }
  });
  if(c.userName === undefined){
    if(checkForUN(data) !== true){
    c.write(server.userName + ' : Please select user name by typing UN: followed by your username');
   } else {
    c.userName = assignUN(data);
   }
  }
    if(c.userName !== undefined){
      for(var i = 0; i < clients.length; i++){
        if(c.userName !== clients[i].userName){
        clients[i].write('{' + c.userName + '}' + ': ' + data);
       } else {
        clients[i].write('Me: ' + data );
       }
      }
    }
  });
});
server.listen(6969, () => {
});

const  checkForUN = ( data ) => {
  let user = data.toString().split('');
    if( user[0] === 'U' && user[1]=== 'N' && user[2] === ':'){
      return true;
  }
};

const  assignUN = ( data ) => {
  let user = data.toString().split('');
  user.pop();
  user.shift();
  user.shift();
  user.shift();
  return user.join('');
};


