import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { directionsResultType } from "../../../utils/types/types";

interface DirectionsState {
  directions: directionsResultType | null;
}

const initialState: DirectionsState = {
  directions: null,
};

export const directionsSlice = createSlice({
  name: "directions",
  initialState,
  reducers: {
    setDirections: (state, action: PayloadAction<directionsResultType | null>) => {
      state.directions = action.payload;
    },
  },
});

export const { setDirections } = directionsSlice.actions;
export default directionsSlice.reducer;
