let userClickedTiles = [];
let computerClickedTiles = [];
let clickedTiles = [];
let possibleClicks = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
    let tile = Math.floor(Math.random() * 9) + 1;

    while (userClickedTiles.includes(tile) || computerClickedTiles.includes(tile) &&
        ((Array.from(new Set(clickedTiles)).length != 9) && (!possibleClicks.every(elem => clickedTiles.includes(elem))))) {
        tile = Math.floor(Math.random() * 9) + 1;
        console.log('Inside whiel loop');
    }
    computerClickedTiles.push(tile);
    clickedTiles.push(tile);
    return tile;
}

module.exports = {
    savePlayerMove,
    getComputerMove,
    userClickedTiles,
    computerClickedTiles
}