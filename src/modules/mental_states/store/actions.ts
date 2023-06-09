import { AppDispatch } from '../../../store';
import { mentalStateSlice } from '.';
import { State } from '../types';

export const mentalStateActions = (dispatch: AppDispatch) => {
  const actions = {
    setCurrentMentalState: (state: State) => {
      return dispatch(mentalStateSlice.actions.setCurrentMentalState(state))
    },
    clearMentalState: () => {
      return dispatch(mentalStateSlice.actions.resetStore())
    }
  }
  return actions
};