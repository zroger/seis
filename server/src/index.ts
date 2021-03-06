import _ from 'lodash';
import { Server } from 'boardgame.io/server';
import Koa from 'koa';
import cors from '@koa/cors';

import { Game } from '@seis/core';
import { uniqueId } from '@seis/core';

const PORT = process.env.PORT || '8000';
const server = Server(
  {
    games: [Game],
    generateCredentials: (ctx: Koa.DefaultContext): string => {
      const creds = ctx.request.headers["bgio-credentials"];
      const clientId = ctx.request.body?.data?.clientId;
      console.log({
        playerID: ctx.request.body?.playerID,
        playerName: ctx.request.body?.playerName,
        credentials: creds,
        clientId: clientId,
      })
      return creds;
    },
  }
);

server.app.use(cors());

server.run({
  port: parseInt(PORT, 10),
  callback: () => {
    console.log(`Serving boardgame.io at: http://0.0.0.0:${PORT}/`);
  },
  lobbyConfig: {
    uuid: uniqueId,
  },
});
