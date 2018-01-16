
import { createBoard } from './board';

const assert = require('chai').assert;

describe('Board', () => {

  describe('::createBoard()', () => {

    it('should generate a board of n x n dimensions', () => {

      [1, 2, 3, 4, 5]
        .map((n) => {
          const board = createBoard(n);
          const slots = [];
          board.forEach((x) => {
            return (y) => {
              slots.push([x,y]);
            };
          });

          assert.equal(slots.length, n*n);
        });

    });

  });

  describe('#move()', () => {

    it('should set a position to current player token', () => {

      const board = createBoard(3);
      let slots = [];

      board.move(0,0); // x
      board.move(1,0); // o
      board.move(2,2); // x

      board.forEach((x) => {
        return (sym, y) => {
          slots.push([sym, x, y]);
        };
      });

      assert.equal(slots.filter((slot) => slot[0] === null).length, 6);
      assert.equal(slots.filter((slot) => slot[0] !== null).length, 3);

      assert.deepEqual(slots.find((slot) => slot[1] === 0 && slot[2] === 0), ['x', 0, 0]);
      assert.deepEqual(slots.find((slot) => slot[1] === 1 && slot[2] === 0), ['o', 1, 0]);
      assert.deepEqual(slots.find((slot) => slot[1] === 2 && slot[2] === 2), ['x', 2, 2]);

    });


    it('should set all positions to a token', () => {

      const board = createBoard(3);
      let slots = [];

      board.move(0,0); // x
      board.move(1,0); // o
      board.move(2,2); // x
      board.move(0,1); // o
      board.move(2,1); // x
      board.move(1,2); // o
      board.move(1,1); // x
      board.move(0,2); // o
      board.move(2,0); // x

      board.forEach((x) => {
        return (sym, y) => {
          slots.push([sym, x, y]);
        };
      });

      assert.equal(slots.filter((slot) => slot[0] === null).length, 0);
      assert.equal(slots.filter((slot) => slot[0] !== null).length, 9);

      assert.deepEqual(slots.find((slot) => slot[1] === 1 && slot[2] === 1), ['x', 1, 1]);
      assert.deepEqual(slots.find((slot) => slot[1] === 2 && slot[2] === 0), ['x', 2, 0]);

      assert.deepEqual(slots.find((slot) => slot[1] === 1 && slot[2] === 2), ['o', 1, 2]);
      assert.deepEqual(slots.find((slot) => slot[1] === 0 && slot[2] === 2), ['o', 0, 2]);

      assert.isOk(board.isFilled());

    });

  });

  describe('#reset()', () => {

    it('should reset a board back to the initial state', () => {

      const board = createBoard(3);
      let slots = [];

      board.move(0,0); // x
      board.move(2,1); // o
      board.move(0,2); // x
      board.move(1,0); // o

      board.reset();

      board.forEach((x) => {
        return (sym, y) => {
          slots.push([sym, x, y]);
        };
      });

      assert.equal(slots.filter((slot) => slot[0] === null).length, 9);
      assert.isNotOk(board.isFilled());
    });

  });

});
