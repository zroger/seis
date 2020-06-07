import React, { MouseEvent } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { IoIosExit } from 'react-icons/io';

import * as api from '../api';
import { getUser } from '../user';
import classes from './header.module.css';


const Header = (props: any) => {
  const match = useRouteMatch<{game_id: string}>("/games/:game_id");
  const history = useHistory();
  const handleQuit= async (event: MouseEvent) => {
    event.preventDefault();
    const user = getUser();
    const gameId =match?.params?.game_id as string;
    await api.leaveRoom(gameId, user);
    history.push('/')
  }

  return (
    <>
      <h1 className={classes.title}>seis</h1>
      <button className={classes.exit} onClick={handleQuit}>
        <IoIosExit />
      </button>
    </>
  );
};

export default Header;
