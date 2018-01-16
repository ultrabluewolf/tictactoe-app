import logger from './logger';

// TTT tokens
const X = 'x';
const O = 'o';

// initialize 2d arr with nxn dims
const create = (n=3) => {
  return [...new Array(n)]
    .map(() => [...new Array(n)].map(() => null));
};

// initialize board
const createBoard = (n=3) => {
  let board = create(n);
  let currPlayer = X;
  let emptyCount = n*n;

  const forEach = (fn) => {
    board.map((row, x) => row.map(fn(x)));
  };

  // move helper
  const moveAsX = (x, y) => {
    board[x][y] = X;
    currPlayer = O;
  };

  // move helper
  const moveAsO = (x, y) => {
    board[x][y] = O;
    currPlayer = X;
  };

  // place relevant token on board
  const move = (x, y) => {
    if (isPositionSet(x, y)) {
      logger.warn('position already filled', x, y, board[x][y]);
      return;
    }

    if (currPlayer === X) {
      moveAsX(x, y);
    } else {
      moveAsO(x, y)
    }
    emptyCount -= 1;
  };

  // clear state of board
  const reset = () => {
    currPlayer = X;
    emptyCount = n*n;
    board = create(n);
  };

  // check if board has no more empty spaces
  const isFilled = () => {
    return emptyCount <= 0;
  };

  const getCurrentPlayer = () => currPlayer;

  // check if given coord is has a valid token
  const isPositionSet = (x, y) => board[x][y] !== null;

  const toJSON = (isPretty = false) => {
    return JSON.stringify(board, null, isPretty ? 2 : 0);
  };

  // expose board functions
  return {
    move,
    reset,
    isFilled,
    forEach,
    getCurrentPlayer,
    isPositionSet,
    toJSON,
  };
};

export {
  createBoard,
};
