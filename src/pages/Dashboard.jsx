import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../socket/SocketProvider';

const Dashboard = () => {
  const { user } = useAuth();
  const { connected } = useSocket();
  const [recentAnimals, setRecentAnimals] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, these would be API calls
    // Mock data for demonstration
    const fetchDashboardData = () => {
      setLoading(true);
      
      // Mock animals data
      const mockAnimals = [
        { id: 'a1', name: 'Leo', species: 'African Lion', status: 'healthy', location: 'Lion Habitat', imageUrl: '/assets/images/lion.jpg' },
        { id: 'a2', name: 'Zara', species: 'Giraffe', status: 'medical observation', location: 'Savanna Exhibit', imageUrl: '/assets/images/giraffe.jpg' },
        { id: 'a3', name: 'Pongo', species: 'Orangutan', status: 'healthy', location: 'Primate House', imageUrl: '/assets/images/orangutan.jpg' },
        { id: 'a4', name: 'Bubbles', species: 'Bottlenose Dolphin', status: 'healthy', location: 'Aquatic Center', imageUrl: '/assets/images/dolphin.jpg' },
      ];
      
      // Mock tasks data
      const mockTasks = [
        { id: 't1', title: 'Health check for Leo', priority: 'high', dueDate: '2023-05-28T10:00:00', status: 'pending' },
        { id: 't2', title: 'Administer medication to Zara', priority: 'high', dueDate: '2023-05-26T14:30:00', status: 'pending' },
        { id: 't3', title: 'Habitat cleaning - Primate House', priority: 'medium', dueDate: '2023-05-27T09:00:00', status: 'pending' },
      ];
      
      // Mock alerts data
      const mockAlerts = [
        { id: 'n1', title: 'Temperature alert', message: 'Reptile house temperature dropped below threshold', priority: 'high', timestamp: '2023-05-26T07:45:00' },
        { id: 'n2', title: 'Medical reminder', message: 'Zara requires follow-up assessment', priority: 'medium', timestamp: '2023-05-26T08:15:00' },
        { id: 'n3', title: 'Feeding schedule', message: 'Lion feeding schedule updated', priority: 'low', timestamp: '2023-05-26T08:30:00' },
      ];
      
      setRecentAnimals(mockAnimals);
      setPendingTasks(mockTasks);
      setAlerts(mockAlerts);
      setLoading(false);
    };
    
    fetchDashboardData();
    
    // In a real app, we would set up socket listeners here
    // For example:
    // socket.on('alert:new', (alert) => {
    //   setAlerts(prevAlerts => [alert, ...prevAlerts]);
    // });
    
    return () => {
      // Clean up socket listeners when component unmounts
    };
  }, []);

  // Helper function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  // Helper function to generate status badge
  const getStatusBadgeClass = (status) => {
    switch(status.toLowerCase()) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'medical observation':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to generate priority badge
  const getPriorityBadgeClass = (priority) => {
    switch(priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {user?.name || 'User'}! 
          {connected ? 
            <span className="ml-2 text-green-600 text-sm">● Live updates active</span> : 
            <span className="ml-2 text-red-600 text-sm">● Live updates inactive</span>
          }
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Status Summary Cards */}
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">Animals Under Observation</h2>
              <p className="text-2xl font-bold text-gray-800">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">Pending Tasks</h2>
              <p className="text-2xl font-bold text-gray-800">{pendingTasks.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">Active Alerts</h2>
              <p className="text-2xl font-bold text-gray-800">{alerts.length}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Animals Section */}
        <div className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Recent Animals</h2>
          </div>
          <div className="p-5">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Animal</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Species</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentAnimals.map(animal => (
                    <tr key={animal.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full object-cover" src={animal.imageUrl} alt={animal.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{animal.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{animal.species}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(animal.status)}`}>
                          {animal.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {animal.location}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View all animals →
              </button>
            </div>
          </div>
        </div>
        
        {/* Alerts Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Recent Alerts</h2>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {alerts.map(alert => (
                <div key={alert.id} className="p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityBadgeClass(alert.priority)}`}>
                        {alert.priority}
                      </span>
                      <h3 className="text-sm font-medium text-gray-900 mt-2">{alert.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{alert.message}</p>
                    </div>
                    <div className="text-xs text-gray-400">
                      {formatDate(alert.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View all alerts →
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tasks Section */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Pending Tasks</h2>
        </div>
        <div className="p-5">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingTasks.map(task => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityBadgeClass(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(task.dueDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View all tasks →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;