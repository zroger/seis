import sha1 from 'sha1';
import { uniqueId } from '@seis/core';

import api from './api';
import RoomHistory from './RoomHistory';

const roomHistory = new RoomHistory('rooms');

export const baseUrl = api.baseUrl;

export interface RoomState {
  roomId: string

  players: {
    id: string
    name?: string
    clientId?: string
  }[]
}

/**
 * Get the details for a room by its ID.
 */
export async function getRoom(id: string): Promise<RoomState> {
  const resp = await api.getRoom(id);
  return {
    roomId: id,
    players: resp.players.map( p => ({
      id: p.id.toString(10),
      name: p.name,
      clientId: p.data?.clientId,
    })),
  }
}

/**
 * Find player credentials for the given room from the user's history.
 */
export const findCredentials = roomHistory.find;

/**
 * Get player credentials for the given room from the user's history.
 */
export const getGameHistory = roomHistory.load;

/**
 * Create a new room, returning the room ID.
 */
export async function createRoom(numPlayers: number) {
  const resp = await api.createRoom(numPlayers);
  return resp.gameID;
}

/**
 *
 */
function getCredentials() {
  let creds = localStorage.getItem("creds")
  if (!creds) {
    creds = uniqueId()
    localStorage.setItem("creds", creds)
  }

  return {
    credentials: creds,
    clientId: sha1(creds),
  }
}

export interface GameProps {
  playerID: string
  credentials: string
}

/**
 * Join a game.
 *
 * Returns the props needed to join the game.
 */
export async function joinGame(roomId: string, name: string): Promise<GameProps> {
  const creds = getCredentials();

  // First check if this client has already joined.
  let room = await getRoom(roomId);
  const seats = room.players.filter(p => p.clientId === creds.clientId);

  // Previously joined.
  if (seats.length === 1) {
    console.log(`previously joined room ${roomId} at seat ${seats[0].id}`)
    return {
      playerID: seats[0].id,
      credentials: creds.credentials,
    }
  }

  // If multiple seats are taken by this user, leave the room and re-join.
  if (seats.length > 1) {
    console.warn(`previously joined room ${roomId} in ${seats.length} seats`)
    for (let seat of seats) {
      await api.leaveRoom({roomID: roomId, playerID: seat.id, ...creds});
    }
  }

  room = await getRoom(roomId);
  const open = room.players.filter(p => !p.name);

  console.log(`found ${open.length} open seats in room ${roomId}`)
  for (let seat of open) {
    console.log(`attempting to join at seat ${seat.id}`)
    try {
      const resp = await api.joinRoom({
        roomId,
        name,
        playerId: parseInt(seat.id, 10),
        ...creds,
      })
      const props = {playerID: seat.id, credentials: resp.playerCredentials};
      roomHistory.update({roomId, ...props});
      return props;
    } catch (err) {
      continue
    }
  }
  console.log(`unable to join any seat`)
  throw new Error("Unable to join room")
}

/**
 * Leave a game.
 */
export async function leaveGame(roomId: string) {
  const creds = getCredentials();
  let room = await getRoom(roomId);
  await Promise.all(
    room.players.filter(
      ({ clientId }) => clientId === creds.clientId
    ).map(
      ({ id: playerID }) => api.leaveRoom({roomID: roomId, playerID, ...creds})
    )
  )
  roomHistory.remove(roomId)
}
