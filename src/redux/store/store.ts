import { configureStore } from "@reduxjs/toolkit";
import positionSlice from "../features/positionSlice/positionSlice";
import routeSlice from "../features/routeSlice/routeSlice";
import directionsSlice from "../features/directionsSlice/directionsSlice";

export const store = configureStore({
    reducer: {
        position: positionSlice,
        route: routeSlice,
        directions:directionsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch