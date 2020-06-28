import React from 'react';
import clsx from 'clsx';
import classes from './Button.module.css';
import { motion, HTMLMotionProps } from 'framer-motion';

interface Props extends HTMLMotionProps<"div"> {
  action?: () => void,
  color?: string,
  disabled?: boolean,
}

const Button: React.FC<Props> = ({
  action,
  color='default',
  disabled=false,
  className,
  children,
  ...props
}) => {

  const handleClick = () => {
    if (action && !disabled) {
      action();
    }
  };
  const interactive = !!action && !disabled;
  return (
    <motion.div
      className={clsx(
        classes[color],
        className,
        {[classes.disabled]: disabled},
      )}
      onClick={handleClick}
      whileHover={interactive ? { scale: 1.5 } : {}}
      {...props}
    >
      { children }
    </motion.div>
  )
};

export default Button;
