import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../utils/constants';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children, isAuthenticated }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const { user } = useAuth();

  // Initialize socket connection when authenticated
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    // For development, we'll use a mock socket implementation
    // In production, connect to the actual WebSocket server
    const createMockSocket = () => {
      // Create a mock socket object for development
      const mockSocket = {
        id: 'mock-socket-id',
        connected: true,
        subscriptions: new Set(),
        
        // Mock emitting events
        emit: (event, data, callback) => {
          console.log(`[Socket] Emitting event: ${event}`, data);
          if (callback) {
            setTimeout(() => callback({ status: 'ok' }), 100);
          }
        },
        
        // Mock subscribing to events
        on: (event, handler) => {
          console.log(`[Socket] Subscribed to event: ${event}`);
          return mockSocket;
        },
        
        // Mock unsubscribing
        off: (event) => {
          console.log(`[Socket] Unsubscribed from event: ${event}`);
          return mockSocket;
        },
        
        // Mock disconnect
        disconnect: () => {
          console.log('[Socket] Disconnected');
          setConnected(false);
        },
        
        // Mock subscription methods
        subscribeToAnimal: (animalId) => {
          mockSocket.subscriptions.add(`animal:${animalId}`);
          console.log(`[Socket] Subscribed to animal:${animalId}`);
          return Promise.resolve({ status: 'subscribed' });
        },
        
        unsubscribeFromAnimal: (animalId) => {
          mockSocket.subscriptions.delete(`animal:${animalId}`);
          console.log(`[Socket] Unsubscribed from animal:${animalId}`);
          return Promise.resolve({ status: 'unsubscribed' });
        },
        
        subscribeToHabitat: (habitatId) => {
          mockSocket.subscriptions.add(`habitat:${habitatId}`);
          console.log(`[Socket] Subscribed to habitat:${habitatId}`);
          return Promise.resolve({ status: 'subscribed' });
        },
        
        unsubscribeFromHabitat: (habitatId) => {
          mockSocket.subscriptions.delete(`habitat:${habitatId}`);
          console.log(`[Socket] Unsubscribed from habitat:${habitatId}`);
          return Promise.resolve({ status: 'unsubscribed' });
        }
      };
      
      // Simulate connection
      console.log('[Socket] Connected (mock)');
      setConnected(true);
      
      return mockSocket;
    };

    // In production, use the actual socket.io connection
    const initializeSocket = () => {
      // For production, uncomment this and comment out the mock socket above
      /*
      const token = localStorage.getItem('zoobase_token');
      const newSocket = io(API_URL, {
        auth: {
          token
        },
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
      });

      newSocket.on('connect', () => {
        console.log('[Socket] Connected');
        setConnected(true);
      });

      newSocket.on('disconnect', () => {
        console.log('[Socket] Disconnected');
        setConnected(false);
      });

      newSocket.on('error', (error) => {
        console.error('[Socket] Error:', error);
      });

      return newSocket;
      */
      
      return createMockSocket();
    };

    const newSocket = initializeSocket();
    setSocket(newSocket);

    // Cleanup function
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [isAuthenticated, user]);

  // Helper function to subscribe to animal updates
  const subscribeToAnimal = async (animalId) => {
    if (!socket || !connected) {
      console.warn('[Socket] Cannot subscribe, socket not connected');
      return false;
    }
    
    try {
      // For real socket.io implementation
      // await socket.emit('subscribe:animal', { animalId });
      
      // For mock implementation
      await socket.subscribeToAnimal(animalId);
      return true;
    } catch (error) {
      console.error('[Socket] Error subscribing to animal:', error);
      return false;
    }
  };

  // Helper function to unsubscribe from animal updates
  const unsubscribeFromAnimal = async (animalId) => {
    if (!socket || !connected) return;
    
    try {
      // For real socket.io implementation
      // await socket.emit('unsubscribe:animal', { animalId });
      
      // For mock implementation
      await socket.unsubscribeFromAnimal(animalId);
    } catch (error) {
      console.error('[Socket] Error unsubscribing from animal:', error);
    }
  };

  // Helper function to subscribe to habitat updates
  const subscribeToHabitat = async (habitatId) => {
    if (!socket || !connected) {
      console.warn('[Socket] Cannot subscribe, socket not connected');
      return false;
    }
    
    try {
      // For real socket.io implementation
      // await socket.emit('subscribe:habitat', { habitatId });
      
      // For mock implementation
      await socket.subscribeToHabitat(habitatId);
      return true;
    } catch (error) {
      console.error('[Socket] Error subscribing to habitat:', error);
      return false;
    }
  };

  // Helper function to unsubscribe from habitat updates
  const unsubscribeFromHabitat = async (habitatId) => {
    if (!socket || !connected) return;
    
    try {
      // For real socket.io implementation
      // await socket.emit('unsubscribe:habitat', { habitatId });
      
      // For mock implementation
      await socket.unsubscribeFromHabitat(habitatId);
    } catch (error) {
      console.error('[Socket] Error unsubscribing from habitat:', error);
    }
  };

  const value = {
    socket,
    connected,
    subscribeToAnimal,
    unsubscribeFromAnimal,
    subscribeToHabitat,
    unsubscribeFromHabitat
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;