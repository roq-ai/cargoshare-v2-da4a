import axios from 'axios';
import queryString from 'query-string';
import { TruckInterface, TruckGetQueryInterface } from 'interfaces/truck';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTrucks = async (query?: TruckGetQueryInterface): Promise<PaginatedInterface<TruckInterface>> => {
  const response = await axios.get('/api/trucks', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createTruck = async (truck: TruckInterface) => {
  const response = await axios.post('/api/trucks', truck);
  return response.data;
};

export const updateTruckById = async (id: string, truck: TruckInterface) => {
  const response = await axios.put(`/api/trucks/${id}`, truck);
  return response.data;
};

export const getTruckById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/trucks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTruckById = async (id: string) => {
  const response = await axios.delete(`/api/trucks/${id}`);
  return response.data;
};
