const mongoose = require('mongoose');
const express = require('express');
const app = express();
const server = require('http').createServer(app);


const io = require('socket.io')(server, { cors: { origin: "*" } });

const conversationRoute = require('./routes/conversations_route');
const messageRoute = require('./routes/messages_route');
const userRoute = require('./routes/users_route');

app.use(express.json());
app.use('/api/conversation', conversationRoute);
app.use('/api/message', messageRoute);
app.use('/api/user', userRoute);



io.on('connection', socket => {
  console.log('client connect...', socket.id);
  //for sending message
  socket.on('send-message', (message) => {
    io.emit('receive-message', message);  
  })
  //for when user disconnects
  socket.on('disconnect', () => {
    console.log('client disconnect...', socket.id)
  })
  //for when error occurs
  socket.on('error', (err) => { 
    console.log('received error from client:', socket.id)
    console.log(err)
  })
})

var server_port = process.env.PORT || 3000;
const mongooseUrl = "mongodb+srv://abeni:19875321ab@liyucluster.dqtyi.mongodb.net/abchat?retryWrites=true&w=majority";
mongoose.connect(mongooseUrl).then(()=> server.listen(server_port, () =>{
  console.log('connected to mongoDb');
  console.log(`listening on port ${server_port}`);
})).catch((e)=> console.log(e));

