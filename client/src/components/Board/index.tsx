import React from 'react';

import Board from './Board';
import Dice from '../Dice';
import PlayerName from '../PlayerName';
import AnimatedTokenGroup from '../AnimatedTokenGroup';
import GridProvider from '../Grid/GridProvider';

import {
  Ctx,
  IG,
  getCurrentPlayer,
  DiceValue,
} from '@seis/core';


interface Props {
  G: IG,
  ctx: Ctx,
  moves: any,
  playerID?: string,
  isActive: boolean,
  gameMetadata: {id: number, name?: string}[]
}


const BoardController: React.FC<Props> = ({
  G,
  ctx,
  moves,
  playerID,
  isActive,
  gameMetadata,
}) => {
  const currentPlayer = getCurrentPlayer(G, ctx);
  return (
    <GridProvider>
      <Board>
        { G.players.map(p => (
          <PlayerName key={p.seat} seat={p.seat} name={p.name} />
        ))}

        <AnimatedTokenGroup
          pieces={G.pieces}
          action={isActive && G.dieRoll ? moves.movePiece : console.log}
        />

        { G.dieRoll && (
          <Dice seat={currentPlayer?.seat as number} value={G.dieRoll as DiceValue} random={G.random} />
        )}
      </Board>
    </GridProvider>
  )
}

export default BoardController;
