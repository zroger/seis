import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import * as api from '../api';
import { RootState } from './store';


interface LobbyState {
  roomID: string,
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  players: {
    id: string,
    name?: string,
  }[],
  playerID: string,
  playerName: string,
  credentials: string,
}

const initialState: LobbyState = {
  roomID: '',
  loading: 'idle',
  players: [],
  playerID: '',
  playerName: localStorage.getItem("playerName") || 'visitor',
  credentials: '',
}

/**
 * Enter a room. If previously created credentials for the game in this room
 * are found, they are restored. Otherwise, enter as a spectator.
 */
export const refreshRoom = createAsyncThunk<
  api.IRoom,
  void,
  {state: LobbyState}
>(
  'lobby/refreshRoomStatus',
  async (_, thunkAPI) => {
    const {roomID} = thunkAPI.getState();
    return await api.getRoom(roomID);
  }
)

/**
 * Enter a room. If previously created credentials for the game in this room
 * are found, they are restored. Otherwise, enter as a spectator.
 */
export const enterRoom = createAsyncThunk<
  {
    room: api.IRoom,
    playerID: string,
    credentials: string,
  },
  string
>(
  'lobby/enterRoomStatus',
  async (roomID) => {
    const room = await api.getRoom(roomID);
    window.location.hash = room.roomID;
    const creds = JSON.parse(localStorage.getItem("creds") || "{}");
    if (room.roomID === creds?.roomID) {
      return {room, playerID: creds.playerID, credentials: creds.credentials}
    }
    return {room, playerID: "", credentials: ""};
  }
)

/**
 * Join the game in the current room.
 */
export const joinGame = createAsyncThunk<
  {playerID: string, credentials: string},
  string,
  {state: LobbyState}
>(
  'lobby/joinGameStatus',
  async (playerID, thunkAPI) => {
    const {roomID, playerName} = thunkAPI.getState();
    const credentials = await api.joinRoom(roomID, playerName, playerID);
    localStorage.setItem("creds", JSON.stringify({roomID, playerID, credentials}))
    return {playerID, credentials};
  }
)

/**
 * Create a new room.
 */
export const createRoom = createAsyncThunk<api.IRoom, void>(
  'lobby/createRoomStatus',
  async () => {
    const resp = await api.createRoom();
    return resp;
  }
)

const lobbySlice = createSlice({
  name: 'lobby',
  initialState,
  reducers: {
    setPlayerName: (state, action: PayloadAction<string>) => {
      localStorage.setItem("playerName", action.payload);
      state.playerName = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(refreshRoom.fulfilled, (state, action) => {
      const room = action.payload;
      state.players = room.players.map(p => ({...p, id: p.id.toString()}));
    })
    builder.addCase(enterRoom.pending, (state, action) => {
      state.loading = 'pending';
    })
    builder.addCase(enterRoom.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      const {room, playerID, credentials} = action.payload;
      state.roomID = room.roomID;
      state.players = room.players.map(p => ({...p, id: p.id.toString()}));
      state.playerID = playerID;
      state.credentials = credentials;
    })
    builder.addCase(enterRoom.rejected, (state, action) => {
      state.loading = 'failed';
    })

    builder.addCase(joinGame.pending, (state, action) => {
      state.loading = 'pending';
    })
    builder.addCase(joinGame.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.playerID = action.payload.playerID;
      state.credentials = action.payload.credentials;
    })
    builder.addCase(joinGame.rejected, (state, action) => {
      state.loading = 'failed';
    })

    builder.addCase(createRoom.pending, (state, action) => {
      state.loading = 'pending';
    })
    builder.addCase(createRoom.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.roomID = action.payload.roomID;
      state.players = action.payload.players;
    })
    builder.addCase(createRoom.rejected, (state, action) => {
      state.loading = 'failed';
    })
  },
})

export default lobbySlice;
export const { setPlayerName } = lobbySlice.actions;

export const selectAll = (state: RootState) => state;
export const selectRoomID = (state: RootState) => state.roomID;
export const selectLoading = (state: RootState) => state.loading;

export const selectOpenSpots = (state: RootState) => (
  state.players.filter(p => !p.name).map(p => p.id)
);
