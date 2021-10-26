const mongoose = require('mongoose');
const express = require('express');
const app = express();
const server = require('http').createServer(app);

//socket io
const io = require('socket.io')(server, { cors: { origin: "*" } });

//app routes
const conversationRoute = require('./routes/conversations_route');
const messageRoute = require('./routes/messages_route');
const userRoute = require('./routes/users_route');

//app middlewares
app.use(express.json());
app.use('/api/conversation', conversationRoute);
app.use('/api/message', messageRoute);
app.use('/api/user', userRoute);


//socket connections 
io.on('connection', socket => {
  console.log('client connect...', socket.id);

  //for sending message to all users
  socket.on('send-message', (message) => {
    io.emit('receive-message', message);  
  });
  
  //for joining a room
  socket.on('join-room', (roomName)=> {
    socket.join(roomName);
    console.log(`${socket.id} joined ${roomName}`);
  });

  //for sending message to who are inside the given room users
  socket.on('send-message-to-room', (data) => {
    console.log(data['roomName']);
    console.log(data['message']);
    socket.to(data['roomName']).emit('receive-message-from-room', data['message']);
  });

  //for when user disconnects
  socket.on('disconnect', () => {
    console.log('client disconnect...', socket.id);
  });

  //for when error occurs
  socket.on('error', (err) => { 
    console.log('received error from client:', socket.id);
    console.log(err);
  });
})


//server startup and mongodb connection
var server_port = process.env.PORT || 3000;
const mongooseUrl = "mongodb+srv://abeni:19875321ab@liyucluster.dqtyi.mongodb.net/abchat?retryWrites=true&w=majority";
mongoose.connect(mongooseUrl).then(()=> server.listen(server_port, () =>{
  console.log('connected to mongoDb');
  console.log(`listening on port ${server_port}`);
})).catch((e)=> console.log(e));



