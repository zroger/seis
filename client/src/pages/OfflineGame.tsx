import { Client } from 'boardgame.io/react';
import { Game } from '@seis/core';
import Board from '../Board';

export default Client({
  game: Game,
  board: Board,
});
