import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TracksService from '../api/TracksService';
import { Track } from '../types';

export const SLICE_NAME: string = 'tracksSlice';

type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface TracksState {
  status: RequestStatus;
  error: unknown | null;
  tracks: Track[];
};

const initialState: TracksState = {
  status: 'idle',
  error: null,
  tracks: []
};

export const fetchTracks = createAsyncThunk('tracks/fetchTracks', async (category: string, { rejectWithValue }) => {
  try {
    const response = await TracksService.getTracks(category);
    return {
      tracks: response?.data
    }
  } catch (error) {
    return rejectWithValue(error?.response);
  }
});

export const tracksSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTracks.pending, (state, _) => {
        state.status = 'loading';
      })
      .addCase(fetchTracks.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      .addCase(fetchTracks.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.error = null;
        state.tracks = payload?.tracks
      })
  },
});


const { reducer, actions } = tracksSlice;
export const { } = actions;
export default reducer;

