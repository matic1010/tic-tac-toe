const Player = function (sign) {
  let _sign = sign;

  const getSign = () => _sign;
  const setSign = (sign) => (_sign = sign);

  return { getSign, setSign };
};

const gameBoard = (() => {
  let _board = new Array(9);

  const getField = (index) => _board[index];
  const setField = (index, player) => {
    _board[index] = player.getSign();
  };

  return {
    getField,
    setField,
  };
})();

const gameController = (() => {
  const playerX = Player('X');
  const playerO = Player('O');
  let _currentPlayer = playerX;

  const getCurrentPlayer = () => _currentPlayer;
  const changeCurrentPlayer = () => {
    if (_currentPlayer === playerX) {
      _currentPlayer = playerO;
    } else {
      _currentPlayer = playerX;
    }
  };

  const makeMove = (index) => {
    gameBoard.setField(index, _currentPlayer);
    if (checkForWin()) {
      console.log(_currentPlayer.getSign() + ' wins');
    } else if (checkForTie()) console.log("It's a draw!");
    changeCurrentPlayer();
  };

  const checkForWin = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let result = false;

    winningCombinations.forEach((combination) => {
      if (gameBoard.getField(combination[0])) {
        if (
          gameBoard.getField(combination[0]) ===
            gameBoard.getField(combination[1]) &&
          gameBoard.getField(combination[0]) ===
            gameBoard.getField(combination[2])
        ) {
          result = true;
        }
      }
    });

    return result;
  };

  const checkForTie = () => {
    for (let i = 0; i < 9; i++) {
      if (!gameBoard.getField(i)) return false;
    }
    return true;
  };

  return { makeMove, checkForWin };
})();

const displayController = (() => {
  let cells = document.querySelectorAll('.cell');

  cells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      gameController.makeMove(index);
      _updateBoard();
    });
  });

  const _updateBoard = () => {
    for (let i = 0; i < cells.length; i++) {
      cells[i].textContent = gameBoard.getField(i);
    }
  };
})();
