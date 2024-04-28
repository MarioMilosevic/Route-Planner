import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


type PositionState = {
        lat: number;
        lng:number
};

const initialState: PositionState = {
        lat: 0,
        lng: 0,
};

export const positionSlice = createSlice({
  name: "currentPosition",
  initialState,
  reducers: {
    setPosition: (state, action: PayloadAction<PositionState>) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});

export const { setPosition } = positionSlice.actions;

export default positionSlice.reducer;
