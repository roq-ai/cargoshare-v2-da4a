import axios from 'axios';
import queryString from 'query-string';
import { RouteInterface, RouteGetQueryInterface } from 'interfaces/route';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getRoutes = async (query?: RouteGetQueryInterface): Promise<PaginatedInterface<RouteInterface>> => {
  const response = await axios.get('/api/routes', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createRoute = async (route: RouteInterface) => {
  const response = await axios.post('/api/routes', route);
  return response.data;
};

export const updateRouteById = async (id: string, route: RouteInterface) => {
  const response = await axios.put(`/api/routes/${id}`, route);
  return response.data;
};

export const getRouteById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/routes/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRouteById = async (id: string) => {
  const response = await axios.delete(`/api/routes/${id}`);
  return response.data;
};
