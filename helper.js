let userClickedTiles = [];
let computerClickedTiles = [];
let clickedTiles = [];
let possibleClicks = [0, 1, 2, 3, 4, 5, 6, 7, 8];

/**@description This function saves the tile clicked by user */
function savePlayerMove(tileClicked) {
    try {
        if (userClickedTiles.includes(tileClicked)) {
            throw new RangeError("This tile has already been clicked!");
        } else {
            userClickedTiles.push(tileClicked);
            clickedTiles.push(tileClicked);
            return userClickedTiles;
        }

    } catch (error) {
        return error;
    }
}

/**@description This function gets the computer move based on the tile user clicked */
function getComputerMove() {
    let tile = Math.floor(Math.random() * 9) + 0;

    while (userClickedTiles.includes(tile) || computerClickedTiles.includes(tile) &&
        ((Array.from(new Set(clickedTiles)).length != 9) && (!possibleClicks.every(elem => clickedTiles.includes(elem))))) {
        tile = Math.floor(Math.random() * 9) + 0;
        console.log('Computer selecting best move...');
    }
    computerClickedTiles.push(tile);
    clickedTiles.push(tile);
    if (clickedTiles.length == possibleClicks.length) {
        console.log('All cells are clicked!');
    }
    return tile;
}

function setupGame(boardSize) {
    let board = [];
    let availableCells = [];
    let humanMoves = [];
    let computerMoves = [];
    let cellBoardMap = {};
    let count = 0;

    // Setting up board
    for (let i = 0; i < boardSize; i++) {
        let row = [];
        for (let j = 0; j < boardSize; j++) {
            row.push('');
            availableCells.push(count);
            cellBoardMap[count] = [i, j];
            count++;
        }
        board.push(row);
    }
}

module.exports = {
    setupGame,
    savePlayerMove,
    getComputerMove,
    userClickedTiles,
    computerClickedTiles
}