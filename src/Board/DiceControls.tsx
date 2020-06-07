import React from 'react';

import DiceIcon from './DiceIcon';
import classes from './controls.module.css';

interface Props {
  onRoll: (value: number|undefined) => void,
  seat: number,
}

const DiceControls = ({ onRoll, seat }: Props) => {

  const onClick = (value?: number) => {
    return ((e: React.MouseEvent) => {
      e.preventDefault();
      onRoll(value);
    });
  }

  return (
    <div className={classes.diceContainer}>
      <div className={classes.diceLeft}>
        <DiceIcon size={20} onClick={onClick()} seat={seat} />
      </div>
      <div className={classes.diceRight}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <DiceIcon value={i} size={10} onClick={onClick(i)} seat={seat} />
        ))}
      </div>
    </div>
  );
};
        /* <DiceButton value="random" onClick={onClick()}/> */
          /* <DiceButton value={i} onClick={onClick(i)}/> */

export default DiceControls;
