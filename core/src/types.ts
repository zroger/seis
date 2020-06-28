/**
 * The PlayerID is a string identifying the player to the game. In practice this is
 * typically (always?) "0", "1", "2", and "3".
 */
export type PlayerID = string;

/**
 * BoardPosition is a 3-character notation for a position on the board.
 * TODO: add a custom guard to verify a string is a valid BoardPosition.
 */
export type BoardPosition = string;

/**
 * Seat positions start at the top-left and proceed clock-wise around the board.
 * Wherever possible, refer to seat positions rather than color or player id.
 */
export type Seat = 0|1|2|3;

/**
 * Custom type guard to let the compiler know that a number is a Seat.
export function isSeat(value: number): value is Seat {
  return [0, 1, 2, 3].includes(value);
}

/**
 * Represents a player's piece/token/marble on the board.
 */
export interface Piece {
  id: number,
  position: BoardPosition,
  seat: Seat,
}

/**
 * Valid values for a dice roll.
 */
export type DiceValue = 1|2|3|4|5|6;
