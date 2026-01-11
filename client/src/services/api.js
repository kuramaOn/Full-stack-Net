import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

// Configure axios defaults
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

// Content API
export const contentAPI = {
  getAll: (params) => axios.get(`${API_URL}/content`, { params }),
  getById: (id) => axios.get(`${API_URL}/content/${id}`),
  create: (data) => axios.post(`${API_URL}/content`, data),
  update: (id, data) => axios.put(`${API_URL}/content/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/content/${id}`),
  getRecommendations: () => axios.get(`${API_URL}/content/recommendations`),
};

// User API
export const userAPI = {
  getProfile: () => axios.get(`${API_URL}/users/profile`),
  updateProfile: (data) => axios.put(`${API_URL}/users/profile`, data),
  toggleFavorite: (contentId) => axios.post(`${API_URL}/users/favorites/${contentId}`),
  toggleWatchlist: (contentId) => axios.post(`${API_URL}/users/watchlist/${contentId}`),
  rateContent: (contentId, rating) => axios.post(`${API_URL}/users/rate/${contentId}`, { rating }),
  addToHistory: (contentId, progress) => axios.post(`${API_URL}/users/history/${contentId}`, { progress }),
};

// Admin API
export const adminAPI = {
  getStats: () => axios.get(`${API_URL}/admin/stats`),
  getUsers: (params) => axios.get(`${API_URL}/admin/users`, { params }),
  updateUser: (id, data) => axios.put(`${API_URL}/admin/users/${id}`, data),
  deleteUser: (id) => axios.delete(`${API_URL}/admin/users/${id}`),
};

export default {
  content: contentAPI,
  user: userAPI,
  admin: adminAPI,
};
