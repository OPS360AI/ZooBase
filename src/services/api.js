/**
 * API Service for ZooBase
 * Handles all API requests with authentication
 */

import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance with base configuration
const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for attaching the auth token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('zoobase_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for handling errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error status codes
    if (error.response) {
      const { status } = error.response;
      
      // Handle 401 Unauthorized - redirect to login
      if (status === 401) {
        localStorage.removeItem('zoobase_token');
        // In a real app, we would redirect to login or trigger an auth context method
        console.log('Session expired. Redirecting to login page.');
        // window.location.href = '/login';
      }
      
      // Handle 403 Forbidden
      if (status === 403) {
        console.log('You do not have permission to access this resource.');
      }
    }
    
    return Promise.reject(error);
  }
);

// API service with common methods
const api = {
  // Auth methods
  setAuthToken: (token) => {
    if (token) {
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete instance.defaults.headers.common.Authorization;
    }
  },
  
  removeAuthToken: () => {
    delete instance.defaults.headers.common.Authorization;
  },
  
  // Generic request methods
  get: (url, config = {}) => instance.get(url, config),
  post: (url, data = {}, config = {}) => instance.post(url, data, config),
  put: (url, data = {}, config = {}) => instance.put(url, data, config),
  patch: (url, data = {}, config = {}) => instance.patch(url, data, config),
  delete: (url, config = {}) => instance.delete(url, config),
  
  // Animal specific endpoints
  animals: {
    getAll: (params = {}) => instance.get('/animals', { params }),
    getById: (id) => instance.get(`/animals/${id}`),
    create: (data) => instance.post('/animals', data),
    update: (id, data) => instance.put(`/animals/${id}`, data),
    delete: (id) => instance.delete(`/animals/${id}`),
    getObservations: (id) => instance.get(`/animals/${id}/observations`),
  },
  
  // Other resource endpoints can be added here
};

export default api;