import React, {
  ChangeEvent,
  FunctionComponent,
  useState,
} from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

import * as api from '../api';

interface IGameProps {
  gameID: string,
  playerID?: string,
  credentials?: string,
}

interface FormState {
  name: string,
  roomID: string,
}

export function useForm<T>(
  initialState: T
): [T, (event: ChangeEvent<HTMLInputElement>) => void] {
  const [fields, setValues] = useState<T>(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...fields,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };
  return [ fields, handleChange ];
}

const JoinRoomDialog: FunctionComponent<{
  open: boolean,
  onSubmit: (gameProps: IGameProps) => void,
}> = ({
  open,
  onSubmit,
}) => {
  const [fields, handleChange] = useForm<FormState>({roomID: "", name: ""})
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string|undefined>()

  const handleSubmit = () => {
    (async () => {
      setLoading(true)
      setError(undefined)

      let room;
      try {
        room = await api.getRoom(fields.roomID);
      } catch (error) {
        setLoading(false)
        setError("Game not found")
        return
      }
      for (const seat of room.players) {
        if (seat.name) {
          continue
        }
        try {
          const credentials = await api.joinRoom(fields.roomID, fields.name, seat.id);
          onSubmit({
            gameID: fields.roomID,
            playerID: seat.id + '',
            credentials,
          })
          setLoading(false)
          return
        } catch (error) {
          continue
        }
      }
      setLoading(false)
      setError("No open seats")
    })();
  }

  return (
    <Dialog open={open}>
      <DialogTitle>Join an online game</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter your name and a Game ID to join an online game.
        </DialogContentText>
        <TextField
          required={true}
          fullWidth={true}
          id="name"
          name="name"
          label="Name"
          autoFocus={true}
          onChange={handleChange}
          value={fields.name}
          helperText="The name you want to use in the game"
          disabled={loading}
        />
        <TextField
          required={true}
          fullWidth={true}
          id="roomID"
          name="roomID"
          label="Game ID"
          onChange={handleChange}
          value={fields.roomID}
          helperText={error || "Enter the 6 digit game ID"}
          disabled={loading}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          Join
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default JoinRoomDialog;
