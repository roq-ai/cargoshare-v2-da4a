import axios from 'axios';
import queryString from 'query-string';
import { TransactionInterface, TransactionGetQueryInterface } from 'interfaces/transaction';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTransactions = async (
  query?: TransactionGetQueryInterface,
): Promise<PaginatedInterface<TransactionInterface>> => {
  const response = await axios.get('/api/transactions', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createTransaction = async (transaction: TransactionInterface) => {
  const response = await axios.post('/api/transactions', transaction);
  return response.data;
};

export const updateTransactionById = async (id: string, transaction: TransactionInterface) => {
  const response = await axios.put(`/api/transactions/${id}`, transaction);
  return response.data;
};

export const getTransactionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/transactions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTransactionById = async (id: string) => {
  const response = await axios.delete(`/api/transactions/${id}`);
  return response.data;
};
