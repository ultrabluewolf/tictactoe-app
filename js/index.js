require('../styles/index.scss');

import { createBoard } from './board';
import { initializeBoard } from './board.component';
import logger from './logger';

const board = createBoard();

initializeBoard(board);
