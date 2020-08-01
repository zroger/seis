import React from 'react';
import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';

import { Game, SeisBot } from '@seis/core';
import GameLayout from './GameLayout';


const Loading = () => <div />

const OfflineGame = () => {
  const OfflineClient = Client({
    game: Game,
    board: GameLayout,
    loading: Loading,
    multiplayer: Local({
      bots: { "1": SeisBot },
    }),
  });

  return (
    <OfflineClient playerID="0" debug={false} />
  )
}

export default OfflineGame;
