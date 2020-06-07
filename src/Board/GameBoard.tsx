import _ from 'lodash';
import React, { FunctionComponent, useState } from 'react';
import clsx from 'clsx';

import {
  Ctx,
  IG,
  getCurrentPlayer,
  getValidMoves,
  BoardPositions,
} from '../game';

import DiceIcon from './DiceIcon';
import Piece from './Piece';
import classes from './board.module.css';


interface Props {
  G: IG,
  ctx: Ctx,
  moves: any,
  playerID?: string,
  isActive: boolean,
  gameMetadata: {id: number, name?: string}[]
}

const posClass = (position: string) => {
  return classes['pos-' + position];
}

const seatClass = (seat?: number) => {
  if (typeof seat === "number") {
    return classes['seat-' + seat];
  }
  return "";
}

const GameBoard: FunctionComponent<Props> = ({
  G,
  ctx,
  moves,
  playerID,
  isActive,
  gameMetadata
}) => {
  // The position of the currently hightlighed piece.
  const [activePiece, setActivePiece] = useState<string|undefined>();

  console.log(ctx.player);
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

  const handleCellClick = (position: string) => {
    if (!isActive) {
      return;
    }
    if (ctx.phase === "setup") {
      const seat = parseInt(position[1], 10);
      const meta = gameMetadata.find(p => "" + p.id === playerID);
      moves.ChooseSeat(seat, meta?.name || `Player ${seat + 1}`);
    }
  };

  return (
    <div className={classes.board}>
      <div className={classes[`nowPlaying${currentPlayer?.seat}`]} />
      <div className={classes.home0} />
      <div className={classes.home1} />
      <div className={classes.home2} />
      <div className={classes.home3} />
      <div className={classes.start0} />
      <div className={classes.start1} />
      <div className={classes.start2} />
      <div className={classes.start3} />

      { G.players.map ( player => (
        <div key={player.seat} className={classes[`name${player.seat}`]}>
          {player.name}
        </div>
      ))}

      { BoardPositions().map( pos => {
        const highlight = activeMove?.to === pos;
        return (
          <div
            key={pos}
            className={clsx(classes.cell, posClass(pos), highlight && classes.highlight)}
            onClick={(e)=> {e.preventDefault(); handleCellClick(pos);}}
          >
          </div>
        );
      })}

      { G.pieces.map(piece => (
        <Piece
          key={piece.position}
          position={piece.position}
          variant={["Red1", "Blue1", "Yellow1", "Green1"][piece.seat]}
          index={piece.id}
          onSelect={isActive ? selectPiece : undefined}
          onActivate={isActive ? activatePiece : undefined}
          onDeactivate={isActive ? deactivatePiece : undefined}
          className={clsx(
            classes.piece,
            /* seatClass(piece.seat), */
            posClass(piece.position),
            (isActive && validMoves.some(_.matches({from: piece.position})) && classes.enabled),
          )}
        />
      ))}

      { G.dieRoll && (
        <div
          className={clsx(classes.diceView, seatClass(currentPlayer?.seat))}
          style={{transform: `rotate(${((G.dieRoll + ctx.turn) % 18) * 10}deg)`}} >
          <DiceIcon value={G.dieRoll} size={10} seat={currentPlayer?.seat as number} />
        </div>
      )}
    </div>
  );
};

export default GameBoard;
