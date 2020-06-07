import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
} from 'react';
import {
  DeferFn,
  useAsync,
} from 'react-async';

import * as api from '../api';

import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';

const lookupRoom: DeferFn<api.Room> = async ([roomID]) => {
  return await api.getRoom(roomID as string);
}

interface Props extends StandardTextFieldProps {
  onSuccess?: (room: api.Room) => void;
}

const RoomLookup: FunctionComponent<Props> = ({
  onSuccess,
  ...textFieldProps
}) => {
  const lookup = useAsync({deferFn: lookupRoom});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const roomId = event.currentTarget.value;
    if (roomId.length === 6) {
      lookup.run(roomId);
    }
  };

  useEffect(() => {
    if (onSuccess && lookup.data) {
      onSuccess(lookup.data);
    }
  }, [lookup.data, onSuccess]);

  return (
    <TextField
      {...textFieldProps}
      fullWidth={true}
      id="roomID"
      name="roomID"
      label="Game ID"
      onChange={handleChange}
      helperText={lookup.error ? lookup.error.toString() : "Enter the 6 digit game ID"}
      error={!!lookup.error}
      disabled={lookup.isPending}
      inputProps={{maxlength: "6"}}
      type="search"
    />
  )
};

export default RoomLookup;
