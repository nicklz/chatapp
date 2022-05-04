const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");

const port = process.env.PORT || 8080;
const clientPort = process.env.CLIENT_PORT || 80;
const client = `http://localhost:${clientPort}`;

const app = express();

var corsOptions = {
  origin: client
};

app.use(cors(corsOptions));

const server = http.createServer(app);

const io = socketIo(server, { cors: { origin: client } });

io.on("connection", (socket) => {
  console.log('A Connection has been made')

  socket.on('message', message => {
    socket.broadcast.emit('message', message)
  })

  socket.on('disconnect', () => {
    console.log('A disconnection has been made')
  })
});

server.listen(port, () => console.log(`Listening on port ${port}`));
