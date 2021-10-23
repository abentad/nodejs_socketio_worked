const server = require('http').createServer()
const mongoose = require('mongoose');
const io = require('socket.io')(server)

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
const mongooseUrl = "mongodb+srv://abeni:19875321ab@liyucluster.dqtyi.mongodb.net/auth?retryWrites=true&w=majority";
mongoose.connect(mongooseUrl).then(()=> server.listen(server_port, (err) =>{
  if(err) throw err;
  console.log('connected to mongoDb');
  console.log(`listening on port ${server_port}`);
})).catch((e)=> console.log(e));

