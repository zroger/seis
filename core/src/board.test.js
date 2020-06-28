const { calculateMove } = require('./board');
const { INVALID_MOVE } = require("boardgame.io/core");

test('cant move beyond final home position', () => {
  const fromPos = 'H02';
  const pieces = [{seat: 0, position: 'H02'}]
  expect(calculateMove(fromPos, 2, pieces)).toBe(INVALID_MOVE)
});


test('move into home position', () => {
  const fromPos = 'C2B';
  const pieces = [{seat: 3, position: 'C2B'}]
  expect(calculateMove(fromPos, 1, pieces)).toBe("H30")
  expect(calculateMove(fromPos, 2, pieces)).toBe("H31")
  expect(calculateMove(fromPos, 3, pieces)).toBe("H32")
  expect(calculateMove(fromPos, 4, pieces)).toBe("H33")
  expect(calculateMove(fromPos, 5, pieces)).toBe(INVALID_MOVE)
});


test('move past other home position', () => {
  const fromPos = 'C2B';
  const pieces = [{seat: 2, position: 'C2B'}]
  expect(calculateMove(fromPos, 1, pieces)).toBe("C30")
});


test('require a 1 or 6 to leave start position', () => {
  const fromPos = 'S10';
  const pieces = [{seat: 1, position: 'S10'}]
  expect(calculateMove(fromPos, 2, pieces)).toBe(INVALID_MOVE)
});


test('no passing your own piece', () => {
  const fromPos = 'C10';
  const pieces = [
    {seat: 1, position: 'C10'},
    {seat: 1, position: 'C12'},
  ]
  expect(calculateMove(fromPos, 6, pieces)).toBe(INVALID_MOVE)
});

test('no capturing on safety', () => {
  const fromPos = 'C14';
  const pieces = [
    {seat: 1, position: 'C14'},
    {seat: 2, position: 'C15'},
  ]
  expect(calculateMove(fromPos, 1, pieces)).toBe(INVALID_MOVE)
});
