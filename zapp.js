document.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.box');
  const statusText = document.getElementById('status');
  const resetBtn = document.getElementById('reset-btn');

  let currentPlayer = 'X';
  let gameActive = true;

  const winningPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  function checkWinner() {
    for (let [a, b, c] of winningPatterns) {
      if (
        boxes[a].textContent &&
        boxes[a].textContent === boxes[b].textContent &&
        boxes[a].textContent === boxes[c].textContent
      ) {
        // Highlight winning boxes
        boxes[a].classList.add('win');
        boxes[b].classList.add('win');
        boxes[c].classList.add('win');
        return boxes[a].textContent;
      }
    }
    return null;
  }

  function handleClick(e) {
    const box = e.target;
    if (!gameActive || box.textContent !== '') return;

    box.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
      gameActive = false;
      statusText.textContent =
        winner === 'X' ? '🎉 Player 1 (X) wins!' : '🎉 Player 2 (O) wins!';
      return;
    }

    if ([...boxes].every(b => b.textContent !== '')) {
      gameActive = false;
      statusText.textContent = "It's a draw!";
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent =
      currentPlayer === 'X' ? "Player 1's turn (X)" : "Player 2's turn (O)";
  }

  boxes.forEach(box => box.addEventListener('click', handleClick));

  resetBtn.addEventListener('click', () => {
    boxes.forEach(b => {
      b.textContent = '';
      b.classList.remove('win'); // remove highlight on reset
    });
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = "Player 1's turn (X)";
  });
});