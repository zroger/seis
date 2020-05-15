import React, {
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';

import * as api from './api';
import Game from './game';
import Board from './components/Board';
import JoinRoomDialog from './components/JoinRoomDialog';
import Layout from './components/Layout';
import Loading from './components/Loading';

import './App.css';

interface IGameProps {
  gameID: string,
  playerID?: string,
  credentials?: string,
}

const useSessionState = (key: string) => {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem(key) || "null")
    } catch (error) {
      return
    }
  });

  useEffect(() => {
    if (value) {
      sessionStorage.setItem(key, JSON.stringify(value))
    } else {
      sessionStorage.removeItem(key)
    }
  }, [key, value]);

  return [value, setValue];
};

const OnlineClient = Client({
  game: Game,
  board: Board,
  multiplayer: SocketIO({ server: 'https://seis-game.herokuapp.com' }),
  loading: Loading,
});

const OfflineClient = Client({
  game: Game,
  board: Board,
});

const App: FunctionComponent = () => {
  const [gameProps, setGameProps] = useSessionState("game")
  const [isLoading, setLoading] = useState<boolean>(false)

  const debug = window.location.hash.indexOf("debug") > 0;

  useEffect(() => {
    if (debug) {
      return;
    }
    setLoading(true);
    (async () => {
      try {
        await api.getRoom(gameProps.gameID);
      } catch (error) {
        setGameProps(undefined)
      }
      setLoading(false);
    })();
  }, [debug, gameProps, setGameProps]);

  return (
    <Layout loading={isLoading}>
      { debug ? (
          <OfflineClient debug={false} />
        ) : (
          gameProps ? (
            <OnlineClient {...gameProps} debug={false} />
          ) : (
            <JoinRoomDialog open={true} onSubmit={setGameProps} />
          )
        )
      }
    </Layout>
  )
};

export default App;
