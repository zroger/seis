import React from 'react';
import clsx from 'clsx';
import classes from './Button.module.css';
import { motion } from 'framer-motion';

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
      initial={ animate ? {
        scale: 0,
      } : false }
      animate={ animate ? {
        scale: [null, 1.5, 1],
        rotate: [null, 360 * (1 + random) / 2, 360 * (1 + random)],
        transition: {
          ease: ["easeIn", "linear", "easeOut"],
        },
      } : undefined}
    >
      <DiceIcon value={value} />
    </Button>
  )
};

export default Dice;
