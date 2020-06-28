import React from 'react';
import { DiceValue } from '@seis/core';
import DiceIcon from '../DiceIcon';
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

  const className = grid.itemClass + " " + [
    classes.red,
    classes.blue,
    classes.yellow,
    classes.green,
  ][seat];

  return (
    <div className={className} style={style}>
      <DiceIcon value={value} />
    </div>
  )
};

export default Dice;
