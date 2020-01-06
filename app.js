const express = require("express");
const app = express();
const server = require('http').createServer(app);
const socket = require('socket.io');
const helper = require('./helper');
const cors=require('cors');

app.use(cors());

// API to check health of the server
app.get('/healthCheck', function (req, res) {
    res.send('Connected!');
});

app.post('/refreshBoard', function (req, res) {
    console.log('Refreshing...');
    helper.userClickedTiles.length = 0;
    helper.computerClickedTiles.length = 0;
    console.log('Refreshed!');
    res.status(200).send('Memory cleared!');
});

app.post('/setupGame/:boardSize', function (req, res) {
    let boardSize = req.params.boardSize;
    console.log('boardSize: ', boardSize);
    helper.setupGame(boardSize);
});

var io = socket(server);
io.on('connection', function (socket) {
    console.log('Socket connection established!');

    socket.on('tileClicked', function (tileClicked) {
        console.log('User clicked tile ', tileClicked);
        let res = helper.savePlayerMove(tileClicked);
        if (!Array.isArray(res)) {
            socket.emit('messageFromServer', res);
            return;
        }
        let computerMove = helper.getComputerMove();
        console.log('Computer clicked tile ', computerMove);
        socket.emit('messageFromServer', computerMove);
    });
});

// Running server on port 3333
server.listen(3333, () => {
    console.log('App Running at 3333!');
})