import { Client } from 'boardgame.io/react';
import Game from '../game';
import Board from '../Board';

export default Client({
  game: Game,
  board: Board,
});
