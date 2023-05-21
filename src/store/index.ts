import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import type { Reducer } from "@reduxjs/toolkit"
import { MentalState, mentalStateSlice } from "../modules/mental_states/store";
import { tracksSlice, TracksState } from "../modules/player/store";

export interface ApplicationState {
  mentalState: MentalState
  tracks: TracksState
};

const rootApplicationReducerMap = {
  mentalState: mentalStateSlice.reducer,
  tracks: tracksSlice.reducer,
};

const rootReducer: Reducer = combineReducers<ApplicationState>(rootApplicationReducerMap)

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
