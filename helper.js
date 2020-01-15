let availableCells = [];
let humanMoves = [];
let computerMoves = [];
let winningCombinations = [];
let row = [];
const human = 'human';
const computer = 'computer';
let boardSize;


/**@description This function gets the computer move based on the tile user clicked */
function getComputerMove() {
    return availableCells[Math.floor(Math.random() * availableCells.length)]
}

/**@description This function setups the game. Initializes variables, generates availableCells and winningCombinations
 * @param size - Board size
*/
function setupGame(size) {
    boardSize = size;
    humanMoves = [];
    computerMoves = [];
    availableCells = [];
    winningCombinations = [];
    row = [];

    // Populating available cells
    for (let i = 0; i < boardSize * boardSize; i++) {
        availableCells.push(i);
    }

    // Generating Winning combinations
    // Generating horizontal winning combinations
    let cellDuplicate = availableCells.slice();
    for (let i = 0; i < boardSize; i++) {
        let a = cellDuplicate.splice(boardSize);
        winningCombinations.push(cellDuplicate);
        cellDuplicate = a.slice();
    }

    // Generating Vertical winning combinations
    for (let j = 0; j < boardSize; j++) {
        row = [];
        for (let i = j; row.length < boardSize; i = i + boardSize) {
            row.push(i);
        }
        winningCombinations.push(row);
    }

    // Generating diagonal winning combinations
    row = [];
    for (let i = 0; row.length < boardSize; i = i + (boardSize + 1)) {
        row.push(i);
    }
    winningCombinations.push(row);

    row = [];
    for (let i = (boardSize - 1); row.length < boardSize; i = i + (boardSize - 1)) {
        row.push(i);
    }
    winningCombinations.push(row);

    if (availableCells.length != 0 && winningCombinations.length != 0) {
        return availableCells;
    }
    else {
        return {
            error: 'failure'
        }
    }
}

/**@description This function saves the player move. Updates availableCells array by removing the clicked cell by user,
 * pushing the clicked cell to either humanMoves/computerMoves depending on who made the move
 * @param player - The player in context which made the move
 * @param cellClicked - The cell clicked by the player in context
*/
function savePlayerMove(player, cellClicked) {
    if (!(availableCells.includes(cellClicked)) || cellClicked == undefined || cellClicked == null) {
        return RangeError('Player selected invalid cell!');
    }

    if (player == human) {
        humanMoves.push(cellClicked);
        availableCells.splice(availableCells.indexOf(cellClicked), 1);
    } else if (player == computer) {
        computerMoves.push(cellClicked);
        availableCells.splice(availableCells.indexOf(cellClicked), 1);
    }
    else {
        return Error("Invalid Player!");
    }
}

/**@description This function is used to check if the current move by any player has won them the game/tied
 * @param player - The player in context
*/
function checkWinner(player) {
    let moves = [];

    if (player === human) {
        moves = humanMoves;
    }
    else if (player === computer) {
        moves = computerMoves;
    } else {
        return {
            error: 'Invalid Player'
        }
    }

    // Finding winning combination
    if (moves.length >= boardSize) {
        let combination = winningCombinations.find(winningCombination =>
            winningCombination.every(elem =>
                moves.indexOf(elem) > -1)
        )
        if (combination) {
            return {
                winner: player,
                winningCombination: combination
            }
        }
    }

    // Check if game is tied
    if (availableCells.length == 0) {
        return {
            winner: 'tie',
            winningCombination: []
        }
    }
}

module.exports = {
    human,
    computer,
    setupGame,
    getComputerMove,
    savePlayerMove,
    checkWinner
}