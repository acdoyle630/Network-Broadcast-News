/*jshint esversion: 6*/

const net = require('net');

let clients =[];

let users = 1;

  //Allow admin to send messages
process.stdin.on('data', ( data ) => {
  for(var i = 0; i< clients.length; i++){
    clients[i].write(server.userName + data);
  }
});
  //create server
const server = net.createServer((c) => {
  clients.push(c);
  server.userName = '{ADMIN}';
  //create Connections
  c.on('data', ( data ) => {
    //If user does not have username promp them to create one
  if(c.userName === undefined){
    if(checkForUN(data) !== true){
    c.write(server.userName + ' : Please select user name by typing UN: followed by your username');
   } else {
    if(userNameLegal(data) === true){
    c.userName = assignUN(data);
     } else {
      c.write(server.userName + ' : Username alreay in use');
     }
    }
  }

  //if user has UserName, allow to send messages to all connected users
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
  let newUserName = user.join('');
  /*for(var i = 0; i < clients.length; i++){
    console.log('client i username' +clients[i].userName);
    if(newUserName === clients[i].userName){
      console.log('cannot');
      } else*/{
      return newUserName;
    }

};

const userNameLegal = ( data ) =>{
    let nameCheck = data.toString().split('');
    let newNameCheck;
    nameCheck.pop();
    nameCheck.shift();
    nameCheck.shift();
    nameCheck.shift();
    newNameCheck = nameCheck.join('');
    console.log(newNameCheck);
  for(var i = 0; i < clients.length; i++){
    console.log('Client Name ' + clients[i].userName);
    if (newNameCheck === clients[i].userName){
      console.log('nope');
      return false;
      }
   }
    console.log('new name passed');
    return true;
};


