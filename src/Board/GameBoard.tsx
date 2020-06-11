import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import {
  Ctx,
  IG,
  getCurrentPlayer,
  getValidMoves,
  BoardPositions,
} from '../game';

import Dice from './Dice';
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

function usePrevious<T>(value: T): T|undefined {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<T>();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

const GameBoard: React.FC<Props> = ({
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

  const preG = usePrevious<IG>(G);
  const moved = G.pieces.map(p => (
    [p,  preG?.pieces.find(p2 => p.id === p2.id)]
  )).filter(([p1, p2]) => (p1?.position !== p2?.position));
  moved.map(([p1, p2]) => {
    console.log(p1?.position, p2?.position)
    return [p1, p2]
  })

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
        <Dice
          className={clsx(classes.diceView, seatClass(currentPlayer?.seat))}
          value={G.dieRoll}
          color={['red', 'blue', 'yellow', 'green'][currentPlayer?.seat || 0]}
          animate={true}
          random={G.random}
        />
      )}
    </div>
  );
};

export default GameBoard;
