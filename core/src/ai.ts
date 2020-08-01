import { default as Game, IG, Ctx, getValidMoves } from './game';

const MAKE_MOVE = 'MAKE_MOVE';
const GAME_EVENT = 'GAME_EVENT';

/**
 * Generate a move to be dispatched to the game move reducer.
 *
 * @param {string} type - The move type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */
const makeMove = (
  type: string,
  args?: any,
  playerID?: string | null,
  credentials?: string
) => ({ action: {
  type: MAKE_MOVE,
  payload: { type, args, playerID, credentials },
}});

/**
 * Generate a game event to be dispatched to the flow reducer.
 *
 * @param {string} type - The event type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */
const gameEvent = (
  type: string,
  args?: any,
  playerID?: string | null,
  credentials?: string
) => ({ action: {
  type: GAME_EVENT,
  payload: { type, args, playerID, credentials },
}});


export class SeisBot {

  async play({ G, ctx }: { G: IG; ctx: Ctx }, playerID: string) {
    if (ctx.phase === 'setup') {
      if (G.players.length > 0) {
        const seat = (G.players[0].seat + 2) % 4;
        return makeMove('ChooseSeat', [seat, 'bot'], playerID)
      }
      return makeMove('INVALID_MOVE', [], playerID);
    }

    if (ctx.phase === 'play' && !G.dieRoll) {
      // Wait briefly before the first roll of the turn.
      // If this is not the first roll, give the last move time to complete.
      await sleep(ctx.numMoves === 0 ? 1000 : 3000);
      return makeMove('rollDie', [], playerID)
    }

    if (ctx.phase === 'play' && !!G.dieRoll) {
      const moves = getValidMoves(G, ctx);
      if (moves.length === 0) {
        await sleep(3000);
        return makeMove('Pass', [], playerID)
      }

      await sleep(1000);
      const move = moves[Math.floor(Math.random() * moves.length)];
      return makeMove('movePiece', [move.from], playerID)
    }

    // If anything else, sleep before trying again so we don't kill the CPU.
    await sleep(1000);
    return {};
  }
}

function sleep(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
