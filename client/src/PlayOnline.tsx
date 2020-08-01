import React, { useState } from 'react';
import {
  PromiseFn,
  useAsync,
} from 'react-async';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { Game } from '@seis/core';
import GameLayout from './GameLayout';
import Button from './Button';
import Dialog from './Dialog';
import Overlay from './Overlay';
import PreGameForm from './PreGameForm';
import lobby from './lobby';
import Loading from './Loading';


const OnlineClient = Client({
  game: Game,
  board: GameLayout,
  multiplayer: SocketIO({ server: lobby.baseUrl }),
  loading: "div",
});

type GameProps = Partial<lobby.GameProps>

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const loadGame: PromiseFn<lobby.RoomState> = async ({ gameID }) => {
  await sleep(300);
  return await lobby.getRoom(gameID);
}

const OnlineGame = () => {
  const history = useHistory();
  const match = useRouteMatch<{game_id: string}>("/games/:game_id");
  const gameId = match?.params?.game_id as string;
  const state = useAsync({
    promiseFn: loadGame,
    gameID: gameId,
  });
  const [gameProps, setGameProps] = useState<GameProps|null>(null);

  return (
    <>
      <OnlineClient
        debug={false}
        gameID={gameId}
        { ...(gameProps !== null ? gameProps : {}) }
      />

      <Overlay open={state.isPending}>
        <Loading />
      </Overlay>

      <Dialog open={state.isRejected} title="Game not found">
        <p>
          The game you're trying to access wasn't found.
          This probably means the game finished, or all players left.
        </p>
        <Button onClick={() => { history.push("/") }}>Back</Button>
      </Dialog>

      <PreGameForm
        open={state.isFulfilled && gameProps === null}
        gameId={gameId}
        onChange={setGameProps}
      />
    </>
  )
}

export default OnlineGame;
