import { create } from 'zustand';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL || '/api'}/auth`;

export const useAuthStore = create((set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Register user
      register: async (userData) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/register`, userData);
          const { data } = response.data;
          
          set({
            user: data,
            token: data.token,
            isAuthenticated: true,
            loading: false,
          });

          // Set axios default header
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
          
          return { success: true };
        } catch (error) {
          const message = error.response?.data?.message || 'Registration failed';
          set({ error: message, loading: false });
          return { success: false, message };
        }
      },

      // Login user
      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/login`, credentials);
          const { data } = response.data;
          
          set({
            user: data,
            token: data.token,
            isAuthenticated: true,
            loading: false,
          });

          // Set axios default header
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
          
          return { success: true };
        } catch (error) {
          const message = error.response?.data?.message || 'Login failed';
          set({ error: message, loading: false });
          return { success: false, message };
        }
      },

      // Logout user
      logout: () => {
        delete axios.defaults.headers.common['Authorization'];
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
          error: null,
        });
      },

      // Get current user
      getCurrentUser: async () => {
        const token = useAuthStore.getState().token;
        if (!token) return;

        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get(`${API_URL}/me`);
          const { data } = response.data;
          
          set({ user: data });
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      },

      // Clear error
      clearError: () => set({ error: null }),
}));

// Initialize axios with token from storage
const token = useAuthStore.getState().token;
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
