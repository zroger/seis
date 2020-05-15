import _ from 'lodash';
import React, { FunctionComponent } from 'react';

import DiceIcon from './DiceIcon';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '80vw',
  },
  left: {
    flexBasis: '40%',
    display: 'block',
    margin: 0,
    padding: 0,
    width: '20vw',
    height: '20vw',
    fontSize: '20vw',

    '& $button': {
      fontSize: '20vw',
    },
  },
  right: {
    flexBasis: '60%',
    width: '40vw',
    height: '20vw',
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',

    '& $button': {
      fontSize: '8vw',
      flexBasis: '33%',
    },
  },
  button: {},
}));


interface Props {
  onRoll: (value: number|undefined) => void,
}


const DiceControls: FunctionComponent<Props> = ({
  onRoll
}) => {
  const classes = useStyles();

  const onClick = (value?: number) => {
    return ((e: any) => {
      e.preventDefault();
      onRoll(value);
    });
  }

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <IconButton className={classes.button} onClick={onClick()}>
          <DiceIcon />
        </IconButton>
      </div>
      <div className={classes.right}>
        {_.range(6).map((i) => (
          <IconButton className={classes.button} onClick={onClick(i+1)}>
            <DiceIcon value={i+1} />
          </IconButton>
        ))}
      </div>
    </div>
  );
};

export default DiceControls;
