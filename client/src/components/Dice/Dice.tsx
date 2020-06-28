import React from 'react';
import { DiceValue } from '@seis/core';
import classes from './Dice.module.css';
import useGrid from '../Grid/useGrid';


interface Props {
  value: DiceValue,
  seat: number,
  random?: number,
}

/**
 * Display a single die on the board.
 *
 * This is rendered as a positioned SVG element. To ensure consistent animation,
 * the transitions are performed on an internal element.
 */
const Dice: React.FC<Props> = ({
  value,
  seat,
  random = 0,
}) => {
  const grid = useGrid();
  const style = {
    ...grid.getStyle(["C" + seat + "2", "C" + seat + "8"], 15, 3, 0),
    '--rotate': `${Math.floor(360 + (360 * random))}deg`,
  } as React.CSSProperties;

  const renderPip = (cx: number, cy: number) => {
    return <circle className={classes.pip} cx={cx} cy={cy} r="2" />
  }

  const className = grid.itemClass + " " + [
    classes.red,
    classes.blue,
    classes.yellow,
    classes.green,
  ][seat];

  return (
    <div className={className} style={style}>
      <svg viewBox="-10 -10 20 20">
        { [1, 3, 5].includes(value as number) && renderPip(0, 0) }
        { [2, 3, 4, 5, 6].includes(value as number) && renderPip(-6, -6) }
        { [4, 5, 6].includes(value as number) && renderPip(6, -6) }
        { [4, 5, 6].includes(value as number) && renderPip(-6, 6) }
        { [2, 3, 4, 5, 6].includes(value as number) && renderPip(6, 6) }
        { [6].includes(value as number) && renderPip(0, -6) }
        { [6].includes(value as number) && renderPip(0, 6) }
      </svg>
    </div>
  )
};

export default Dice;
