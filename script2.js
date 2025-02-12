const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (gameBoard[index] === "" && gameActive) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.add("disabled"); // Prevent further changes
        checkWinner();
        
        if (gameActive) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            statusText.textContent = `🎉 Player ${gameBoard[a]} Wins! 🎉`;
            disableBoard();
            return;
        }
    }

    if (!gameBoard.includes("")) {
        gameActive = false;
        statusText.textContent = "🤝 It's a Draw!";
    }
}

function disableBoard() {
    cells.forEach(cell => cell.removeEventListener("click", handleCellClick));
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("disabled");
        cell.addEventListener("click", handleCellClick);
    });
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
