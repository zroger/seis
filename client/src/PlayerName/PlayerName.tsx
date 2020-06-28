import React from 'react';

import useGrid from '../Grid/useGrid';
import classes from './PlayerName.module.css';

interface Props {
  seat: number,
  name: string,
}

const PlayerName: React.FC<Props> = ({seat, name}) => {
  const grid = useGrid();

  const p1 = "S" + seat + "0"
  const p2 = "S" + seat + "3"
  const style = grid.getStyle([p1, p2], 15);
  const className = [
    classes.red,
    classes.blue,
    classes.yellow,
    classes.green,
  ][seat];
  return (
    <div className={grid.itemClass + " " + className} style={style}>
      {name}
    </div>
  )
}

export default PlayerName;
