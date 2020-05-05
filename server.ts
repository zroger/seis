// server.js
import { Server } from 'boardgame.io/server';
import cors from '@koa/cors';
import Game from './src/game';

const PORT = process.env.PORT || '8000';
const server = Server({ games: [Game] });
server.app.use(cors());
server.run({
  port: parseInt(PORT, 10),
  callback: () => {
    console.log(`Serving boardgame.io at: http://0.0.0.0:${PORT}/`); // tslint:disable-line
  },
  lobbyConfig: {
    uuid: () => {
      return Math.floor(
        Math.random() * (10**6 - 10**5) + 10**5
      ).toString();
    },
  },
});
