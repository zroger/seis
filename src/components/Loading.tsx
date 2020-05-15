import React, { FunctionComponent } from 'react';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  main: {},
  loading: {
    padding: theme.spacing(2),
  },
}));

const Loading: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <Backdrop open={true}>
      <Paper className={classes.loading}>
        <CircularProgress color="inherit" />
      </Paper>
    </Backdrop>
  )
};

export default Loading;
