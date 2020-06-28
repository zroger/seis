import React from 'react';

import { DiceValue } from "../constants";
import Button from './Button2';
import DiceIcon from './DiceIcon2';

interface Props extends React.HTMLAttributes<HTMLElement> {
  action?: (value: DiceValue) => void,
  value: DiceValue,
  color?: string,
  disabled?: boolean,
  animate?: boolean,
  random?: number,
}

const Dice: React.FC<Props> = ({
  action,
  value,
  color='default',
  disabled=false,
  animate=false,
  className,
  random=0,
  ...props
}) => {

  const handleClick = () => {
    if (action && !disabled) {
      action(value);
    }
  };
  return (
    <Button
      className={className}
      action={action ? handleClick : undefined}
      disabled={disabled}
      color={color}
    >
      <DiceIcon value={value} />
    </Button>
  )
};

export default Dice;
