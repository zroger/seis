import React, {
  FunctionComponent,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  enterRoom,
  joinGame,
  selectAll,
  selectOpenSpots,
} from '../app/lobbySlice';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';

import Game from '../game';
import Board from './Board';
import LobbyLoginForm from './LobbyLoginForm';
import JoinRoomForm from './JoinRoomForm';
import Pregame from './Pregame';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
}));


function getGameIdFromHash(): string {
  const hash = window.location.hash;
  if (!hash.match(/^#\d{6}$/)) {
    return "";
  }
  return hash.substring(1);
}

const Loading = () => {
  return (
    <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};


const GameClient = Client({
  game: Game,
  board: Board,
  loading: Loading,
  numPlayers: 4,
  multiplayer: SocketIO({ server: '10.0.1.27:8000' }),
});


interface ICreds {
  gameID: string,
  playerID: string,
  credentials: string,
};


const Lobby: FunctionComponent<any> = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const state = useSelector(selectAll);
  const openSpots = useSelector(selectOpenSpots);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.match(/^#\d{6}$/) && state.roomID !== hash.substring(1)) {
      dispatch(enterRoom(hash.substring(1)));
    }
  }, [dispatch, state])

  let view;
  if (state.loading === 'pending') {
    view = 'loading';
  } else if (!state.roomID) {
    view = 'choose-room';
  } else if (openSpots.length > 0) {
    view = 'pregame';
  } else if (state.playerID && state.credentials) {
    view = 'game';
  } else {
    view = 'error';
  }

  return (
    <React.Fragment>
      <CssBaseline />
      { view === 'loading' && <Loading /> }
      { view === 'choose-room' && (
        <JoinRoomForm onJoin={id => {dispatch(enterRoom(id))}} />
      )}
      { view === 'pregame' && (
        <Pregame />
      )}
      { view === 'game' && (
        <GameClient
          gameID={state.roomID}
          playerID={state.playerID}
          credentials={state.credentials}
          debug={false}
        />
      )}
      { view === 'error' && (
        <div>sorry</div>
      )}
    </React.Fragment>
  )
};

export default Lobby;

      /* ) : ( */
      /*   state.credentials ? ( */
      /*     <GameClient */
      /*       gameID={state.roomID} */
      /*       playerID={state.playerID} */
      /*       credentials={state.credentials} */
      /*       debug={false} */
      /*     /> */
      /*   ) : ( */
      /*     state.roomID ? ( */
      /*       <React.Fragment> */
      /*         {openSpots.map(i => ( */
      /*           <button key={i} onClick={() => {dispatch(joinGame(i))}}>{i}</button> */
      /*         ))} */
      /*         <GameClient gameID={state.roomID} debug={false} /> */
      /*       </React.Fragment> */
      /*     ) : ( */
      /*       <JoinRoomForm onJoin={id => {dispatch(enterRoom(id))}} /> */
      /*     ) */
      /*   ) */
