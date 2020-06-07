import React, { FunctionComponent } from 'react';
import { Ctx } from 'boardgame.io';

import {
  IG,
  getCurrentPlayer,
  getValidMoves,
} from '../game';

import DiceControls from './DiceControls';

import Button from '@material-ui/core/Button';

import classes from './controls.module.css';

interface Props {
  G: IG,
  ctx: Ctx,
  moves: any,
  playerID?: string,
  isActive: boolean,
  gameMetadata: {id: number, name?: string}[]
}

enum ActionState {
  NONE = 0,
  CHOOSE_SEAT,
  PENDING_START,
  ROLL,
  MOVE,
  PENDING_MOVE,
  GAME_OVER,
}

function selectAction(G: IG, ctx: Ctx, playerID: string|undefined, isActive: boolean): ActionState {
  if (ctx.phase === "setup") {
    if (isActive) {
      const player = G.players.find(p => p.id === playerID);
      if (!player) {
        return ActionState.CHOOSE_SEAT;
      }
    }
    return ActionState.PENDING_START;
  }

  if (ctx.phase === "play" && isActive) {
    return !!G.dieRoll ? ActionState.MOVE : ActionState.ROLL;
  } else if (ctx.phase === "play") {
    return ActionState.PENDING_MOVE;
  }

  if (ctx.gameover) {
    return ActionState.GAME_OVER;
  }

  return ActionState.NONE;
}


const Controls: FunctionComponent<Props> = ({
  G,
  ctx,
  moves,
  playerID,
  isActive,
  gameMetadata
}) => {
  /* const classes = useStyles(); */


  const currentPlayer = getCurrentPlayer(G, ctx);

  const validMoves = getValidMoves(G, ctx);

  const action = selectAction(G, ctx, playerID, isActive);

  const skip = () => {
    // TODO: there should probably be a specific game state move for this.
    moves.movePiece("");
  };

  return (
    <div className={classes.root}>
      {action === ActionState.CHOOSE_SEAT && (
        <div className={classes.message}>
          Choose your color by clicking on an open spot on the board.
        </div>
      )}
      {action === ActionState.PENDING_START && (
        <div className={classes.message}>
          Waiting for {ctx.numPlayers - G.players.length}
          {(ctx.numPlayers - G.players.length) === 1 ? ' player ' : ' players '}
          to join...
        </div>
      )}

      {action === ActionState.MOVE && (
        validMoves.length > 0 ? (
          <div className={classes.message}>Make a move...</div>
        ) : (
          <div className={classes.message}>
            <p>No moves</p>
            <div>
              <Button variant="contained" onClick={skip}>Pass</Button>
            </div>
          </div>
        )
      )}

      {action === ActionState.ROLL && (
        <DiceControls onRoll={moves.rollDie} seat={currentPlayer?.seat as number} />
      )}

      {action === ActionState.PENDING_MOVE && (
        <div className={classes.message}>
          Waiting for <strong>{currentPlayer?.name}</strong> to move...
        </div>
      )}

      {action === ActionState.GAME_OVER && (
        <div className={classes.message}>
          <h1>Game Over</h1>
          <p>{ctx.gameover.name} is the winner</p>
        </div>
      )}

      {action === ActionState.NONE && (
        <div>lolwut</div>
      )}
    </div>
  );
};

export default Controls;
