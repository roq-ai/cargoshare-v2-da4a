import axios from 'axios';
import queryString from 'query-string';
import { BookingInterface, BookingGetQueryInterface } from 'interfaces/booking';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getBookings = async (query?: BookingGetQueryInterface): Promise<PaginatedInterface<BookingInterface>> => {
  const response = await axios.get('/api/bookings', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createBooking = async (booking: BookingInterface) => {
  const response = await axios.post('/api/bookings', booking);
  return response.data;
};

export const updateBookingById = async (id: string, booking: BookingInterface) => {
  const response = await axios.put(`/api/bookings/${id}`, booking);
  return response.data;
};

export const getBookingById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/bookings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBookingById = async (id: string) => {
  const response = await axios.delete(`/api/bookings/${id}`);
  return response.data;
};
