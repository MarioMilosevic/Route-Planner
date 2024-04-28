import { configureStore } from "@reduxjs/toolkit";
import positionSlice from "../features/positionSlice/positionSlice";
export const store = configureStore({
    reducer: {
        position:positionSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch