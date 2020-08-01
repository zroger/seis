/**
 * Low-level Lobby API wrapper functions.
 * https://boardgame.io/documentation/#/api/Lobby
 */

export const baseUrl = (
  window.location.hostname === '10.0.1.27' ?
  'http://10.0.1.27:8000' :
  'https://seis-game.herokuapp.com'
)

/**
 * Interface for the API response from POST /games/{name}
 */
interface CreateRoomResponse {
  gameID: string;
}

/**
 * Create a new room.
 */
async function createRoom(numPlayers: number): Promise<CreateRoomResponse> {
  const resp = await fetch(baseUrl + '/games/seis/create', {
    method: 'POST',
    body: JSON.stringify({
      numPlayers,
      unlisted: true,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!resp.ok) {
    throw new Error('HTTP status ' + resp.status);
  }
  return await resp.json() as CreateRoomResponse;
}

/**
 * Interface for the API response from GET /games/{name}/{id}
 */
interface RoomResponse {
  roomID: string;
  players: {
    id: number
    name?: string
    data?: {
      clientId?: string
    }
  }[]
  setupData?: any
}

/**
 * Get the details of a room by its ID.
 */
async function getRoom(roomID: string): Promise<RoomResponse> {
  const resp = await fetch(`${baseUrl}/games/seis/${roomID}`);
  if (!resp.ok) {
    throw new Error(`Room ${roomID} not found`)
  }
  return await resp.json() as RoomResponse;
}

/**
 * Interface for the API response from POST /games/{name}/{id}/join
 */
interface JoinRoomResponse {
  playerCredentials: string;
}

/**
 * Join a game by ID.
 */
async function joinRoom({
  roomId,
  name,
  clientId,
  credentials,
  playerId,
}: {
  roomId: string,
  name: string,
  clientId: string,
  credentials: string,
  playerId: number
}): Promise<JoinRoomResponse> {
  const resp = await fetch(`${baseUrl}/games/seis/${roomId}/join`, {
    method: 'POST',
    body: JSON.stringify({
      playerID: playerId,
      playerName: name,
      data: { clientId: clientId },
    }),
    headers: {
      'Content-Type': 'application/json',
      'bgio-credentials': credentials,
    },
  });
  if (!resp.ok) {
    throw new Error("Unable to join room")
  }
  return await resp.json() as JoinRoomResponse;
}

/**
 * Leave the room.
 */
async function leaveRoom({ roomID, credentials, playerID }: {
  roomID: string,
  credentials: string,
  playerID: string,
}) {
  await fetch(`${baseUrl}/games/seis/${roomID}/leave`, {
    method: 'POST',
    body: JSON.stringify({playerID, credentials}),
    headers: { 'Content-Type': 'application/json' },
  });
}

export default {
  baseUrl,
  createRoom,
  getRoom,
  joinRoom,
  leaveRoom,
}
