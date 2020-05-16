// export const baseUrl = 'http://10.0.1.27:8000';
export const baseUrl = (
  window.location.hostname === '10.0.1.27' ?
  'http://10.0.1.27:8000' :
  'https://seis-game.herokuapp.com'
)

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function createRoom(): Promise<IRoom> {
  const resp = await fetch(baseUrl + '/games/seis/create', {
    method: 'POST',
    body: JSON.stringify({
      numPlayers: 4,
      unlisted: true,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!resp.ok) {
    throw new Error('HTTP status ' + resp.status);
  }
  const data = await resp.json();
  return await getRoom(data.roomID);
}

export interface IRoom {
  roomID: string,
  players: {
    id: string,
    name?: string,
  }[],
  setupData?: any,
}

export async function getRoom(roomID: string): Promise<IRoom> {
  const resp = await fetch(baseUrl + '/games/seis/' + roomID);
  if (!resp.ok) {
    throw new Error(`Room ${roomID} not found`)
  }
  await sleep(1000);
  const data = await resp.json();
  return data;
}

export async function joinRoom(roomID: string, playerName: string, playerID: string) {
  await sleep(1000);
  const resp = await fetch(baseUrl + '/games/seis/' + roomID + '/join', {
    method: 'POST',
    body: JSON.stringify({
      "playerID": playerID,
      "playerName": playerName,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!resp.ok) {
    throw new Error(`Unable to join room ${roomID}`)
  }
  await sleep(1000);
  const data = await resp.json();
  return data.playerCredentials;
}
