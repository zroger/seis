import { INVALID_MOVE, Stage } from "boardgame.io/core";
import { Game, Ctx as BaseCtx } from "boardgame.io";
import { PluginPlayer } from 'boardgame.io/plugins';
import _ from 'lodash';

import * as board from "./board";
import {
  DiceValue,
  Piece,
  Seat,
} from './types';

export { BoardPositions } from './board';

export function uniqueId(len: number = 6): string {
  const base = 16;
  return _.range(len).map(() => (
    Math.floor(Math.random() * base).toString(base)
  )).join("")
}

export interface IPlayer {
  id: string;
  seat: number;
  name: string;
  color: string;
}

export interface IG {
  pieces: Piece[];
  players: IPlayer[];
  dieRoll?: number;
  random: number;
}

export interface Ctx extends BaseCtx {
  player?: any;
}


/**
 * Roll the die. If passed a number 1-6, use that as the value,
 * otherwise, use a random die roll.
 */
function rollDie(G: IG, ctx: Ctx, value: DiceValue | undefined): IG | string {
  const roll = value || ctx.random?.D6();
  console.log("rollDie", {
    playerID: ctx.playerID,
    value: roll,
  });
  if (typeof G.dieRoll !== "undefined") {
    return INVALID_MOVE;
  }
  return {
    ...G,
    dieRoll: roll,
  };
}

/**
 * Pass to the next player, ending the turn.
 */
function Pass(G: IG, ctx: Ctx): IG {
  console.log("Pass", {
    playerID: ctx.playerID,
  });
  if (!ctx.events?.endTurn) {
    throw new Error("ctx.events.endTurn is undefined");
  }
  ctx.events.endTurn();
  return {
    ...G,
    dieRoll: undefined,
  };
}

/**
 * Selector to get the current player instance.
 */
export function getCurrentPlayer(G: IG, ctx: Ctx): IPlayer|undefined {
  const player = G.players.find((p) => p.id === ctx.currentPlayer);
  if (player === undefined) {
    return;
    // throw Error("undefined player");
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
// export function getValidMoves(G: IG, ctx: Ctx): Piece[] {
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
  console.log("movePiece", {
    playerID: ctx.playerID,
    position: position,
  });
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

  const piece = G.pieces.find(p => p.position === position);
  if (!piece) {
    return INVALID_MOVE;
  }
  if (!ctx.playerID) {
    return INVALID_MOVE;
  }
  const currentPlayer = getPlayerById(G, ctx.playerID);
  if (currentPlayer.seat !== piece.seat) {
    return INVALID_MOVE;
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

/**
 * Choose the seat for a player.
 */
function ChooseSeat(G: IG, ctx: Ctx, seat: Seat, name: string): string | undefined {
  console.log("ChooseSeat", {
    playerID: ctx.playerID,
    seat,
    name,
  });
  if (G.players.some(p => p.seat === seat)) {
    return INVALID_MOVE;
  }

  if (typeof ctx.playerID !== "string") {
    return INVALID_MOVE;
  }

  // First remove the player and pieces if they were previously placed.
  const prev = G.players.find(p => p.id === ctx.playerID);
  if (prev) {
    G.players = G.players.filter(p => p.id !== prev.id);
    G.pieces = G.pieces.filter(p => p.seat !== prev.seat);
  }

  const colors = ["red", "blue", "yellow", "green"];
  G.players.push({
    seat,
    name: name,
    id: ctx.playerID,
    color: colors[seat],
  })
  G.pieces.push(...([0, 1, 2, 3].map(i => ({
    id: seat * 4 + i,
    seat,
    position: `S${seat}${i}`,
  }))))
}

/**
 * Change the name for a player.
 */
function ChangeName(G: IG, ctx: Ctx, name: string): string | undefined {
  if (typeof ctx.playerID !== "string") {
    return INVALID_MOVE;
  }

  const player = G.players.find(p => p.id === ctx.playerID);
  if (!player) {
    return INVALID_MOVE;
  }

  player.name = name;
}

const SeisGame: Game<IG> = {
  name: "seis",
  // setup: (): IG => INITIAL_STATE,
  setup: () : IG => ({players: [], pieces: [], random: 0}),
  phases: {
    setup: {
      turn: {
        activePlayers: { all: Stage.NULL },
        onMove: (G: IG, ctx: Ctx): IG => {
          return {...G, random: ctx.random?.Number() as number}
        },
      },
      moves: {ChooseSeat, ChangeName},
      start: true,
      endIf: (G: IG, ctx: Ctx) => (G.players.length === ctx.numPlayers),
      next: 'play',
    },
    play: {
      moves: {
        rollDie,
        movePiece,
        Pass,
      },
      turn: {
        order: {
          first: (G: IG, ctx: Ctx) => 0,
          next: (G: IG, ctx: Ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,
          playOrder: (G: IG) => (_.sortBy(G.players, ['seat']).map(p => p.id)),
        },
        onMove: (G: IG, ctx: Ctx): IG => {
          return {...G, random: ctx.random?.Number() as number}
        },
      },
    },
  },
  plugins: [
    PluginPlayer({setup: (playerID) => ({}), }),
  ],
  endIf: (G: IG, ctx: Ctx): undefined|IPlayer  => {
    return G.players.find(player => {
      return G.pieces.filter(
        piece => piece.seat === player.seat
      ).every(
        piece => piece.position[0] === 'H'
      )
    });
  },
};

export default SeisGame;
