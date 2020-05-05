import React, {FunctionComponent} from 'react';
import { DiceValue } from '../constants';
import DiceIcon from './DiceIcon';

interface Props {
  value?: DiceValue,
  onRoll?: (value: DiceValue|undefined) => void,
}

const DiceButton: FunctionComponent<Props> = ({
  value,
  onRoll,
}) => {
  const onClick = (e: any) => {
    if (onRoll) {
      onRoll(value);
    }
  };
  return (
    <button className="DiceButton" onClick={onClick}>
      <DiceIcon value={value} />
    </button>
  );
};

export default DiceButton;
