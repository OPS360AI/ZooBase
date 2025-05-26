import React, { useState, useEffect } from 'react';
// Import the dashboard components
import QuickStats from '../components/dashboard-components/QuickStats';
import RecentAnimalsList from '../components/dashboard-components/RecentAnimalsList';
import AlertsPanel from '../components/dashboard-components/AlertsPanel';
import TasksPanel from '../components/dashboard-components/TasksPanel';
import WeatherWidget from '../components/dashboard-components/WeatherWidget';
import AnimalsChart from '../components/charts/AnimalsChart';
import ActivityChart from '../components/charts/ActivityChart';
import HealthStatusChart from '../components/charts/HealthStatusChart';

/**
 * Dashboard - Main dashboard page for the ZooBase application
 * Displays an overview of zoo operations including stats, charts, and activity feeds
 */
const Dashboard = () => {
  // State for dashboard data
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    // In a real application, this would be an API call
    const fetchDashboardData = async () => {
      try {
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data structure that would come from an API
        const mockData = {
          stats: [
            {
              title: 'Total Animals',
              value: '432',
              change: '+12',
              changeType: 'increase',
              period: 'month',
              icon: '🦁',
            },
            {
              title: 'Pending Tasks',
              value: '28',
              change: '-5',
              changeType: 'decrease',
              period: 'week',
              icon: '📋',
            },
            {
              title: 'Health Alerts',
              value: '8',
              change: '+3',
              changeType: 'increase',
              period: 'week',
              icon: '🚨',
            },
            {
              title: 'Staff Active',
              value: '24',
              change: '0',
              changeType: 'neutral',
              period: 'now',
              icon: '👤',
            },
          ],
          animalsBySpecies: [
            { species: 'Mammals', count: 145 },
            { species: 'Birds', count: 132 },
            { species: 'Reptiles', count: 78 },
            { species: 'Amphibians', count: 43 },
            { species: 'Fish', count: 34 },
          ],
          activityData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
              {
                label: 'Visitors',
                data: [32000, 35000, 40000, 38000, 45000, 50000],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
              },
              {
                label: 'Animal Activity',
                data: [70, 65, 75, 80, 85, 78],
                borderColor: '#ef4444',
                backgroundColor: 'transparent',
                fill: false,
                yAxisID: 'y1',
              },
            ]
          },
          healthData: {
            labels: ['Excellent', 'Good', 'Fair', 'Concerning', 'Critical'],
            datasets: [
              {
                label: 'Animal Health Status',
                data: [210, 160, 42, 15, 5],
                backgroundColor: [
                  'rgba(34, 197, 94, 0.7)',
                  'rgba(59, 130, 246, 0.7)',
                  'rgba(250, 204, 21, 0.7)',
                  'rgba(249, 115, 22, 0.7)',
                  'rgba(239, 68, 68, 0.7)',
                ],
              },
            ],
          },
          recentAnimals: [
            {
              id: 'a1',
              name: 'Luna',
              species: 'Bengal Tiger',
              status: 'Healthy',
              location: 'Tiger Habitat',
              dateAdded: '2023-05-15',
              image: '🐯',
            },
            {
              id: 'a2',
              name: 'Oscar',
              species: 'Bornean Orangutan',
              status: 'Under Observation',
              location: 'Primate House',
              dateAdded: '2023-05-10',
              image: '🦧',
            },
            {
              id: 'a3',
              name: 'Nala',
              species: 'African Elephant',
              status: 'Healthy',
              location: 'Elephant Savanna',
              dateAdded: '2023-05-08',
              image: '🐘',
            },
            {
              id: 'a4',
              name: 'Marlin',
              species: 'Bottlenose Dolphin',
              status: 'Medical Treatment',
              location: 'Marine Exhibit',
              dateAdded: '2023-05-05',
              image: '🐬',
            },
            {
              id: 'a5',
              name: 'Rio',
              species: 'Scarlet Macaw',
              status: 'Healthy',
              location: 'Tropical Aviary',
              dateAdded: '2023-04-28',
              image: '🦜',
            },
          ],
          alerts: [],  // Using default alerts from the AlertsPanel component
          tasks: [],  // Using default tasks from the TasksPanel component
        };
        
        setDashboardData(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Handle view animal click
  const handleViewAnimal = (animalId) => {
    console.log(`View animal with ID: ${animalId}`);
    // In a real app, this would navigate to the animal detail page
  };

  // Handle alert actions
  const handleAlertAction = (alertId, action) => {
    console.log(`Alert ${alertId} action: ${action}`);
    // In a real app, this would perform the requested action
  };

  // Handle task actions
  const handleTaskAction = (taskId, action) => {
    console.log(`Task ${taskId} action: ${action}`);
    // In a real app, this would perform the requested action
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's an overview of your zoo.</p>
      </div>
      
      {/* Quick Stats */}
      <section className="mb-8">
        <QuickStats stats={dashboardData?.stats || []} />
      </section>
      
      {/* Charts Section */}
      <section className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Animal Species Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
          <h3 className="text-gray-800 font-medium mb-4">Animal Distribution</h3>
          <AnimalsChart 
            data={dashboardData?.animalsBySpecies.map(item => ({ species: item.species, count: item.count })) || []}
            height={250}
          />
        </div>
        
        {/* Activity Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 lg:col-span-2">
          <h3 className="text-gray-800 font-medium mb-4">Zoo Activity</h3>
          <ActivityChart 
            labels={dashboardData?.activityData.labels || []}
            datasets={dashboardData?.activityData.datasets || []}
            height={250}
          />
        </div>
      </section>
      
      {/* Health Status Section */}
      <section className="mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
          <h3 className="text-gray-800 font-medium mb-4">Animal Health Status</h3>
          <HealthStatusChart 
            labels={dashboardData?.healthData.labels || []}
            datasets={dashboardData?.healthData.datasets || []}
            height={280}
          />
        </div>
      </section>
      
      {/* Dashboard Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <RecentAnimalsList 
            animals={dashboardData?.recentAnimals || []}
            onViewAnimal={handleViewAnimal}
          />
          <WeatherWidget location="Central Zoo Area" />
        </div>
        
        {/* Middle and Right Columns */}
        <div className="lg:col-span-2 space-y-6">
          <AlertsPanel 
            alerts={dashboardData?.alerts || []}
            onAlertAction={handleAlertAction}
          />
          <TasksPanel 
            tasks={dashboardData?.tasks || []}
            onTaskAction={handleTaskAction}
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
