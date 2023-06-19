const buttons = document.getElementsByClassName("button");
const announcement = document.getElementById("announcement");
let gameEnded = false;

const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8]];
const x = [];
const o = [];

function makeMove(index) {
    if (gameEnded === false) {
        if (buttons[index].innerHTML === "") {
            buttons[index].innerHTML = "X";
            x.push(index);
    
            checkIfHumanWon();
            computerMove();
        }
    }
}

function computerMove() {
    let player = o;
    let moveWasMade = false;

    let move = getWinningMove(player);

    if (gameEnded === false) {
        if (move != -1) {
            makeComputerMove(move);
            moveWasMade = true;
            announcement.innerHTML = "Computer won";
            announcement.style.color = "red";
            gameEnded = true;
        } else if (move === -1) {
            player = x;
            move = getWinningMove(player)
    
            if (move != -1) {
                makeComputerMove(move);
                moveWasMade = true;
            }
        }
    
        if (moveWasMade === false) {
            getRandomMove();
        }    
    }
}

function checkIfHumanWon() {
    for (let i = 0; i < winningCombinations.length; i++) {
        let match = 0;
        for (let j = 0; j < winningCombinations[i].length; j++) {
            if (x.includes(winningCombinations[i][j])) {
                match++;

                if (match === 3) {
                    announcement.innerHTML = "You won";
                    announcement.style.color = "green";
                    gameEnded = true;
                }
            }
        }
    }

}

function getWinningMove(player) {
    let winningMove = -1;
    let winningCombination = [];
    
    for (let i = 0; i < winningCombinations.length; i++) {
        let match = 0;
        for (let j = 0; j < winningCombinations[i].length; j++) {
            if (player.includes(winningCombinations[i][j])) {
                match++;

                if (match === 2) {
                    winningCombination.push(winningCombinations[i]);
                }
            }
        }
    }

    if (winningCombination.length > 0) {
        for (let i = 0; i < winningCombination.length; i++) {
            for (let j = 0; j < winningCombination[i].length; j++) {
                if (buttons[winningCombination[i][j]].innerHTML === "") {
                    winningMove = winningCombination[i][j];
                }
            }
        }
    }
    return winningMove;
}

function getRandomMove() {
    let emptyButtons = [];
    
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].innerHTML === "") {
            emptyButtons.push(i);
        }
    }

    if (emptyButtons.length > 0) {
        const rnd = Math.floor(Math.random() * emptyButtons.length);
        const index = emptyButtons[rnd];
        makeComputerMove(index);
    }
}

function makeComputerMove(index) {
    const button = buttons[index];
    button.innerHTML = "O";
    button.style.color = "blue";
    o.push(index);
}