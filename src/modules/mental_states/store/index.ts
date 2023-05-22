import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { State } from '../types';

export const SLICE_NAME: string = 'mentalStateSlice';

export interface MentalState {
  mentalState: State|null;
}

const initialState: MentalState = {
  mentalState: null,
}

export const mentalStateSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setCurrentMentalState: (state, action: PayloadAction<State>) => {
      state.mentalState = action.payload
    },
    resetStore: () => ({ ...initialState }),
  },
})

const { reducer, actions: actionsMentalStateSlice } = mentalStateSlice
export const { setCurrentMentalState } = actionsMentalStateSlice;

export default reducer;