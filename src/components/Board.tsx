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

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
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
  }
}));

interface Props {
  G: IG,
  ctx: Ctx,
  moves: any,
  playerID?: string,
  isActive: boolean,
}


const Board: FunctionComponent<Props> = ({
  G,
  ctx,
  moves,
  playerID,
  isActive,
}) => {
  const classes = useStyles();

  // The position of the currently hightlighed piece.
  const [activePiece, setActivePiece] = useState<string|undefined>();

  const currentPlayer = getCurrentPlayer(G, ctx);

  const validMoves = getValidMoves(G, ctx);
  const activeMove = validMoves.find(m => activePiece && activePiece === m.from);

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

  return (
    <div className={`${classes.main} game-view current-player-${currentPlayer.seat}`}>
      <div className={`${classes.board} board4`}>
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
            className={`dice-view dice-view-${currentPlayer.seat}`}
            style={{transform: `rotate(${((G.dieRoll + ctx.turn) % 18) * 10}deg)`}} >
            <DiceIcon value={G.dieRoll} />
          </div>
        )}
      </div>

      <Container className={classes.controls}>
        {!!(isActive && G.dieRoll && validMoves.length === 0) && (
          <div>
            <Typography>No moves</Typography>
            <div>
              <Button variant="contained" onClick={skip}>Continue</Button>
            </div>
          </div>
        )}

        {isActive && !G.dieRoll && (
          <DiceControls onRoll={moves.rollDie} />
        )}
      </Container>
    </div>
  );
};

export default Board;
