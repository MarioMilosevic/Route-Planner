import { configureStore } from "@reduxjs/toolkit";
import positionSlice from "../features/positionSlice/positionSlice";
import routeSlice from "../features/routeSlice/routeSlice";

export const store = configureStore({
    reducer: {
        position: positionSlice,
        route:routeSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch