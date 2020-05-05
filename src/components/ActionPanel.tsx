import React, {FunctionComponent} from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
  },
  title: {
    margin: 0,
  },
  help: {
    color: '#616161',
    fontSize: '0.8rem',
    margin: '.5rem 0',
  },
});

interface Props {
  title: string,
  help: string,
}

const ActionPanel: FunctionComponent<Props> = ({
  title,
  help,
  children,
}) => {
  const classes = useStyles();
  return (
    <section className={`action-panel ${classes.root}`}>
      <h2 className={classes.title}>{title}</h2>
      <p className={classes.help}>{help}</p>
      <section>
        {children}
      </section>
    </section>
  );
};

export default ActionPanel;
