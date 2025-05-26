import axios from 'axios';
import { API_URL } from '../utils/constants';

// Create an axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('zoobase_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle token expiration and refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // In a real app, we would request a new token using the refresh token
        // const refreshToken = localStorage.getItem('refresh_token');
        // const res = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
        // localStorage.setItem('zoobase_token', res.data.token);
        // return apiClient(originalRequest);
        
        // For development, just log out the user on token expiration
        localStorage.removeItem('zoobase_token');
        window.location.href = '/login';
        
      } catch (_error) {
        localStorage.removeItem('zoobase_token');
        window.location.href = '/login';
        return Promise.reject(_error);
      }
    }
    
    return Promise.reject(error);
  }
);

// Helper functions for common API operations
const api = {
  setAuthToken: (token) => {
    localStorage.setItem('zoobase_token', token);
  },
  
  removeAuthToken: () => {
    localStorage.removeItem('zoobase_token');
  },
  
  // Animals
  getAnimals: (params = {}) => {
    return apiClient.get('/animals', { params });
  },
  
  getAnimal: (id) => {
    return apiClient.get(`/animals/${id}`);
  },
  
  createAnimal: (data) => {
    return apiClient.post('/animals', data);
  },
  
  updateAnimal: (id, data) => {
    return apiClient.put(`/animals/${id}`, data);
  },
  
  deleteAnimal: (id) => {
    return apiClient.delete(`/animals/${id}`);
  },
  
  // Medical records
  getAnimalMedicalHistory: (animalId, params = {}) => {
    return apiClient.get(`/animals/${animalId}/medical`, { params });
  },
  
  createMedicalRecord: (animalId, data) => {
    return apiClient.post(`/medical`, { ...data, animalId });
  },
  
  updateMedicalRecord: (id, data) => {
    return apiClient.put(`/medical/${id}`, data);
  },
  
  // Observations
  getAnimalObservations: (animalId, params = {}) => {
    return apiClient.get(`/animals/${animalId}/observations`, { params });
  },
  
  createObservation: (data) => {
    return apiClient.post('/observations', data);
  },
  
  // Habitats
  getHabitats: (params = {}) => {
    return apiClient.get('/habitats', { params });
  },
  
  getHabitat: (id) => {
    return apiClient.get(`/habitats/${id}`);
  },
  
  // Tasks
  getTasks: (params = {}) => {
    return apiClient.get('/tasks', { params });
  },
  
  createTask: (data) => {
    return apiClient.post('/tasks', data);
  },
  
  updateTaskStatus: (id, status) => {
    return apiClient.patch(`/tasks/${id}/status`, { status });
  },
  
  // User
  getCurrentUser: () => {
    return apiClient.get('/auth/me');
  },
  
  login: (credentials) => {
    return apiClient.post('/auth/login', credentials);
  },
  
  register: (userData) => {
    return apiClient.post('/auth/register', userData);
  },
  
  // Dashboard
  getDashboardData: () => {
    return apiClient.get('/dashboard');
  }
};

export default api;