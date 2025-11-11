// src/services/api.js
import axios from 'axios';

const API_URL = 'http://35.172.100.124:8080/api';
const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
};

export const tableAPI = {
  getAll: () => api.get('/tables'),
  create: (data) => api.post('/tables', data),
  updateStatus: (id, statusId) => api.patch(`/tables/${id}/status/${statusId}`),
};

export const productAPI = {
  getAll: () => api.get('/products'),
  create: (data) => api.post('/products', data),
};

export const orderAPI = {
  create: (data) => api.post('/orders', data),
  getAll: () => api.get('/orders'),
  updateStatus: (id, statusName) => api.put(`/orders/${id}/status?status=${statusName}`),
};

export const tableStatusAPI = {
  getAll: () => api.get('/table-status'),
};

export const orderStatusAPI = {
  getAll: () => api.get('/order-status'),
};

export default api;