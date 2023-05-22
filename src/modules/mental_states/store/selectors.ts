import type { RootState } from '../../../store';
import { createSelector } from 'reselect';

export const mentalStateSelector = createSelector(
  (state: RootState) => state.mentalState,
  (mentalState) => mentalState
);