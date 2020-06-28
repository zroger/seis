import React from 'react';
import clsx from 'clsx';
import classes from './Button.module.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
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
  return (
    <div
      className={clsx(
        classes[color],
        className,
        {[classes.disabled]: disabled},
      )}
      onClick={handleClick}
      {...props}
    >
      { children }
    </div>
  )
};

export default Button;
