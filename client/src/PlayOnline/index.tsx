import React, { useState } from 'react';
import {
  DeferFn,
  PromiseFn,
  useAsync,
} from 'react-async';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { useHistory, useRouteMatch } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as api from '../api';
import { Game } from '@seis/core';
import Board from '../Board';
import Loading from '../components/Loading';
import { getUser } from '../user';

const OnlineClient = Client({
  game: Game,
  board: Board,
  multiplayer: SocketIO({ server: api.baseUrl }),
  loading: Loading,
});

interface GameProps {
  gameID: string;
  playerID?: string;
  credentials?: string;
}

interface RoomState {
  room: api.Room;
  playerID?: string;
  credentials?: string;
}

const loadGame: PromiseFn<RoomState> = async ({gameID, user}) => {
  const room = await api.getRoom(gameID);
  const seats = room.players.filter(p => p.data?.clientId === user.clientId);
  if (seats.length === 1) {
    console.log(`previously joined room ${gameID} at seat ${seats[0].id}`)
    return {room, playerID: "" + seats[0].id, credentials: user.credentials};
  }

  if (seats.length > 1) {
    console.warn(`previously joined room ${gameID} in ${seats.length} seats`)
    await api.leaveRoom(gameID, user);
  }

  return {room};
}

const joinGame: DeferFn<RoomState> = async ([name], {gameID, user}) => {
  const room = await api.getRoom(gameID);
  const playerID = await api.joinRoom(gameID, name, user);
  if (playerID) {
    return {room, playerID, credentials: user.credentials}
  }
  return {room}
}

const ErrorDialog = () => {
  const history = useHistory();

  return (
    <Dialog open={true}>
      <DialogTitle>Game not found</DialogTitle>
      <DialogContent>
        <DialogContentText>
          The game you're trying to access wasn't found.
          This probably means the game finished, or all players left.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {history.push("/")}} color="primary">
          Back
        </Button>
      </DialogActions>
    </Dialog>
  )
};

const FormDialog = ({
  open,
  onClose,
}: {
  open: boolean,
  onClose: (name: string, spectate: boolean) => void,
}) => {
  const [name, setName] = useState<string>(
    window.localStorage.getItem("playerName") || ""
  );

  const handleSubmit = (spectate: boolean) => {
    window.localStorage.setItem("playerName", name);
    onClose(name, spectate);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Join the game</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the name you want to use in the game, then click play.
          You can also choose to Just Watch if you don't want to play.
        </DialogContentText>
        <TextField
          autoFocus={true}
          margin="dense"
          label="Your name"
          fullWidth={true}
          value={name}
          onChange={(e) => {setName(e.target.value)}}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {handleSubmit(true)}} color="secondary">
          Just watch
        </Button>
        <Button onClick={() => {handleSubmit(false)}} color="primary">
          Play
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const OnlineGame = () => {
  const match = useRouteMatch<{game_id: string}>("/games/:game_id");
  const gameId = match?.params?.game_id as string;
  const user = getUser();
  const state = useAsync({
    promiseFn: loadGame,
    deferFn: joinGame,
    gameID: gameId,
    user: user,
  });
  const [spectate, setSpectate] = useState<boolean>(false);

  const handleSubmit = (name: string, _spectate: boolean) => {
    setSpectate(_spectate);
    if (!_spectate) {
      state.run(name);
    }
  };

  return (
    <>
      {state.isPending && <Loading />}
      {state.isRejected && (
        <ErrorDialog />
      )}
      {state.isFulfilled && spectate && (
        <OnlineClient debug={false} {...state.data} />
      )}
      {state.isFulfilled && state.data.playerID && (
        <OnlineClient
          debug={false}
          gameID={state.data.room.roomID}
          playerID={state.data.playerID}
          credentials={state.data.credentials}
        />
      )}
      {state.isFulfilled && !spectate && !state.data.playerID && (
        <FormDialog open={true} onClose={handleSubmit} />
      )}
    </>
  )
}

export default OnlineGame;
