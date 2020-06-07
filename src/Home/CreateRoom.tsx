import React, {
  MouseEvent,
  FunctionComponent,
  useEffect,
} from 'react';
import {
  DeferFn,
  useAsync,
} from 'react-async';

import * as api from '../api';

import Button, { ButtonProps } from '@material-ui/core/Button';

const createRoom: DeferFn<string> = async ([numPlayers]) => {
  return await api.createRoom(numPlayers as number);
}

interface Props extends ButtonProps {
  numPlayers: number,
  onSuccess?: (roomID: string) => void;
}

const CreateRoom: FunctionComponent<Props> = ({
  numPlayers,
  onSuccess,
  children,
  ...buttonProps
}) => {
  const create = useAsync({deferFn: createRoom});

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    create.run(numPlayers);
  };

  useEffect(() => {
    if (onSuccess && create.data) {
      onSuccess(create.data);
    }
  }, [create.data, onSuccess]);

  return (
    <Button {...buttonProps} disabled={create.isPending} onClick={handleClick}>{children}</Button>
  )
};

export default CreateRoom;
