import _ from 'lodash';
import React, {FunctionComponent} from 'react';
import { Ctx } from 'boardgame.io';
import { IG, IPlayer } from '../game';

interface Props {
  G: IG,
  ctx: Ctx,
  player: IPlayer,
  position: string,
  enabled?: boolean,
  onSelect?: (position: string) => void,
  onActivate?: (position: string) => void,
  onDeactivate?: (position: string) => void,
}

const Piece: FunctionComponent<Props> = ({
  G,
  ctx,
  player,
  position,
  enabled,
  onSelect,
  onActivate,
  onDeactivate,
}) => {
  const onClick = () => { (onSelect || _.noop)(position); }
  const onMouseEnter = () => { (onActivate || _.noop)(position); }
  const onMouseLeave = () => { (onDeactivate || _.noop)(position); }

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
