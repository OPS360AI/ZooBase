import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-14-14zM14 10a4 4 0 01-8 0 4 4 0 018 0zm-8 0a4 4 0 014-4v8a4 4 0 01-4-4z" clipRule="evenodd" />
            </svg>
            ZooBase
          </Link>
        </div>

        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li><Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link></li>
            <li><Link to="/animals" className="hover:text-blue-200">Animals</Link></li>
            <li><Link to="/habitats" className="hover:text-blue-200">Habitats</Link></li>
            <li><Link to="/medical" className="hover:text-blue-200">Medical</Link></li>
            <li><Link to="/tasks" className="hover:text-blue-200">Tasks</Link></li>
          </ul>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="hidden md:block">
                <span className="font-medium">{user.name || 'User'}</span>
                <span className="text-xs text-blue-200 block">{user.role || 'Staff'}</span>
              </div>
              <div className="relative group">
                <button className="bg-blue-700 hover:bg-blue-800 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.35-.035-.691-.1-1.022A4.978 4.978 0 0010 11z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                  <button 
                    onClick={logout} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;