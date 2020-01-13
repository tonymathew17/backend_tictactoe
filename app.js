const express = require("express");
const app = express();
const server = require('http').createServer(app);
const socket = require('socket.io');
const helper = require('./helper');
const cors = require('cors');

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
    let boardSize = Number(req.params.boardSize);
    console.log('Setting up game with boardSize: ', boardSize);
    let result = helper.setupGame(boardSize);
    res.send(result);
});

var io = socket(server);
io.on('connection', function (socket) {
    console.log('Socket connection established!');

    socket.on('tileClicked', function (cellClicked) {
        console.log('User clicked tile ', cellClicked);
        let resHum = helper.savePlayerMove(helper.human, cellClicked);
        if (resHum && resHum.message) {
            socket.emit('messageFromServer', resHum);
            return;
        }
        let winResultHum = helper.checkWinner(helper.human);
        if (winResultHum) {
            socket.emit('messageFromServer', winResultHum);
            return;
        }

        let computerMove = helper.getComputerMove();
        console.log('Computer clicked tile ', computerMove);
        let resComp = helper.savePlayerMove(helper.computer, computerMove);
        if (resComp && resComp.message) {
            socket.emit('messageFromServer', resComp);
            return;
        }
        let winResultComp = helper.checkWinner(helper.computer);
        if (winResultComp) {
            winResultComp.computerMove = computerMove;
            socket.emit('messageFromServer', winResultComp);
            return;
        }
        socket.emit('messageFromServer', {
            computerMove: computerMove
        });

    });
});

// Running server on port 3333
server.listen(3333, () => {
    console.log('App Running at 3333!');
})