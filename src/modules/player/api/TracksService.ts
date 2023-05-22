import http from '../../../config/http';
import { AxiosResponse } from 'axios';
import { Track } from '../types';


type TracksServiceType = {
  getTracks: (category: string) => Promise<AxiosResponse<Track[]>>
};

function getTracks(category: string): Promise<AxiosResponse<Track[]>> {
  return http().get(`/tracks/${category}`);
};

const TracksService: TracksServiceType = {
  getTracks
};

export default TracksService;
