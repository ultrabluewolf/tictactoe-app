import logger from './logger';

import {
  Element,
  getPage,
  setClasses,
  addClasses,
  removeClass,
  addChildrenToElement,
  HIDE_CLASS,
} from './dom-utils';

//
const GAME_OVER_ID = 'game-over-banner';
const RESET_BTN_CLASS = 'reset-btn';
const COL_GRID_3 = 'three-column-grid';
const GRID_ITEM_CLASS = 'grid-item';

const toTileId = (x, y) => `tile-${x}-${y}`;
const toTileRowId = (x) => `tile-row-${x}`;

// --

// game over functions

const GameOverBanner = () => {
  return Element('div', {
    id: GAME_OVER_ID,
    className: [GRID_ITEM_CLASS, HIDE_CLASS],
    innerHTML: 'GAME OVER!',
  });
};

const getGameOverBanner = () => {
  return document.getElementById(GAME_OVER_ID) || GameOverBanner();
};

// reset functions

const getResetButton = () => {
  return document.getElementById(RESET_BTN_CLASS) || ResetButton();
};

const ResetButton = (board) => {
  const buttonElm = Element('button', {
    id: RESET_BTN_CLASS,
    className: [RESET_BTN_CLASS, GRID_ITEM_CLASS, HIDE_CLASS],
    innerHTML: 'reset',
  });

  buttonElm.onclick = () => {
    logger.debug('reset clicked');

    board.reset();
    updateBoard(board);

    const banner = getGameOverBanner();
    addClasses(banner, HIDE_CLASS);
    addClasses(buttonElm, HIDE_CLASS);
  };

  return buttonElm;
};

// tile functions

const TileLink = (board, sym, x, y) => {
  const link = Element('a', {
    href: '#',
    innerHTML: sym || '-',
  });

  link.onclick = () => {
    logger.debug('tile clicked', x, y);

    board.move(x, y);
    updateBoard(board);
    removeClass(getResetButton(), HIDE_CLASS);

    if (board.isFilled()) {
      logger.debug('showing game over text');
      removeClass(getGameOverBanner(), HIDE_CLASS);
    }
  };

  return link;
};

const updateTileLink = (sym, x, y) => {
  const link = document
    .getElementById(toTileId(x, y))
    .getElementsByTagName('a')[0];

  link.innerHTML = sym || '-';
};

const Tile = (board, sym, x, y) => {
  const tileElm = Element('div', {
    id: toTileId(x, y),
    className: ['tile', GRID_ITEM_CLASS],
  });

  const link = TileLink(board, sym, x, y);
  tileElm.appendChild(link);

  return tileElm;
};

const TileRow = (x) => {
  const tileRowElm = Element('div', {
    id: toTileRowId(x),
  });
  setClasses(tileRowElm, 'tile-row', COL_GRID_3);
  return tileRowElm;
};

// board functions

const updateBoard = (board) => {
  board.forEach((x) => {
    return (sym, y) => {
      updateTileLink(sym, x, y);
    };
  });
};

const Board = (board) => {
  const boardElm = Element('div', {
    id: 'board',
  });

  board.forEach((x) => {
    const tileRowElm = TileRow(x);
    boardElm.appendChild(tileRowElm);
    return (sym, y) => {
      const tileElm = Tile(board, sym, x, y);
      tileRowElm.appendChild(tileElm);
    };
  });

  return boardElm;
};

const initializeBoard = (board) => {
  const pageElm = getPage();
  const boardElm = Board(board);

  const bottomElm = Element('div', {
    className: ['bottom-pane', COL_GRID_3],
  });

  addChildrenToElement(bottomElm, [
    ResetButton(board),
    getGameOverBanner(),
  ]);

  addChildrenToElement(pageElm, [
    boardElm,
    bottomElm,
  ]);
};

export {
  Board,
  initializeBoard,
};
