import React from 'react';

import Board from './Board';
import Dice from './Dice';
import Player from './Player';
import Token from './Token';

import {
  Ctx,
  IG,
  getCurrentPlayer,
  getValidMoves,
  BoardPositions,
} from '../../game';


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
    <Board>
      { G.players.map(p => (
        <Player key={p.seat} seat={p.seat} name={p.name} />
      ))}

      { G.pieces.map(p => (
        <Token
          key={p.id}
          seat={p.seat}
          pos={p.position}
          action={isActive && G.dieRoll ? moves.movePiece : console.log}
        />
      ))}

      { G.dieRoll && (
        <Dice seat={currentPlayer?.seat as number} value={G.dieRoll} />
      )}
    </Board>
  )
}

export default BoardController;
