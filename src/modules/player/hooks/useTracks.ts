import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchTracks } from "../store";
import { Track } from "../types";
import { tracksSelector } from "../store/selector";
import { useMentalStatesState } from "../../mental_states/hooks/useMentalStates";

interface useTracksPayload {
  loading: boolean;
  error: null | unknown;
  tracks: Track[]
};

export const useTracksState = () => {
  return useAppSelector(tracksSelector);
};

function useTracks(): useTracksPayload {
  const dispatch = useAppDispatch();
  const { status, error, tracks } = useTracksState();
  const loading = status === "idle" || status === "loading";

  const currentMentalState = useMentalStatesState();

  const _fetchTracks = useCallback((category: string) => dispatch(fetchTracks(category)), []);

  useEffect(() => {
    _fetchTracks(currentMentalState?.mentalState?.category);
  }, []);

  
  return {
    loading,
    error,
    tracks
  }
}

export default useTracks;

