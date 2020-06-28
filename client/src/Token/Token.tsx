import React from 'react';

import { GridPosition } from '../Grid/positions';
import classes from './Token.module.css';
import useGrid from '../Grid/useGrid';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  pos: GridPosition,
  seat: number,
  action?: (pos: string) => void,
}

const Token: React.FC<Props> = ({pos, seat, action, ...props}) => {

  const grid = useGrid();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (action) {
      action(pos);
    }
  }

  return (
    <div
      className={
        grid.itemClass + " " + [
          classes.red,
          classes.blue,
          classes.yellow,
          classes.green,
        ][seat]
      }
      style={grid.getStyle(pos, 11)}
      onClick={handleClick}
      {...props}
    />
  )
}

export default Token;
