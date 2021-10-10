const server = require('http').createServer()
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
server.listen(server_port, function (err) {
  if (err) throw err
  console.log('Listening on port %d', server_port);
});