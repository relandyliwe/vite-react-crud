import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Users API
export const usersApi = {
  getAll: () => api.get('/users'),
  getById: (id: number) => api.get(`/users/${id}`),
  create: (data: any) => api.post('/users', data),
  update: (id: number, data: any) => api.put(`/users/${id}`, data),
  delete: (id: number) => api.delete(`/users/${id}`),
  login: async (username: string, password: string) => {
    const response = await api.get('/users');
    const user = response.data.find(
      (u: any) => u.username === username && u.password === password
    );
    return user;
  },
};

// Schedules API
export const schedulesApi = {
  getAll: () => api.get('/schedules'),
  getById: (id: number) => api.get(`/schedules/${id}`),
  getByUserId: (userId: number) => api.get(`/schedules?userId=${userId}`),
  create: (data: any) => api.post('/schedules', data),
  update: (id: number, data: any) => api.put(`/schedules/${id}`, data),
  delete: (id: number) => api.delete(`/schedules/${id}`),
};

// Reminders API
export const remindersApi = {
  getAll: () => api.get('/reminders'),
  getById: (id: number) => api.get(`/reminders/${id}`),
  getByUserId: (userId: number) => api.get(`/reminders?userId=${userId}`),
  create: (data: any) => api.post('/reminders', data),
  update: (id: number, data: any) => api.put(`/reminders/${id}`, data),
  delete: (id: number) => api.delete(`/reminders/${id}`),
};

// Chats API
export const chatsApi = {
  getAll: () => api.get('/chats'),
  getById: (id: number) => api.get(`/chats/${id}`),
  getByUserId: (userId: number) => api.get(`/chats?userId=${userId}`),
  create: (data: any) => api.post('/chats', data),
  delete: (id: number) => api.delete(`/chats/${id}`),
};
