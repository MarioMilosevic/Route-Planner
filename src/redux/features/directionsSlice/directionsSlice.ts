import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type PositionState = {
 directions:string
};

const initialState: PositionState = {
  directions:''  
};

export const positionSlice = createSlice({
  name: "currentPosition",
  initialState,
  reducers: {
      setDirections: (state, action:PayloadAction<string>) => {
          state.directions = action.payload
        }
    },
  },
);

export const { setDirections } = positionSlice.actions;

export default positionSlice.reducer;
