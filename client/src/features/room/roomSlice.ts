import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RoomState {
  items: Record<
    number,
    { currentBid: number | null; lastBidder: string | null }
  >;
}

const initialState: RoomState = {
  items: {},
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setCurrentBid(
      state,
      action: PayloadAction<{ bid: number | null; itemId: number }>
    ) {
      const { bid, itemId } = action.payload;
      if (state.items[itemId]) {
        state.items[itemId].currentBid = bid;
      } else {
        state.items[itemId] = { currentBid: bid, lastBidder: null };
      }
    },
    setLastBidder(
      state,
      action: PayloadAction<{ bidder: string | null; itemId: number }>
    ) {
      const { bidder, itemId } = action.payload;
      if (state.items[itemId]) {
        state.items[itemId].lastBidder = bidder;
      } else {
        state.items[itemId] = { currentBid: null, lastBidder: bidder };
      }
    },
  },
});

export const { setCurrentBid, setLastBidder } = roomSlice.actions;
export default roomSlice.reducer;
