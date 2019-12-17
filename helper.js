let userClickedTiles = [];
let computerClickedTiles = [];

/**@description This function saves the tile clicked by user */
function savePlayerMove(tileClicked) {
    try {
        if (userClickedTiles.includes(tileClicked)) {
            throw "This tile has already been clicked!"
        }
        else {
            userClickedTiles.push(tileClicked);
            console.log('userClickedTiles: ', userClickedTiles);
            return (tileClicked * tileClicked);
        }

    } catch (error) {
        return error;
    }
}

/**@description This function gets the computer move based on the tile user clicked */
function getComputerMove() {
    let tile = Math.floor(Math.random() * 9) + 1;
    while (userClickedTiles.includes(tile) || computerClickedTiles.includes(tile)) {
        tile = Math.floor(Math.random() * 9) + 1;;
    }
    computerClickedTiles.push(tile);
    return tile;
}

module.exports = {
    savePlayerMove,
    getComputerMove
}