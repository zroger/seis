import { User } from './user';

// export const baseUrl = 'http://10.0.1.27:8000';
export const baseUrl = (
  window.location.hostname === '10.0.1.27' ?
  'http://10.0.1.27:8000' :
  'https://seis-game.herokuapp.com'
)

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function createRoom(numPlayers: number): Promise<string> {
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
  const data = await resp.json();
  return data.gameID;
}

export interface Room {
  roomID: string,
  players: {
    id: string,
    name?: string,
    data?: {
      clientId?: string,
    },
  }[],
  setupData?: any,
}

export async function getRoom(roomID: string): Promise<Room> {
  const resp = await fetch(baseUrl + '/games/seis/' + roomID);
  if (!resp.ok) {
    throw new Error(`Room ${roomID} not found`)
  }
  const data = await resp.json();
  return data;
}

export async function joinRoom(roomID: string, playerName: string, user: User) {
  console.log(`attempting to join room ${roomID}`)
  let room = await getRoom(roomID);
  const seats = room.players.filter(p => p.data?.clientId === user.clientId);
  if (seats.length === 1) {
    console.log(`previously joined room ${roomID} at seat ${seats[0].id}`)
    return "" + seats[0].id;
  }

  // If multiple seats are taken by this user, leave the room and re-join.
  if (seats.length > 1) {
    console.warn(`previously joined room ${roomID} in ${seats.length} seats`)
    await leaveRoom(roomID, user);
  }

  room = await getRoom(roomID);
  const open = room.players.filter(p => !p.name);

  console.log(`found ${open.length} open seats in room ${roomID}`)
  for (let seat of open) {
    console.log(`attempting to join at seat ${seat.id}`)
    const resp = await fetch(`${baseUrl}/games/seis/${roomID}/join`, {
      method: 'POST',
      body: JSON.stringify({
        playerID: seat.id,
        playerName,
        data: { clientId: user.clientId },
      }),
      headers: {
        'Content-Type': 'application/json',
        'bgio-credentials': user.credentials,
      },
    });
    if (resp.ok) {
      console.log(`successfully joined at seat ${seat.id}`)
      return "" + seat.id;
    } else {
      console.log(`unable to join at seat ${seat.id}`)
    }
  }
  console.log(`unable to join any seat`)
  throw new Error("Unable to join room")
}

export async function leaveRoom(roomID: string, user: User) {
  const room = await getRoom(roomID);
  const seats = room.players.filter(p => p.data?.clientId === user.clientId);

  for (let seat of seats) {
    console.log(`leaving seat ${seat.id} of room ${roomID}`)
    await fetch(`${baseUrl}/games/seis/${roomID}/leave`, {
      method: 'POST',
      body: JSON.stringify({playerID: seat.id, credentials: user.credentials}),
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
