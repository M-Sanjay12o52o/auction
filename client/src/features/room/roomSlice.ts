import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RoomState {
  currentBid: number | null;
  lastBidder: string | null;
}

const initialState: RoomState = {
  currentBid: null,
  lastBidder: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setCurrentBid(state, action: PayloadAction<number | null>) {
      state.currentBid = action.payload;
    },
    setLastBidder(state, action: PayloadAction<string | null>) {
      state.lastBidder = action.payload;
    },
  },
});

export const { setCurrentBid, setLastBidder } = roomSlice.actions;
export default roomSlice.reducer;
