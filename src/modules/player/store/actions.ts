import { AppDispatch } from "../../../store";
import { tracksSlice } from ".";

export const tracksActions = (dispatch: AppDispatch) => {
  const actions = {
    clearTracks: () => {
      dispatch(tracksSlice.actions.resetStore())
    },
    getRandomTrack: () => {
      dispatch(tracksSlice.actions.getRandomTrack())
    }
  }
  return actions
};