import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type routeItem = {
    position: string;
}

export type routeState = {
    position: string;
    distance: string;
    startingPoint: string;
    endPoint: string;
}

const initialState: routeState = {
    position:'',
    distance:'',
    startingPoint:'',
    endPoint:'',
}

export const routeSlice = createSlice({
    name: "route",
    initialState,
    reducers: {
        
    }
})