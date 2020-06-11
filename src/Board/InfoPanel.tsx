import React, { FunctionComponent } from 'react';
import { Ctx } from 'boardgame.io';

import {
  IG,
  getCurrentPlayer,
  getValidMoves,
} from '../game';

interface Props {
  G: IG,
  ctx: Ctx,
  moves: any,
  playerID?: string,
  isActive: boolean,
  gameMetadata: {id: number, name?: string}[]
}

function pluralize(count: number, singular: string, plural: string) {
  return (count === 1) ? singular : plural;
}

function getText(G: IG, ctx: Ctx, playerID: string|undefined, isActive: boolean): React.ReactNode {
  const currentPlayer = getCurrentPlayer(G, ctx);
  const validMoves = getValidMoves(G, ctx);

  if (ctx.phase === "setup") {
    if (isActive) {
      const player = G.players.find(p => p.id === playerID);
      if (!player) {
        return "Choose your color";
      }
    }
    const pendingPlayers = ctx.numPlayers - G.players.length;
    return `Waiting for ${pendingPlayers} ${pluralize(pendingPlayers, 'player', 'players')} to join`;
  }

  if (ctx.phase === "play" && isActive) {
    return !!G.dieRoll ? (
      validMoves.length > 0 ? (
        "Make a move"
      ) : (
        "No moves"
      )
    ) : (
      "Your turn to roll"
    );
  } else if (ctx.phase === "play") {
    return <>Waiting for&nbsp;<strong>{currentPlayer?.name}</strong>&nbsp;to move...</>
  }

  if (ctx.gameover) {
    return "game over"
  }

  return "";
}

const InfoPanel: FunctionComponent<Props> = ({
  G,
  ctx,
  moves,
  playerID,
  isActive,
  gameMetadata
}) => {
  const text = getText(G, ctx, playerID, isActive);
  return (
    <>{ text }</>
  );
};

export default InfoPanel;
