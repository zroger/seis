import { INVALID_MOVE } from 'boardgame.io/core';
import { Game, Ctx } from 'boardgame.io';
import invariant from 'invariant';

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

class Node {
  player: number;
  index: number;
  boardSize: number;

  constructor(player: number, index: number, boardSize: number = 4) {
    this.player = player;
    this.index = index;
    this.boardSize = boardSize;
  }

  next(player: number): Node|undefined {
    return;
  }

  toBoardPosition(): number {
    return -1;
  }

  get key(): string {
    return "X" + this.player + this.index.toString(16)
  }
}

function BuildNode(position: number, boardSize: number): Node {
  invariant(position >= 0, "Invalid position")
  invariant(position < boardSize * 20, "Invalid position")
  return (
    position >= 16 * boardSize ? (
      new StartNode(
        Math.floor((position - (16 * boardSize)) / 4),
        ((position - (16 * boardSize)) % 4),
        boardSize,
      )
    ) : (
      position >= 12 * boardSize ? (
        new HomeNode(
          Math.floor((position - (12 * boardSize)) / 4),
          ((position - (12 * boardSize)) % 4),
          boardSize,
        )
      ) : (
        new CircuitNode(
          Math.floor(position / 12),
          position % 12,
          boardSize,
        )
      )
    )
  )
}

class StartNode extends Node {
  next(player: number): Node|undefined {
    return new CircuitNode(this.player, 0, this.boardSize);
  }

  toBoardPosition(): number {
    return (16 * this.boardSize) + (4 * this.player) + this.index;
  }

  get key(): string {
    return "S" + this.player + this.index.toString(16).toUpperCase()
  }
}


class CircuitNode extends Node {
  next(player: number): Node|undefined {
    if (this.index < 11) {
      return new CircuitNode(this.player, this.index + 1, this.boardSize);
    }
    const nextPlayer = (this.player + 1) % this.boardSize;
    if (nextPlayer === player) {
      return new HomeNode(nextPlayer, 0, this.boardSize);
    }
    return new CircuitNode(nextPlayer, 0, this.boardSize);
  }

  toBoardPosition(): number {
    return (12 * this.player) + this.index;
  }

  get key(): string {
    return "C" + this.player + this.index.toString(16).toUpperCase()
  }
}

class HomeNode extends Node {
  next(player: number): Node|undefined {
    if (this.index < 3) {
      return new HomeNode(this.player, this.index + 1, this.boardSize)
    }
  }

  toBoardPosition(): number {
    return (12 * this.boardSize) + (4 * this.player) + this.index;
  }

  get key(): string {
    return "H" + this.player + this.index.toString(16).toUpperCase()
  }
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
      const nextPos = getNextPosition(G, ctx, piece);
      if (isMoveValid(G, ctx, piece, nextPos)) {
        return {...piece, position: nextPos}
      }
      return piece;
    }
  ).filter(
    piece => G.pieces.indexOf(piece) === -1
  );
}


/**
 *
 */
function isMoveValid(G: IG, ctx: Ctx, piece: IPiece, nextPos: number): boolean {
  // Couldn't calculate next position.
  if (piece.position === nextPos) {
    return false;
  }

  const boardSize = 4;

  // Pieces in start positions require a 1 or a 6 to get out.
  if (piece.position >= (16 * boardSize) && ![1, 6].includes(G.dieRoll as number)) {
    return false;
  }

  const skipped = G.pieces.some(p => (
    (p.playerId === piece.playerId) &&
    (piece.position < p.position) &&
    (p.position < nextPos)
  ))

  // Can't skip your own piece.
  if (skipped) {
    return false;
  }

  const occupied = G.pieces.find(p => (nextPos === p.position))

  // Skip if next position is occupied by own piece.
  if (occupied?.playerId === piece.playerId) {
    return false;
  }

  // Skip if next position is occupied and safe.
  if (occupied && occupied.position % 12 === 5) {
    return false;
  }

  return true;
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

  let node: Node|undefined = BuildNode(piece.position, boardSize)
  for (let i=0; i<G.dieRoll; i++) {
    if (node) {
      node = node.next(player.position)
    }
  }
  return node ? node.toBoardPosition() : piece.position;
}

/**
 * Move the given piece.
 */
function movePiece(G: IG, ctx: Ctx, pieceId: number): IG | string {
  if (G.dieRoll === undefined) {
    return INVALID_MOVE;
  }

  if (pieceId === -1) {
    if (!ctx.events?.endTurn) {
      throw new Error("ctx.events.endTurn is undefined")
    }
    ctx.events.endTurn();
    return {
      ...G,
      dieRoll: undefined,
    }
  }

  const piece = getPieceById(G, ctx, pieceId);
  const nextPos = getNextPosition(G, ctx, piece);

  if (!isMoveValid(G, ctx, piece, nextPos)) {
    return INVALID_MOVE
  }

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

  const occupied = G.pieces.find(p => (nextPos === p.position))

  return {
    ...G,
    dieRoll: undefined,
    pieces: G.pieces.map(p => (
      p === piece ? {...p, position: nextPos} : ( p === occupied ? (
        {...p, position: capture(G, occupied) }
      ) : p)
    )),
  }
}

function capture(G: IG, piece: IPiece) {
  const player = getPlayerById(G, piece.playerId)
  for (let i=0; i<4; i++) {
    const node = new StartNode(player.position, i, 4);
    if (!G.pieces.find(p => p.position === node.toBoardPosition())) {
      return node.toBoardPosition();
    }
  }
  throw new Error("capture error")
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


export function mapNodes<T>(boardSize: number, callback: (node: Node) => T): T[] {
  let nodes = [];
  for (let p=0; p<4; p++) {
    for (let i=0; i<4; i++) {
      nodes.push(new StartNode(p, i, boardSize));
    }
    for (let i=0; i<12; i++) {
      nodes.push(new CircuitNode(p, i, boardSize));
    }
    for (let i=0; i<4; i++) {
      nodes.push(new HomeNode(p, i, boardSize));
    }
  }
  return nodes.map(callback);
};
