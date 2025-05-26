import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './socket/SocketProvider';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Dashboard from './pages/Dashboard';
import './App.css';

// Lazy load components
const AnimalList = lazy(() => import('./pages/animals/AnimalList'));
const AnimalDetail = lazy(() => import('./pages/animals/AnimalDetail'));
const NewAnimal = lazy(() => import('./pages/animals/NewAnimal'));

function App() {
  // For demonstration purposes, set default authentication to true
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('zoobase_token');
      if (token) {
        // In a real app, verify the token with the backend
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading ZooBase...</p>
        </div>
      </div>
    );
  }

  // For development and demo purposes, force authentication to be true
  // Remove this in production and implement proper auth flow
  // const isAuthenticated = true;

  return (
    <Router>
      <AuthProvider>
        <SocketProvider isAuthenticated={isAuthenticated}>
          <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <div className="flex flex-1">
              {isAuthenticated && <Sidebar />}
              <main className="flex-1 p-4 overflow-auto">
                <Routes>
                  {/* Public routes */}
                  <Route 
                    path="/login" 
                    element={
                      isAuthenticated ? <Navigate to="/dashboard" replace /> : <div>Login Page</div>
                    } 
                  />

                  {/* Protected routes */}
                  <Route 
                    path="/dashboard" 
                    element={
                      isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
                    } 
                  />
                  <Route 
                    path="/" 
                    element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
                  />
                  
                  {/* Animal routes */}
                  <Route 
                    path="/animals" 
                    element={
                      isAuthenticated ? (
                        <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
                          <AnimalList />
                        </Suspense>
                      ) : <Navigate to="/login" replace />
                    } 
                  />
                  <Route 
                    path="/animals/new" 
                    element={
                      isAuthenticated ? (
                        <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
                          <NewAnimal />
                        </Suspense>
                      ) : <Navigate to="/login" replace />
                    } 
                  />
                  <Route 
                    path="/animals/:id" 
                    element={
                      isAuthenticated ? (
                        <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
                          <AnimalDetail />
                        </Suspense>
                      ) : <Navigate to="/login" replace />
                    } 
                  />
                  
                  {/* Fallback route */}
                  <Route path="*" element={<div>Page Not Found</div>} />
                </Routes>
              </main>
            </div>
            <Footer />
          </div>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;