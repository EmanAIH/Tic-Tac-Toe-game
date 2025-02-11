const cells = [
    document.getElementById("cell1"),
    document.getElementById("cell2"),
    document.getElementById("cell3"),
    document.getElementById("cell4"),
    document.getElementById("cell5"),
    document.getElementById("cell6"),
    document.getElementById("cell7"),
    document.getElementById("cell8"),
    document.getElementById("cell9"),
];

const status = document.getElementById("status");
const restartBtn = document.getElementById("restart");
let currentPlayer = "X";
let gameBoard = Array(9).fill(null); // Represent the game board


function handleClick(index){
    if(gameBoard[index] || checkWinner()) return;
    // Update game board and display the current player's symbol
    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add("taken");

    if(checkWinner()){
        status.textContent = `${currentPlayer} wins!`;
    } else if(!gameBoard.includes(null)){
        status.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === "X"? "O" : "X";
        status.textContent = `It is ${currentPlayer}'s turn`;
    }

    function checkWinner(){
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  //columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        return winningCombinations.some(combination =>{
            const [a, b, c] = combination;
            return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
        });
    }
}

function restartGame(){
    gameBoard.fill(null); // Reset the game board
    currentPlayer = "X";  // Reset player
    status.textContent = "It is X's turn";
    cells.forEach(cell => {
        cell.textContent = ""; // clea cells
        cell.classList.remove("taken");
    });
}


cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleClick(index),);
});

restartBtn.addEventListener("click", restartGame);
status.textContent = "Player X's Turn";