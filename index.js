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
