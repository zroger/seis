import _ from 'lodash';
import React, { FunctionComponent, useState } from 'react';
import { Ctx } from 'boardgame.io';

import {
  IG,
  getCurrentPlayer,
  getPlayerBySeat,
  getValidMoves,
  BoardPositions,
} from '../game';

import DiceControls from './DiceControls';
import DiceIcon from './DiceIcon';
import Piece from './Piece';
import SeatControls from './SeatControls';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  loading: {
    padding: theme.spacing(2),
  },
  diceContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '80vw',
  },
  diceRandom: {
    flexBasis: '40%',
    display: 'block',
    margin: 0,
    padding: 0,
    width: '20vw',
    height: '20vw',
    fontSize: '20vw',
  },
  diceWrapper: {
    flexBasis: '60%',
    width: '40vw',
    height: '20vw',
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  diceButton: {
    flexBasis: '33%',
    flexGrow: 0,
    display: 'block',
    margin: 0,
    padding: 0,
    width: '10vw',
    height: '10vw',
    fontSize: '8vw',
  },


  main: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    position: 'relative',
    display: 'flex',
  },
  controls: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  name: {
    position: 'absolute',
    textAlign: 'center',
    "&.seat-0": {
      transform: "rotate(45deg)",
      bottom: '77.5%',
      left: '55%',
    },
    "&.seat-1": {
      transform: "rotate(-45deg)",
      top: '77.5%',
      left: '55%',
    },
    "&.seat-2": {
      transform: "rotate(45deg)",
      top: '77.5%',
      right: '55%',
    },
    "&.seat-3": {
      transform: "rotate(-45deg)",
      bottom: '77.5%',
      right: '55%',
    },
  },

  '@media (orientation: portrait)': {
    main: {
      flexFlow: 'column nowrap',
    },
    board: {
      height: 'min(60vh, 100vw)',
      width: 'min(60vh, 100vw)',
    },
    controls: {
      height: '40vh',
      width: '100vw',
    },
    name: {
      fontSize: 'min(2vh, 3.33vw)',
      width: 'min(30vh, 50vw)',
    },
  },

  '@media (orientation: landscape)': {
    main: {
      flexFlow: 'row nowrap',
    },
    board: {
      height: 'min(60vw, 100vh)',
      width: 'min(60vw, 100vh)',
    },
    controls: {
      height: '100vh',
      width: '40vw',
    },
    name: {
      fontSize: 'min(3.33vh, 2vw)',
      width: 'min(50vh, 30vw)',
    },
  }
}));

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
}

function selectAction(G: IG, ctx: Ctx, playerID: string|undefined, isActive: boolean): ActionState {
  if (ctx.phase === "setup") {
    if (!!G.players.find(p => p.id === playerID)) {
      return ActionState.PENDING_START;
    }
    return ActionState.CHOOSE_SEAT;
  }

  if (ctx.phase === "play" && isActive) {
    return !!G.dieRoll ? ActionState.MOVE : ActionState.ROLL;
  } else if (ctx.phase === "play") {
    return ActionState.PENDING_MOVE;
  }

  return ActionState.NONE;
}


const Board: FunctionComponent<Props> = ({
  G,
  ctx,
  moves,
  playerID,
  isActive,
  gameMetadata
}) => {
  const classes = useStyles();

  // The position of the currently hightlighed piece.
  const [activePiece, setActivePiece] = useState<string|undefined>();

  const currentPlayer = getCurrentPlayer(G, ctx);

  const validMoves = getValidMoves(G, ctx);
  const activeMove = validMoves.find(m => activePiece && activePiece === m.from);

  const action = selectAction(G, ctx, playerID, isActive);

  const selectPiece = (position: string) => {
    if (validMoves.find(m => m.from === position)) {
      moves.movePiece(position);
      setActivePiece(undefined);
    }
  };

  const activatePiece = (position: string) => {
    setActivePiece(position);
  };

  const deactivatePiece = (position: string) => {
    setActivePiece(undefined);
  };

  const skip = () => {
    // TODO: there should probably be a specific game state move for this.
    moves.movePiece("");
  };

  const handleChooseSeat = (seat: number) => {
    const meta = gameMetadata.find(p => "" + p.id === playerID)
    moves.ChooseSeat(seat, meta?.name ? meta.name : `Player ${seat + 1}`);
  }

  return (
    <div className={`${classes.main} game-view current-player-${currentPlayer?.seat}`}>
      <div className={`${classes.board} board4`}>
        {G.players.map ( player => (
          <div key={player.seat} className={`${classes.name} seat-${player.seat}`}>{player.name}</div>
        ))}
        {BoardPositions().map( pos => {
          const piece = G.pieces.find(p => p.position === pos);
          const highlight = activeMove?.to === pos;
          return (
            <div key={pos} className={`cell ${pos}`}>
              <div className={`spot ${highlight ? "highlight" : ""}`}>
                { piece && (
                  <Piece
                    G={G} ctx={ctx}
                    player={getPlayerBySeat(G, piece.seat)}
                    position={pos}
                    onSelect={isActive ? selectPiece : undefined}
                    onActivate={isActive ? activatePiece : undefined}
                    onDeactivate={isActive ? deactivatePiece : undefined}
                    enabled={isActive && validMoves.some(_.matches({from: pos}))}
                  />
                )}
              </div>
            </div>
          );
        })}
        { G.dieRoll && (
          <div
            className={`dice-view dice-view-${currentPlayer?.seat}`}
            style={{transform: `rotate(${((G.dieRoll + ctx.turn) % 18) * 10}deg)`}} >
            <DiceIcon value={G.dieRoll} />
          </div>
        )}
      </div>

      <div className={classes.controls}>
        {action === ActionState.CHOOSE_SEAT && (
          <SeatControls onSelect={handleChooseSeat} players={G.players} />
        )}
        {action === ActionState.PENDING_START && (
          <div>Waiting for {ctx.numPlayers - G.players.length} more to join...</div>
        )}

        {action === ActionState.MOVE && (
          validMoves.length > 0 ? (
            <div>Make a move...</div>
          ) : (
            <div>
              <Typography>No moves</Typography>
              <div>
                <Button variant="contained" onClick={skip}>Continue</Button>
              </div>
            </div>
          )
        )}

        {action === ActionState.ROLL && (
          <DiceControls onRoll={moves.rollDie} />
        )}

        {action === ActionState.PENDING_MOVE && (
          <div>Waiting for <strong>{currentPlayer?.name}</strong> to move...</div>
        )}

        {action === ActionState.NONE && (
          <div>lolwut</div>
        )}
      </div>
    </div>
  );
};

export default Board;
