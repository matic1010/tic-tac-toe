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
    changeCurrentPlayer();
  };

  return { makeMove };
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
