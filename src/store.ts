import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';


const fetchRoom = createAsyncThunk(
  'lobby/fetchRoomStatus',
  async (roomID: string, thunkAPI: any) => {
    const resp = await api.getRoom(roomID);
    return resp;
  }
)

const joinRoom = createAsyncThunk(
  'lobby/joinRoomStatus',
  async (args: {roomID: string, playerName: string, playerID: string}, thunkAPI: any) => {
    const resp = await api.joinRoom(args.roomID, args.playerName, args.playerID);
    return {playerID: args.playerID, credentials: resp};
  }
)

const createRoom = createAsyncThunk(
  'lobby/createRoomStatus',
  async () => {
    const resp = await api.createRoom();
    return resp;
  }
)

interface LobbyState {
  roomID: string,
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  players: {
    id: string,
    name?: string,
  }[],
  playerID: string,
  credentials: string,
}

const initialState: LobbyState = {
  roomID: '',
  loading: 'idle',
  players: [],
  playerID: '',
  credentials: '',
}

export const lobbySlice = createSlice({
  name: 'lobby',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchRoom.pending, (state, action) => {
      state.loading = 'pending';
    })
    builder.addCase(fetchRoom.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.roomID = action.payload.roomID;
      state.players = action.payload.players;
    })
    builder.addCase(fetchRoom.rejected, (state, action) => {
      state.loading = 'failed';
    })

    builder.addCase(joinRoom.pending, (state, action) => {
      state.loading = 'pending';
    })
    builder.addCase(joinRoom.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.playerID = action.payload.playerID;
      state.credentials = action.payload.credentials;
    })
    builder.addCase(joinRoom.rejected, (state, action) => {
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

export default configureStore({
  reducer: lobbySlice.reducer,
});
