import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

// array destinacija koji su objekti id i naziv npr
type destination = {
  id: string;
  name: string;
  stopOver: boolean;
};

type RouteState = {
  startingPoint: string;
  waypoints: destination[];
  endPoint: string;
};

// starting point
// waypoints ili ti zaustavna mjesta [array]
// end point - destination

const initialState: RouteState = {
  startingPoint: "",
  waypoints: [],
  endPoint: "",
};

export const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    addWaypoint: (state, action: PayloadAction<destination>) => {
      state.waypoints.push(action.payload);
    },
    addStartPoint: (state, action: PayloadAction<string>) => {
      state.startingPoint += action.payload;
    },
    addEndPoint: (state, action: PayloadAction<string>) => {
      state.endPoint += action.payload;
    },
  },
});

export const { addWaypoint, addStartPoint, addEndPoint } = routeSlice.actions;

export default routeSlice.reducer;
