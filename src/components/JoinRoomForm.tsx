import React, {FunctionComponent, useState} from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { getRoom } from '../api';

interface Props {
  onJoin: (roomID: string) => void,
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
}));

const JoinRoomForm: FunctionComponent<Props> = ({
  onJoin,
}) => {
  const classes = useStyles();

  const [roomID, setRoomID] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onChange = async (e: any) => {
    const _newId = e.target.value;
    setError("");
    setRoomID(_newId);
    if (_newId.length >= 6) {
      setLoading(true);
      const _room = await getRoom(_newId);
      if (_room.roomID === _newId) {
        onJoin(_room.roomID)
      } else {
        setError("Invalid Game ID")
      }
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <Typography component="h1" variant="h5">
        Find a Game
      </Typography>
      <form className={classes.form} noValidate={true}>
        <TextField
          variant="standard"
          margin="normal"
          required={true}
          fullWidth={true}
          id="roomID"
          label="Game Number"
          name="roomID"
          autoFocus={true}
          onChange={onChange}
          value={roomID}
          error={error.length > 0}
          helperText={error}
          disabled={loading}
        />
      </form>
    </Container>
  );
};

export default JoinRoomForm;
