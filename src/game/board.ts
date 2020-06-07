import _ from 'lodash';
import { INVALID_MOVE } from "boardgame.io/core";

import { Piece } from '../types';

enum BoardLocationType {
  CIRCUIT = "C",
  HOME = "H",
  START = "S",
}

const NUM_SEATS = 4;

function encode(type: BoardLocationType, seat: number, index: number): string {
  return (type + seat.toString(16) + index.toString(16)).toUpperCase();
}

function decode(position: string): {type: string, seat: number, index: number} {
  return {
    type: position[0],
    seat: parseInt(position[1], 16),
    index: parseInt(position[2], 16),
  }
}

const Home = _.curry(encode)(BoardLocationType.HOME)
const Circuit = _.curry(encode)(BoardLocationType.CIRCUIT)
const Start = _.curry(encode)(BoardLocationType.START)


/**
 * Calculate the next position (N+1) for a token with the given seat position.
 *
 * Returns INVALID_MOVE if the move would be invalid.
 */
export function calculateNextPosition(fromPos: string, activeSeat: number): string {
  const current = decode(fromPos);

  if (isStart(fromPos)) {
    return Circuit(current.seat, 0);
  }

  if (isCircuit(fromPos)) {
    if (current.index < 11) {
      return Circuit(current.seat, current.index + 1);
    }
    const nextSeat = (current.seat + 1) % NUM_SEATS;
    if (nextSeat === activeSeat) {
      return Home(nextSeat, 0)
    }
    return Circuit(nextSeat, 0)
  }

  if (isHome(fromPos) && current.index < 3) {
    return Home(current.seat, current.index + 1)
  }

  return INVALID_MOVE;
}

/**
 * Calculate the next position for a token moving `roll` positions.
 *
 * Returns INVALID_MOVE if the move would be invalid.
 */
export function calculateMove(fromPos: string, roll: number, pieces: Piece[]): string {
  const piece = pieces.find(p => p.position === fromPos)
  if (typeof piece === "undefined") throw new Error("No piece in that position")

  // only a 1 or a 6 can get you out of the start position.
  if (isStart(fromPos) && ![1, 6].includes(roll)) {
    return INVALID_MOVE;
  }

  let nextPos: string;
  try {
    nextPos = _.range(roll).reduce(
      (acc: string, cur: any): string => {
        const next = calculateNextPosition(acc, piece.seat);
        if (next === INVALID_MOVE) throw INVALID_MOVE;
        if (isPassing(pieces, piece.seat, next)) throw INVALID_MOVE;
        return next;
      }, fromPos
    )
    if (nextPos === fromPos) return fromPos;
  } catch (error) {
    return INVALID_MOVE;
  }

  if (isSafety(nextPos) && pieces.find(p => nextPos === p.position)) {
    return INVALID_MOVE;
  }
  return nextPos;
}

/**
 * Perform the given move, returning an updated list of pieces.
 */
export function executeMove(fromPos: string, roll: number, pieces: Piece[]): Record<string, string> {
  const nextPos = calculateMove(fromPos, roll, pieces);
  if (nextPos === INVALID_MOVE) {
    throw new Error("invalid move")
  }
  const updates: Record<string, string> = {};
  updates[fromPos] = nextPos;

  const captured = pieces.find(_.matches({position: nextPos}));
  if (captured) {
    updates[captured.position] = findStartPosition(pieces, captured.seat);
  }
  return updates;
}

/**
 * Find an unoccupied START location to return the captured piece to.
 */
function findStartPosition(pieces: Piece[], seat: number): string {
  const pos = _.first(
    _.difference(
      _.range(4).map(i => Start(seat, i)),
      pieces.map(p => p.position)
    )
  )
  if (!pos) throw new Error("cannot capture")
  return pos;
}

function isSafety(position: string): boolean {
  return position[0].toUpperCase() === "C" && position[2] === "5"
}

function isCircuit(position: string): boolean {
  return position[0].toUpperCase() === "C"
}

function isHome(position: string): boolean {
  return position[0].toUpperCase() === "H"
}

function isStart(position: string): boolean {
  return position[0].toUpperCase() === "S"
}

function isPassing(pieces: Piece[], seat: number, nextPos: string): boolean {
  return pieces.some(_.matches({position: nextPos, seat: seat}))
}

/**
 * Return an Array of all positions on the board.
 */
export function BoardPositions() {
  return _.flatten(
    _.range(NUM_SEATS).map(
      seat => (
        _.concat(
          [],
          _.range(4).map(i => Start(seat, i)),
          _.range(12).map(i => Circuit(seat, i)),
          _.range(4).map(i => Home(seat, i)),
        )
      )
    )
  );
}
