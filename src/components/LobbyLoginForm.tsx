import React, {FunctionComponent, useCallback, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { getRoom, joinRoom } from '../api';
import DiceIcon from './DiceIcon';

interface Props {
  playerName: string,
  onJoin: (creds: string) => void,
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    padding: theme.spacing(4),
  },
  submit: {},
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));


const LobbyLoginForm: FunctionComponent<Props> = ({
  playerName = '',
  onJoin,
}) => {
  const classes = useStyles();

  const [gameID, setGameID] = useState<string>("");
  const [roomLoading, setRoomLoading] = useState<boolean>(false);
  const [room, setRoom] = useState<any>({});
  const [roomError, setRoomError] = useState<string>("");
  const [playerID, setPlayerID] = useState<string>("");

  const onGameIDChange = async (e: any) => {
    const _newId = e.target.value;
    setRoomError("");
    setGameID(_newId);
    if (_newId.length >= 6) {
      setRoomLoading(true);
      const _room = await getRoom(_newId);
      setRoom(room);
      setRoomLoading(false);
      if (_room.roomID === _newId) {
        setRoom(_room)
      } else {
        setRoom({})
        setRoomError("Invalid Game ID")
      }
    }
  };

  const onSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      const _creds = await joinRoom(gameID, playerName, playerID);
      onJoin(_creds);
    },
    [gameID, playerName, playerID, onJoin],
  );

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <Avatar className={classes.avatar}><DiceIcon value={6} /></Avatar>
      <Typography component="h1" variant="h5">
        Play Seis
      </Typography>
      <form className={classes.form} noValidate={true} onSubmit={onSubmit}>
        <TextField
          variant="standard"
          margin="normal"
          required={true}
          fullWidth={true}
          id="gameID"
          label="Game Number"
          name="gameID"
          autoFocus={true}
          onChange={onGameIDChange}
          value={gameID}
          error={roomError.length > 0}
          helperText={roomError}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Join
        </Button>
      </form>
    </Container>
  );
};

export default LobbyLoginForm;
