import { INVALID_MOVE } from 'boardgame.io/core';
import { Game, Ctx } from 'boardgame.io';
import { DiceValue } from './constants';

export interface IPiece {
  id: number;
  playerId: string;
  position: number;
}

export interface IPlayer {
  id: string;
  position: number;
  name: string;
  color: string;
}

export interface IG {
  pieces: IPiece[],
  players: IPlayer[],
  dieRoll?: number,
}

const INITIAL_STATE: IG = {
  pieces: [
    {playerId: "0", id: 0, position: 64},
    {playerId: "0", id: 1, position: 65},
    {playerId: "0", id: 2, position: 66},
    {playerId: "0", id: 3, position: 67},
    {playerId: "1", id: 0, position: 68},
    {playerId: "1", id: 1, position: 69},
    {playerId: "1", id: 2, position: 70},
    {playerId: "1", id: 3, position: 71},
    {playerId: "2", id: 0, position: 72},
    {playerId: "2", id: 1, position: 73},
    {playerId: "2", id: 2, position: 74},
    {playerId: "2", id: 3, position: 75},
    {playerId: "3", id: 0, position: 76},
    {playerId: "3", id: 1, position: 77},
    {playerId: "3", id: 2, position: 78},
    {playerId: "3", id: 3, position: 79},
  ],
  players: [
    {id: "0", position: 0, name: "Player 1", color: "red"},
    {id: "1", position: 1, name: "Player 2", color: "blue"},
    {id: "2", position: 2, name: "Player 3", color: "yellow"},
    {id: "3", position: 3, name: "Player 4", color: "green"},
  ],
}

/**
 * Roll the die. If passed a number 1-6, use that as the value,
 * otherwise, use a random die roll.
 */
function rollDie(G: IG, ctx: Ctx, value: DiceValue|undefined): IG | string {
  if (typeof G.dieRoll !== "undefined") {
    return INVALID_MOVE;
  }
  return {
    ...G,
    dieRoll: (value || ctx.random?.D6()),
  }
}

/**
 * Selector to get the current player instance.
 */
export function getCurrentPlayer(G: IG, ctx: Ctx): IPlayer {
  const player = G.players.find(p => p.id === ctx.currentPlayer);
  if (player === undefined) {
    throw Error("undefined player");
  }
  return player;
}

/**
 * Selector to get the current player instance.
 */
export function getPlayerById(G: IG, playerId: string): IPlayer {
  const player = G.players.find(p => p.id === playerId);
  if (player === undefined) {
    throw Error("undefined player");
  }
  return player;
}

/**
 * Selector to get a player instance by the position.
 */
export function getPlayerByPosition(G: IG, pos: number): IPlayer {
  const player = G.players.find(p => p.position === pos);
  if (player === undefined) {
    throw Error("undefined player");
  }
  return player;
}

/**
 * Get a piece instance by id.
 */
function getPieceById(G: IG, ctx: Ctx, pieceId: number): IPiece {
  const piece = G.pieces.find(p => (
    p.playerId === ctx.currentPlayer && p.id === pieceId
  ));
  if (!piece) {
    throw new Error("Piece not found")
  }
  return piece;
}

/**
 * Get a list of valid moves from the current game state.
 */
export function getValidMoves(G: IG, ctx: Ctx): IPiece[] {
  return G.pieces.filter(
    piece => piece.playerId === ctx.currentPlayer
  ).map(
    piece => {
      const pos = getNextPosition(G, ctx, piece);
      if (piece.position === pos) {
        return piece;
      }
      return {...piece, position: pos}
    }
  ).filter(
    piece => G.pieces.indexOf(piece) === -1
  );
}

/**
 * Get the next position for given piece.
 * If the piece doesn't have a valid move, the current position is returned.
 */
function getNextPosition(G: IG, ctx: Ctx, piece: IPiece): number {
  if (G.dieRoll === undefined) {
    throw new Error("Cannot calculate position from current game state.")
  }

  const boardSize = 4;
  const player = getCurrentPlayer(G, ctx);

  // offset is where the player starts from.
  const offset = (player.position * 12)

  // Starting positions are indexed after everything else,
  // so (12 common cells + 4 home cells) * board_size.
  if (piece.position >= 16 * boardSize) {
    if (G.dieRoll === 1 || G.dieRoll === 6) {
      return offset - 1 + G.dieRoll;
    }
    return piece.position;
  }

  const base = 12 * boardSize;
  const relPos = (base + piece.position - offset) % base;
  const relDest = relPos + G.dieRoll;
  if (relDest >= base) {
    return (player.position * boardSize) + relDest
  }
  return (relDest + offset) % base
}

/**
 * Move the given piece.
 */
function movePiece(G: IG, ctx: Ctx, pieceId: number): IG | string {
  if (G.dieRoll === undefined) {
    return INVALID_MOVE;
  }

  const piece = getPieceById(G, ctx, pieceId);
  const nextPos = getNextPosition(G, ctx, piece);

  if (!ctx.events || !ctx.events.endTurn) {
    throw new Error("ctx.events is undefined");
  }

  // The turn is over unless a 6 was rolled AND a move was made.
  if (G.dieRoll < 6 || piece.position === nextPos) {
    if (!ctx.events?.endTurn) {
      throw new Error("ctx.events.endTurn is undefined")
    }
    ctx.events.endTurn();
  }

  return {
    ...G,
    dieRoll: undefined,
    pieces: G.pieces.map(p => (
      p === piece  ? {...p, position: nextPos} : p
    )),
  }
}

const SeisGame: Game<IG> = {
  name: "seis",
  setup: (): IG => (INITIAL_STATE),
  moves: {
    rollDie,
    movePiece,
  },
  turn: {
  },
};

export default SeisGame;
