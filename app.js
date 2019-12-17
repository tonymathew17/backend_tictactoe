const express = require("express");
const app = express();
const server = require('http').createServer(app);
const socket = require('socket.io');
const helper = require('./helper');

// API to check health of the server
app.get('/healthCheck', function (req, res) {
    res.send('Connected!');
})

var io = socket(server);
io.on('connection', function (socket) {
    console.log('Socket connection established!');

    socket.on('tileClicked', (tileClicked) => {
        let square = helper.savePlayerMove(tileClicked);
        let computerMove = helper.getComputerMove();
        console.log('Computer Move>>>>>>>>>>>..', computerMove);
        socket.emit('messageFromServer', computerMove);
    });
});

// Running server on port 3000
server.listen(3333, () => {
    console.log('App Running at 3000!');
})