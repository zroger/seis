import React from 'react';
import classes from './controls.module.css';

interface Props {
  message: string,
}

const ControlPanel: React.FC<Props> = ({
  message,
  children,
}) => {

  return (
    <div className={classes.root}>
      <div className={classes.info}>
        {message}
      </div>

      <div className={classes.main}>
        {children}
      </div>
    </div>
  );
};

export default ControlPanel;
