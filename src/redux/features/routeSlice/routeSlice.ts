import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

// array destinacija koji su objekti id i naziv npr
type destination = {
  id: string;
  name: string;
};

type RouteState = {
  places: destination[];
};

const initialState: RouteState = {
  places: [],
};

export const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    addRoute: (state, action: PayloadAction<destination>) => {
      state.places.push(action.payload);
    },
  },
});


export const { addRoute } = routeSlice.actions;

export default routeSlice.reducer;