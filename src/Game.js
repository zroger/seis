import { createSlice } from "@reduxjs/toolkit";


// Find an empty home cell for the given color.
function findHome(state, color) {
  const homes = {
    green: ["00", "01", "10", "11"],
    yellow: ["0b", "0c", "1b", "1c"],
    blue: ["bb", "bc", "cb", "cc"],
    red: ["b0", "b1", "c0", "c1"],
  }
  return homes[color].find(cell => !state.find(piece => piece.cell === cell))
}

const gameSlice = createSlice({
  name: "game",
  initialState: [
    {id: "g1", color: "green", cell: "00"},
    {id: "g2", color: "green", cell: "01"},
    {id: "g3", color: "green", cell: "10"},
    {id: "g4", color: "green", cell: "11"},
    {id: "y1", color: "yellow", cell: "0b"},
    {id: "y2", color: "yellow", cell: "0c"},
    {id: "y3", color: "yellow", cell: "1b"},
    {id: "y4", color: "yellow", cell: "1c"},
    {id: "b1", color: "blue", cell: "bb"},
    {id: "b2", color: "blue", cell: "bc"},
    {id: "b3", color: "blue", cell: "cb"},
    {id: "b4", color: "blue", cell: "cc"},
    {id: "r1", color: "red", cell: "b0"},
    {id: "r2", color: "red", cell: "b1"},
    {id: "r3", color: "red", cell: "c0"},
    {id: "r4", color: "red", cell: "c1"},
  ],
  reducers: {
    movePiece(state, action) {
      const { payload } = action;
      console.log(payload)
      const occupied = state.find(piece => piece.cell === payload.cell)
      if (occupied) {
        occupied.cell = findHome(state, occupied.color)
      }
      state.find(piece => piece.id === payload.piece).cell = payload.cell
    },
  },
})

export const { movePiece } = gameSlice.actions

export default gameSlice.reducer
