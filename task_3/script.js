let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
const cells = document.querySelectorAll('.cell');
const gameOverMessage = document.querySelector('.game-over');

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
  const cell = event.target;
  const index = Array.from(cells).indexOf(cell);
  if (!gameOver && gameBoard[index] === '') {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    switchPlayer();
    checkForWin();
  }
}

function switchPlayer() {
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
  cells.forEach(cell => {
    cell.classList.remove('cell--x', 'cell--o');
    if (cell.textContent === 'X') {
      cell.classList.add('cell--x');
    } else if (cell.textContent === 'O') {
      cell.classList.add('cell--o');
    }
  });
}

function checkForWin() {
  // Check rows
  for (let i = 0; i <= 6; i += 3) {
    if (gameBoard[i] && gameBoard[i] === gameBoard[i+1] && gameBoard[i] === gameBoard[i+2]) {
      announceWinner(gameBoard[i]);
      break;
    }
  }

  // Check columns
  for (let i = 0; i <= 2; i++) {
    if (gameBoard[i] && gameBoard[i] === gameBoard[i+3] && gameBoard[i] === gameBoard[i+6]) {
      announceWinner(gameBoard[i]);
      break;
    }
  }

  // Check diagonals
  if (gameBoard[0] && gameBoard[0] === gameBoard[4] && gameBoard[0] === gameBoard[8]) {
    announceWinner(gameBoard[0]);
  }
  if (gameBoard[2] && gameBoard[2] === gameBoard[4] && gameBoard[2] === gameBoard[6]) {
    announceWinner(gameBoard[2]);
  }
}

function announceWinner(winner) {
  gameOver = true;
  gameOverMessage.textContent = `Player ${winner} wins!`;
  gameOverMessage.style.display = 'block';
}