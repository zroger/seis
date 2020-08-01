/**
 * The PlayerID is a string identifying the player to the game. In practice this is
 * typically (always?) "0", "1", "2", and "3".
 */
export type PlayerID = string;

/**
 * BoardPosition is a 3-character notation for a position on the board.
 */
export const boardPositions = [
  "S00", "S01", "S02", "S03",
  "S10", "S11", "S12", "S13",
  "S20", "S21", "S22", "S23",
  "S30", "S31", "S32", "S33",
  "H00", "H01", "H02", "H03",
  "H10", "H11", "H12", "H13",
  "H20", "H21", "H22", "H23",
  "H30", "H31", "H32", "H33",
  "C00", "C01", "C02", "C03", "C04", "C05", "C06", "C07", "C08", "C09", "C0A", "C0B",
  "C10", "C11", "C12", "C13", "C14", "C15", "C16", "C17", "C18", "C19", "C1A", "C1B",
  "C20", "C21", "C22", "C23", "C24", "C25", "C26", "C27", "C28", "C29", "C2A", "C2B",
  "C30", "C31", "C32", "C33", "C34", "C35", "C36", "C37", "C38", "C39", "C3A", "C3B",
] as const;

export type BoardPosition = typeof boardPositions[number];

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
