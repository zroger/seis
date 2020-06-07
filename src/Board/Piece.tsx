import _ from 'lodash';
import React, {FunctionComponent} from 'react';

import classes from './marbles.module.css';

interface Props {
  position: string,
  variant: string,
  index: number,
  onSelect?: (position: string) => void,
  onActivate?: (position: string) => void,
  onDeactivate?: (position: string) => void,
  className?: string,
}

const Piece: FunctionComponent<Props> = ({
  position,
  variant,
  index,
  onSelect,
  onActivate,
  onDeactivate,
  className,
}) => {
  const onClick = () => { (onSelect || _.noop)(position); }
  const onMouseEnter = () => { (onActivate || _.noop)(position); }
  const onMouseLeave = () => { (onDeactivate || _.noop)(position); }
  return (
    <div
      className={className + ' ' + classes[`${variant}_${index}`]}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  )
}

export default Piece;
