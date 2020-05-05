import React, {FunctionComponent, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  playerName: string,
  rooms: any[],
  createRoom: (gameName: string, numPlayers: number) => void,
  refreshRooms: () => void,
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  form: {
    padding: theme.spacing(4),
  },
  submit: {},
  title: {},
}));


const LobbyListView: FunctionComponent<Props> = ({
  playerName,
  rooms,
  createRoom,
  refreshRooms,
}) => {
  const classes = useStyles();
  const onCreateGame = async (e: any) => {
    await createRoom("seis", 4);
  };

  useEffect(() => {
    console.log('hello');
  }, []);

  return (
    <Container className={classes.root}>
      <Typography variant="h4" color="inherit" noWrap={true} className={classes.title}>
        Welcome, {playerName}
      </Typography>

      {(rooms.length > 0) && (
        rooms.map(room => (
          <div key={room.gameID}>
            <pre>
              <code>{JSON.stringify(room)}</code>
            </pre>
          </div>
        ))
      )}

      {(rooms.length === 0) && (
        <Button
          type="submit"
          fullWidth={true}
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onCreateGame}
        >
          Create Game
        </Button>
      )}

    </Container>
  );
};

export default LobbyListView;
