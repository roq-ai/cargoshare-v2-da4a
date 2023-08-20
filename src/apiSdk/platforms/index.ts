import axios from 'axios';
import queryString from 'query-string';
import { PlatformInterface, PlatformGetQueryInterface } from 'interfaces/platform';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPlatforms = async (
  query?: PlatformGetQueryInterface,
): Promise<PaginatedInterface<PlatformInterface>> => {
  const response = await axios.get('/api/platforms', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createPlatform = async (platform: PlatformInterface) => {
  const response = await axios.post('/api/platforms', platform);
  return response.data;
};

export const updatePlatformById = async (id: string, platform: PlatformInterface) => {
  const response = await axios.put(`/api/platforms/${id}`, platform);
  return response.data;
};

export const getPlatformById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/platforms/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePlatformById = async (id: string) => {
  const response = await axios.delete(`/api/platforms/${id}`);
  return response.data;
};
