import React from 'react';

/**
 * AlertsPanel - Component displaying important alerts and notifications
 * 
 * @param {Object} props - Component props
 * @param {Array} props.alerts - Array of alert objects to display
 * @param {Function} props.onAlertAction - Callback when an alert action is taken
 */
const AlertsPanel = ({ alerts = [], onAlertAction }) => {
  // Example default alerts if none are provided
  const defaultAlerts = [
    {
      id: 'alert1',
      title: 'Health Check Required',
      description: 'Tiger "Luna" is due for monthly health assessment',
      type: 'warning',
      timestamp: '2023-05-15T10:30:00Z',
      priority: 'high',
    },
    {
      id: 'alert2',
      title: 'Temperature Alert',
      description: 'Penguin habitat temperature is above normal range',
      type: 'danger',
      timestamp: '2023-05-15T09:45:00Z',
      priority: 'critical',
    },
    {
      id: 'alert3',
      title: 'Feeding Schedule Updated',
      description: 'Giraffe feeding schedule has been modified',
      type: 'info',
      timestamp: '2023-05-14T15:20:00Z',
      priority: 'low',
    },
    {
      id: 'alert4',
      title: 'Maintenance Complete',
      description: 'Aquarium filtration system maintenance completed',
      type: 'success',
      timestamp: '2023-05-14T11:10:00Z',
      priority: 'normal',
    },
  ];

  // Use provided alerts or fall back to defaults
  const displayAlerts = alerts.length > 0 ? alerts : defaultAlerts;

  // Helper to format relative time
  const getRelativeTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays}d ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths}mo ago`;
  };
  
  // Helper to get alert style based on type
  const getAlertStyle = (type) => {
    switch(type) {
      case 'danger':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };
  
  // Helper to get alert icon based on type
  const getAlertIcon = (type) => {
    switch(type) {
      case 'danger':
        return (
          <div className="flex-shrink-0 bg-red-100 rounded-full p-2">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="flex-shrink-0 bg-yellow-100 rounded-full p-2">
            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        );
      case 'success':
        return (
          <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        );
      case 'info':
        return (
          <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex-shrink-0 bg-gray-100 rounded-full p-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        );
    }
  };
  
  // Helper to get priority badge style
  const getPriorityBadgeStyle = (priority) => {
    switch(priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-md font-semibold text-gray-800">Alerts & Notifications</h3>
        <button 
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          onClick={() => console.log('Mark all as read')}
        >
          Mark all as read
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {displayAlerts.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {displayAlerts.map((alert) => (
              <li 
                key={alert.id} 
                className={`px-5 py-4 ${getAlertStyle(alert.type)} border-l-4 border-${alert.type === 'danger' ? 'red' : alert.type === 'warning' ? 'yellow' : alert.type === 'success' ? 'green' : 'blue'}-400`}
              >
                <div className="flex">
                  {getAlertIcon(alert.type)}
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                      <span className="text-xs text-gray-500">{getRelativeTime(alert.timestamp)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                    <div className="mt-2 flex items-center space-x-4">
                      <span 
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityBadgeStyle(alert.priority)}`}
                      >
                        {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)}
                      </span>
                      <button 
                        className="text-xs font-medium text-blue-600 hover:text-blue-800"
                        onClick={() => onAlertAction && onAlertAction(alert.id, 'view')}
                      >
                        View
                      </button>
                      <button 
                        className="text-xs font-medium text-gray-600 hover:text-gray-800"
                        onClick={() => onAlertAction && onAlertAction(alert.id, 'dismiss')}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-8 px-5 text-center">
            <p className="text-gray-500">No alerts to display</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;
