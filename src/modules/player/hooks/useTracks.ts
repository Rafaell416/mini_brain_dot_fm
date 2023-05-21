import { useEffect, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchTracks } from "../store";
import { Track } from "../types";
import { tracksSelector } from "../store/selector";
import { useMentalStatesState } from "../../mental_states/hooks/useMentalStates";
import { tracksActions } from "../store/actions";

interface useTracksPayload {
  loading: boolean;
  error: null | unknown;
  tracks: Track[];
  currentTrack: Track;
  nextTrack: () => void
};

export const useTracksState = () => {
  return useAppSelector(tracksSelector);
};

export const useTracksActions = () => {
  const dispatch = useAppDispatch();
  return useMemo(() => tracksActions(dispatch), [dispatch])
}

function useTracks(): useTracksPayload {
  const {getRandomTrack} = useTracksActions();
  const dispatch = useAppDispatch();
  const { status, error, tracks, currentTrack } = useTracksState();
  const loading = status === "idle" || status === "loading";

  const currentMentalState = useMentalStatesState();

  const _fetchTracks = useCallback((category: string) => dispatch(fetchTracks(category)), []);

  const nextTrack = useCallback(() => getRandomTrack(), []);

  useEffect(() => {
    _fetchTracks(currentMentalState?.mentalState?.category);
  }, []);

  useEffect(() => {
    if (!loading) {
      getRandomTrack()
    }
  }, [loading])

  
  return {
    loading,
    error,
    tracks,
    currentTrack,
    nextTrack
  }
}

export default useTracks;

