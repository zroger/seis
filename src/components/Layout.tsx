import React, {
  Fragment,
  FunctionComponent,
} from 'react';


import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import Loading from './Loading'

const useStyles = makeStyles((theme) => ({
  main: {},
}));

const Layout: FunctionComponent<{
  loading?: boolean,
}> = ({
  loading = false,
  children,
}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <CssBaseline />
      <main className={classes.main}>
        {loading ? (
          <Loading />
        ) : (
          <Fragment>
            {children}
          </Fragment>
        )}
      </main>
    </Fragment>
  )
};

export default Layout;
