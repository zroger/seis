import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { IoIosExit } from 'react-icons/io';

import classes from './GameLayout.module.css';
import * as api from '../api';
import { getUser } from '../user';
import Controls from '../GameControls';
import Board from '../Board';

const GameLayout = (props: any) => {
  const match = useRouteMatch<{game_id: string}>("/games/:game_id");
  const history = useHistory();
  const handleQuit= async (event: React.MouseEvent) => {
    event.preventDefault();
    const user = getUser();
    const gameId =match?.params?.game_id as string;
    // Don't wait for this to finish.
    api.leaveRoom(gameId, user).catch(error => console.error(error));
    history.push('/')
  }

  return (
    <div className={classes.container}>
      <header>
        <h1 className={classes.title}>seis</h1>
        <button className={classes.exit} onClick={handleQuit}>
          <IoIosExit />
        </button>
      </header>

      <main>
        <Board {...props} />
      </main>

      <footer>
        <Controls {...props} />
      </footer>
    </div>
  );
};

export default GameLayout;
