import React, {
  FunctionComponent,
} from 'react';
import { useHistory } from 'react-router-dom';

import * as api from '../api';
import CreateRoom from './CreateRoom';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import * as colors from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
  },
  title: {
    fontFamily: '"Rye", cursive',
    color: '#ffcc80',
    fontSize: '3rem',
    padding: theme.spacing(2, 0),
  },
  button: {
    display: 'block',
    margin: theme.spacing(2, 'auto'),
    minWidth: '50%',
    backgroundImage: `linear-gradient(300deg, ${colors.orange["100"]} 0%, ${colors.orange["200"]} 100%)`,
    color: colors.purple["900"],
    fontFamily: '"Rye", cursive',
    fontSize: '1.5rem',
    boxShadow: theme.shadows[2],
  },
}));


const Home: FunctionComponent<{}> = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleRoomFound = (room: api.Room|string) => {
    const roomID = (typeof room === "string") ? room : room.roomID;
    history.push(`/games/${roomID}`);
  }

  return (
    <div>
      <Container className={classes.main} component="main" maxWidth="xs">
        <Typography variant="h1" className={classes.title}>
          seis
        </Typography>

        <Typography variant="body2" align="center">
          Play seis online with friends.<br />Start a game and share the link.
        </Typography>
        {[2, 3, 4].map(i => (
          <CreateRoom
            key={i}
            className={classes.button}
            onSuccess={handleRoomFound}
            numPlayers={i}
          >
            {i} players
          </CreateRoom>
        ))}

      </Container>
    </div>
  )
};

export default Home;
