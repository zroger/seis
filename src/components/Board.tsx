import React, { FunctionComponent, useState } from 'react';
import { Ctx } from 'boardgame.io';
import useWindowSize from '@rehooks/window-size'

import { BoardLayout4, Colors } from '../constants';
import {
  IG,
  IPiece,
  getCurrentPlayer,
  getPlayerById,
  getValidMoves,
} from '../game';

import ActionPanel from './ActionPanel';
import Cell from './Cell';
import DiceButton from './DiceButton';
import DiceIcon from './DiceIcon';
import Piece from './Piece';

interface Props {
  G: IG,
  ctx: Ctx,
  moves: any,
  playerID?: string,
  isActive: boolean,
  gameMetadata: any,
}


const Board: FunctionComponent<Props> = ({
  G,
  ctx,
  moves,
  playerID,
  isActive,
  gameMetadata,
}) => {
  const [activePiece, setActivePiece] = useState<IPiece | undefined>();
  const {innerHeight, innerWidth} = useWindowSize();
  const size = Math.min(innerHeight, innerWidth) - 20;
  /* const size = 410; */
  const scale = size / 410;

  const currentPlayer = getCurrentPlayer(G, ctx);

  const validMoves: IPiece[] = G.dieRoll ? getValidMoves(G, ctx) : [];
  const activeMove = validMoves.find(m => activePiece && m.playerId === activePiece.playerId && m.id === activePiece.id);

  const selectPiece = (piece: IPiece) => {
    if (validMoves.find(m => m.playerId === piece.playerId && m.id === piece.id)) {
      moves.movePiece(piece.id);
      setActivePiece(undefined);
    }
  };

  const activatePiece = (piece: IPiece) => {
    /* const move = validMoves.find(m => m.playerId === piece.playerId && m.id === piece.id); */
    setActivePiece(piece);
  };

  const deactivatePiece = (piece: IPiece) => {
    setActivePiece(undefined);
  };

  const skip = () => {
    // TODO: there should probably be a specific game state move for this.
    moves.movePiece(0);
  };

  return (
    <div className={`BoardWrapper CurrentPlayer${currentPlayer.position}`}>
      {!playerID && (
        <div>you're a a spectator</div>
      )}
      <div className="Board" style={{width: size, height: size}}>
        <div className="CurrentPlayerIndicator" />
        {
          gameMetadata.map(({id, name} : {id: number, name: string|undefined}) => (
            <div key={id} className={`Label Label${id}`}>
              {name || ""}
            </div>
          ))
        }
        {
          BoardLayout4.cells.map(
            ([x, y], i) => {
              const piece = G.pieces.find(({position}) => position === i);
              const color = (
                i >= (BoardLayout4.players * 12) ?
                Colors[Math.floor(i / BoardLayout4.players) % BoardLayout4.players] :
                ''
              )
              return (
                <Cell
                  key={i}
                  x={x * scale}
                  y={y * scale}
                  h={20 * scale}
                  color={color}
                  highlight={activeMove && activeMove.position === i}
                  // selected={selected && selected.cell === i}
                >
                  {piece && (
                    <Piece
                      G={G} ctx={ctx}
                      player={getPlayerById(G, piece.playerId)}
                      piece={piece}
                      onSelect={selectPiece}
                      onActivate={activatePiece}
                      onDeactivate={deactivatePiece}
                      enabled={validMoves.some(p => p.playerId === piece.playerId && p.id === piece.id)}
                    />
                  )}
                </Cell>
              )
            }
          )
        }
      </div>
      <div className="controls">
        <div>you are {playerID}</div>
        { isActive ? (
          <div>
            { !G.dieRoll && (
              <ActionPanel title={`Up now: ${currentPlayer.name}`} help="Roll the die">
                <div className="dice-buttons" style={{color: currentPlayer.color}}>
                  <DiceButton onRoll={moves.rollDie} />
                  <DiceButton value={1} onRoll={moves.rollDie} />
                  <DiceButton value={2} onRoll={moves.rollDie} />
                  <DiceButton value={3} onRoll={moves.rollDie} />
                  <DiceButton value={4} onRoll={moves.rollDie} />
                  <DiceButton value={5} onRoll={moves.rollDie} />
                  <DiceButton value={6} onRoll={moves.rollDie} />
                </div>
              </ActionPanel>
            )}
            { G.dieRoll && validMoves.length > 0 && (
              <ActionPanel title={`Up now: ${currentPlayer.name}`} help="Make your move">
                <div className="dice-buttons" style={{color: currentPlayer.color}}>
                  <DiceIcon value={G.dieRoll} />
                </div>
              </ActionPanel>
            )}
            { G.dieRoll && validMoves.length === 0 && (
              <ActionPanel title={`Up now: ${currentPlayer.name}`} help="No moves">
                <button onClick={skip}>Skip</button>
              </ActionPanel>
            )}
          </div>
        ) : (
          <ActionPanel title={`Up now: ${currentPlayer.name}`} help="" />
        )}
      </div>
    </div>
  )
}

export default Board;
