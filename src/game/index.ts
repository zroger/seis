import { INVALID_MOVE } from "boardgame.io/core";
import { Game, Ctx } from "boardgame.io";
import _ from 'lodash';

import { DiceValue } from "../constants";
import * as board from "./board";
export { BoardPositions } from './board';

export interface IPiece {
  seat: number,
  position: string;
}

export interface IPlayer {
  id: string;
  seat: number;
  name: string;
  color: string;
}

export interface IG {
  pieces: IPiece[];
  players: IPlayer[];
  dieRoll?: number;
}

const INITIAL_STATE: IG = {
  pieces: [
    { seat: 0, position: "S00" },
    { seat: 0, position: "S01" },
    { seat: 0, position: "S02" },
    { seat: 0, position: "S03" },
    { seat: 1, position: "S10" },
    { seat: 1, position: "S11" },
    { seat: 1, position: "S12" },
    { seat: 1, position: "S13" },
    { seat: 2, position: "S20" },
    { seat: 2, position: "S21" },
    { seat: 2, position: "S22" },
    { seat: 2, position: "S23" },
    { seat: 3, position: "S30" },
    { seat: 3, position: "S31" },
    { seat: 3, position: "S32" },
    { seat: 3, position: "S33" },
  ],
  players: [
    { id: "0", seat: 0, name: "Player 1", color: "red" },
    { id: "1", seat: 1, name: "Player 2", color: "blue" },
    { id: "2", seat: 2, name: "Player 3", color: "yellow" },
    { id: "3", seat: 3, name: "Player 4", color: "green" },
  ],
};

/**
 * Roll the die. If passed a number 1-6, use that as the value,
 * otherwise, use a random die roll.
 */
function rollDie(G: IG, ctx: Ctx, value: DiceValue | undefined): IG | string {
  if (typeof G.dieRoll !== "undefined") {
    return INVALID_MOVE;
  }
  return {
    ...G,
    dieRoll: value || ctx.random?.D6(),
  };
}

/**
 * Selector to get the current player instance.
 */
export function getCurrentPlayer(G: IG, ctx: Ctx): IPlayer {
  const player = G.players.find((p) => p.id === ctx.currentPlayer);
  if (player === undefined) {
    throw Error("undefined player");
  }
  return player;
}

/**
 * Selector to get the current player instance.
 */
export function getPlayerById(G: IG, playerId: string): IPlayer {
  const player = G.players.find((p) => p.id === playerId);
  if (player === undefined) {
    throw Error("undefined player");
  }
  return player;
}

/**
 * Selector to get a player by their seat number.
 */
export function getPlayerBySeat(G: IG, seat: number): IPlayer {
  const player = G.players.find(_.matches({ seat }));
  if (player === undefined) {
    throw Error("undefined player");
  }
  return player;
}

export interface IMove {
  from: string,
  to: string,
}

/**
 * Get a list of valid moves from the current game state.
 */
// export function getValidMoves(G: IG, ctx: Ctx): IPiece[] {
export function getValidMoves(G: IG, ctx: Ctx): IMove[] {
  if (typeof G.dieRoll === "undefined") return [];

  const currentPlayer = getPlayerById(G, ctx.currentPlayer);
  return G.pieces
    .map((piece): IMove => {
      const nextPos = (piece.seat === currentPlayer.seat) ? (
        board.calculateMove(piece.position, G.dieRoll as number, G.pieces)
      ) : INVALID_MOVE;
      return { from: piece.position, to: nextPos };
    })
    .filter((move: IMove) => move.to !== INVALID_MOVE);
}

/**
 * Move the piece at the given position.
 */
function movePiece(G: IG, ctx: Ctx, position: string): IG | string {
  if (G.dieRoll === undefined) {
    return INVALID_MOVE;
  }

  if (position === "") {
    if (!ctx.events?.endTurn) {
      throw new Error("ctx.events.endTurn is undefined");
    }
    ctx.events.endTurn();
    return {
      ...G,
      dieRoll: undefined,
    };
  }

  let updates: any;
  try {
    updates = board.executeMove(position, G.dieRoll as number, G.pieces);
  } catch (error) {
    return INVALID_MOVE;
  }

  if (!ctx.events || !ctx.events.endTurn) {
    throw new Error("ctx.events is undefined");
  }

  // The turn is over unless a 6 was rolled AND a move was made.
  if (G.dieRoll < 6) {
    if (!ctx.events?.endTurn) {
      throw new Error("ctx.events.endTurn is undefined");
    }
    ctx.events.endTurn();
  }

  return {
    ...G,
    dieRoll: undefined,
    pieces: G.pieces.map(
      p => ( _.has(updates, p.position) ? {...p, position: updates[p.position]} : p)
    ),
  };
}

const SeisGame: Game<IG> = {
  name: "seis",
  setup: (): IG => INITIAL_STATE,
  moves: {
    rollDie,
    movePiece,
  },
  turn: {},
};

export default SeisGame;
