const gameBoard = (function () {
  const _board = new Array(9).fill(null);
  const getField = (n) => _board[n];
  const setField = (n, player) => _board[n] = player.getSign();

  return { getField, setField }
})();

const Player = function (sign) {
  let _sign = sign;
  const getSign = () => _sign;

  return { getSign }
}

const gameController = (function() {
  const _player1 = Player('X');
  const _player2 = Player("O");
  let _activePlayer = _player1;

  const _toggleActivePlayer = () => {
    _activePlayer = _activePlayer === _player1 ? _player2 : _player1;
  };

  const makeMove = (n) => {
    const field = gameBoard.getField(n);
    if(field === null) {
      gameBoard.setField(n, _activePlayer);
      if(checkForWin(gameBoard)) {
        console.log(`${_activePlayer.getSign()} wins!`)
      } else if (checkForDraw(gameBoard)) {
        console.log("It's a draw!")
      }
      _toggleActivePlayer();
      displayController.renderBoard(gameBoard);
    } else {
      console.log("field already taken")
    }
  }

  const checkForWin = (board) => {
    return (_checkColumns(board) || _checkRows(board) || _checkDiagonals(board));
  }

  const checkForDraw = (board) => {
    if (!checkForWin(board)) {
      for (let i = 0; i < 9; i++) {
        const field = board.getField(i);
        if(!field) return false;
      }
      return true;
    }
    return false;
  }

  const _checkColumns = (board) => {
    for (let i = 0; i < 3; i++) {
      let col = [];
      for (let j = 0; j < 3; j++) {
        col.push(board.getField(i + 3 * j))
      }

      if (col.every(field => field === "X") || col.every(field => field === "O")) {
        return true;
      }
    }
    return false;
  }

  const _checkRows = (board) => {
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = i * 3; j < i * 3 + 3; j++) {
        row.push(board.getField(j))
      }

      if (row.every(field => field === "X") || row.every(field => field === "O")) {
        return true;
      }
    }

    return false;
  }
  
  const _checkDiagonals = (board) => {
    const diagonal1 = [board.getField(0), board.getField(4), board.getField(8)];
    const diagonal2 = [board.getField(2), board.getField(4), board.getField(6)];

    if (diagonal1.every(field => field == 'X') || diagonal1.every(field => field == 'O')) {
      return true;
    }
    
    if (diagonal2.every(field => field == 'X') || diagonal2.every(field => field == 'O')) {
      return true;
    }

    return false;
  }

  return { makeMove, checkForWin };
})();

const displayController = (function () {
  const renderBoard = (board) => {
    const htmlBoard = document.getElementById("board");

    htmlBoard.innerHTML = "";

    for (let i = 0; i < 9; i++) {
      const htmlField = document.createElement("div");
      htmlField.classList.add("field");

      if (i === 2 || i === 5 || i === 8) {
        htmlField.classList.add("no-r");
      }

      if (i === 0 || i === 3 || i === 6) {
        htmlField.classList.add("no-l");
      }
      if (i <= 2) {
        htmlField.classList.add("no-t");
      }
      if (i >= 6) {
        htmlField.classList.add("no-b");
      }

      if(board.getField(i)) {
        htmlField.textContent = board.getField(i);
      } else {
        htmlField.addEventListener("click", () => gameController.makeMove(i))
      }

      htmlBoard.appendChild(htmlField);
    }
  }

  return { renderBoard }
})();

displayController.renderBoard(gameBoard);