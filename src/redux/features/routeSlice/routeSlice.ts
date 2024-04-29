import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

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
      state.startingPoint = action.payload;
    },
    addEndPoint: (state, action: PayloadAction<string>) => {
      state.endPoint = action.payload;
    },
    updatePoint: (
      state,
      action: PayloadAction<{ point: string; type: "Starting point" }>
    ) => {
      const { point, type } = action.payload;
      state[type === "Starting point" ? "startingPoint" : "endPoint"] = point;
    },
  },
});

export const { addWaypoint, addStartPoint, addEndPoint, updatePoint } =
  routeSlice.actions;

export default routeSlice.reducer;
