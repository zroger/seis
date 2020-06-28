import React from 'react';
import { Ctx } from 'boardgame.io';

import {
  IG,
  getCurrentPlayer,
} from '@seis/core';

import Button from './Button2';
import Dice from './Dice';

import classes from './controls.module.css';

interface Props {
  G: IG,
  ctx: Ctx,
  moves: any,
  playerID?: string,
  isActive: boolean,
  gameMetadata: {id: number, name?: string}[]
}

const colors = [
  'red',
  'blue',
  'yellow',
  'green',
]

const Controls: React.FC<Props> = ({
  G,
  ctx,
  moves,
  playerID,
  isActive,
  gameMetadata
}) => {
  const currentPlayer = getCurrentPlayer(G, ctx);

  return (
    <div className={classes.root}>
      <div className={classes.info}>
        { ctx.gameover && 'Game Over' }
        { ctx.phase === "play" && isActive && 'Your turn' }
        { ctx.phase === "play" && !isActive && `${currentPlayer?.name}'s turn` }
        { ctx.phase === "setup" && isActive && 'Choose your color' }
        { ctx.phase === "setup" && !isActive && 'Waiting for other players' }
      </div>

      <div className={classes.main}>
        { ctx.gameover && (
          <div className={classes.gameover}>
            {ctx.gameover.name} wins!
          </div>
        )}
        { ctx.phase === "play" && (
          <>
            <Button
              className={classes.roll}
              action={moves.rollDie}
              disabled={!isActive || !!G.dieRoll}
            >
              ROLL
            </Button>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Dice key={i}
                className={classes['dice' + i]}
                action={moves.rollDie}
                value={i}
                disabled={!isActive || !!G.dieRoll}
              />
            ))}
            <Button
              className={classes.pass}
              action={moves.Pass}
              disabled={!isActive}
            >
              PASS
            </Button>
          </>
        )}
        { ctx.phase === "setup" && isActive && (
          colors.map((color, seat) => (
            <Dice
              className={classes.dice}
              action={() => {
                const meta = gameMetadata.find(p => "" + p.id === playerID);
                moves.ChooseSeat(seat, meta?.name || `Player  ${seat + 1}`);
              }}
              value={seat + 1}
              color={color}
              disabled={!!G.players.find(p => p.seat === seat)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Controls;
