import type { RootState } from '../../../store';
import { createSelector } from "reselect";

export const tracksSelector = createSelector(
  (state: RootState) => state.tracks,
  (tracks) => tracks
);
