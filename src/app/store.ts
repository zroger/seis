import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import lobbySlice, { enterRoom } from './lobbySlice';

const store = configureStore({
  reducer: lobbySlice.reducer,
});

const roomID = (
  window.location.hash.match(/^#\d{6}$/) ? window.location.hash.substring(1) : ""
);
if (roomID) {
  store.dispatch(enterRoom(roomID));
}


export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
