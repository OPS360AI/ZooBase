import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

// Create context
const AuthContext = createContext();

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from token on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('zoobase_token');
      
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        // For development, mock a user
        // In production, make an API call to validate the token and get user data
        // const response = await api.get('/auth/me');
        // const userData = response.data;
        
        // Mock user data for development
        const userData = {
          id: '123',
          name: 'John Doe',
          email: 'john.doe@example.com',
          role: 'Zookeeper',
          permissions: ['animal:read', 'observation:create']
        };
        
        setUser(userData);
      } catch (err) {
        console.error('Failed to load user:', err);
        localStorage.removeItem('zoobase_token');
        setError('Session expired. Please login again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);
  
  const login = async (credentials) => {
    try {
      setLoading(true);
      
      // For production, make an API call to authenticate
      // const response = await api.post('/auth/login', credentials);
      // const { token, user } = response.data;
      
      // Mock authentication for development
      const token = 'mock-jwt-token';
      const userData = {
        id: '123',
        name: 'John Doe',
        email: credentials.email,
        role: 'Zookeeper',
        permissions: ['animal:read', 'observation:create']
      };
      
      localStorage.setItem('zoobase_token', token);
      api.setAuthToken(token);
      setUser(userData);
      setError(null);
      
      return userData;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('zoobase_token');
    api.removeAuthToken();
    setUser(null);
  };
  
  const hasPermission = (permission) => {
    if (!user) return false;
    return user.permissions?.includes(permission) || false;
  };
  
  const value = {
    user,
    loading,
    error,
    login,
    logout,
    hasPermission,
    isAuthenticated: !!user
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;