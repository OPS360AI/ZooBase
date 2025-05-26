/**
 * Application constants
 */

// API and WebSocket URL
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

// Authentication
export const AUTH_TOKEN_KEY = 'zoobase_token';

// Routes
export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  ANIMALS: '/animals',
  ANIMAL_DETAILS: '/animals/:id',
  HABITATS: '/habitats',
  HABITAT_DETAILS: '/habitats/:id',
  STAFF: '/staff',
  REPORTS: '/reports',
  SETTINGS: '/settings',
  NOTIFICATIONS: '/notifications',
};

// Status codes
export const STATUS = {
  HEALTHY: 'Healthy',
  UNDER_OBSERVATION: 'Under Observation',
  TREATMENT: 'Medical Treatment',
  CRITICAL: 'Critical',
  RECOVERING: 'Recovering',
};

// Animal classifications
export const ANIMAL_CLASSIFICATIONS = [
  'Mammals',
  'Birds',
  'Reptiles',
  'Amphibians',
  'Fish',
  'Invertebrates',
];

// Dashboard refresh intervals (in milliseconds)
export const REFRESH_INTERVALS = {
  DASHBOARD: 60000, // 1 minute
  VITALS: 30000, // 30 seconds
  ALERTS: 15000, // 15 seconds
};

// Chart colors
export const CHART_COLORS = {
  primary: '#3b82f6',
  secondary: '#f59e0b',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  light: '#f3f4f6',
  dark: '#1f2937',
};

// Default pagination
export const DEFAULT_PAGE_SIZE = 10;