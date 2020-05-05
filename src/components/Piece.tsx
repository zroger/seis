import React, {FunctionComponent} from 'react';
import { Ctx } from 'boardgame.io';
import { IG, IPlayer, IPiece } from '../game';

interface Props {
  G: IG,
  ctx: Ctx,
  player: IPlayer,
  piece: IPiece,
  enabled?: boolean,
  onSelect?: (piece: IPiece) => void,
  onActivate?: (piece: IPiece) => void,
  onDeactivate?: (piece: IPiece) => void,
}

const Piece: FunctionComponent<Props> = ({
  G,
  ctx,
  player,
  piece,
  enabled,
  onSelect,
  onActivate,
  onDeactivate,
}) => {
  const noop = (p: IPiece) => {return};
  const onClick = () => { (onSelect || noop)(piece); }
  const onMouseEnter = () => { (onActivate || noop)(piece); }
  const onMouseLeave = () => { (onDeactivate || noop)(piece); }

  return (
    <div
      className={"Piece " + player.color + (enabled ? ' enabled' : '')}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  )
}

export default Piece;
