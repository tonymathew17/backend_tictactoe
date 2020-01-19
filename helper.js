let availableCells = [];
let humanMoves = [];
let computerMoves = [];
let winningCombinations = [];
let row = [];
const human = 'human';
const computer = 'computer';
let boardSize;
let scoreMapping = {
    human: -10,
    computer: 10,
    tie: 0
}

/**@description This function gets the computer move based on the tile user clicked */
function getComputerMove() {
    let bestScore = -Infinity;
    let optimalMove;
    for (let i = 0; i < availableCells.length; i++) {
        // Temporarily updating availableCells and computerMoves
        let move = availableCells[i];
        availableCells.splice(i, 1);
        computerMoves.push(move);

        // Calling minimax method to get optimal move
        let score = minimax(computer, availableCells, 0, false);

        // Resetting availableCells and computerMoves to original state
        availableCells.splice(i, 0, move);
        computerMoves.splice(computerMoves.indexOf(move), 1);

        if (score > bestScore) {
            bestScore = score;
            optimalMove = move;
        }
    }
    return optimalMove;
}

/**@description minimax method returns the best score corresponding to current state of the game
 * @param player - The player in context
 * @param availableCells - Array containing available cells
 * @param depth - The current depth of the minimax tree
 * @param isMaximizing - Variable saying if the current player in context is trying to maximize or minimize the score
*/
function minimax(player, availableCells, depth, isMaximizing) {
    let result = checkWinner(player);
    if (result !== null && result !== undefined) {
        return scoreMapping[result.winner];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < availableCells.length; i++) {
            // Temporarily updating availableCells and computerMoves
            let move = availableCells[i];
            availableCells.splice(i, 1);
            computerMoves.push(move);

            // Calling minimax method to get optimal move
            let score = minimax(computer, availableCells, depth + 1, false);

            // Resetting availableCells and computerMoves to original state
            availableCells.splice(i, 0, move);
            computerMoves.splice(computerMoves.indexOf(move), 1);

            bestScore = Math.max(score, bestScore);
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < availableCells.length; i++) {
            // Temporarily updating availableCells and humanMoves
            let move = availableCells[i];
            availableCells.splice(i, 1);
            humanMoves.push(move);

            // Calling minimax method to get optimal move
            let score = minimax(human, availableCells, depth + 1, true);

            // Resetting availableCells and humanMoves to original state
            availableCells.splice(i, 0, move);
            humanMoves.splice(humanMoves.indexOf(move), 1);

            bestScore = Math.min(score, bestScore);
        }
        return bestScore;
    }
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