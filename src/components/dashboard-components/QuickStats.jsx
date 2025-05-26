import React from 'react';

/**
 * QuickStats - Component displaying key statistics in card format
 * 
 * @param {Object} props - Component props
 * @param {Array<Object>} props.stats - Array of statistic objects to display
 */
const QuickStats = ({ stats = [] }) => {
  // Default stats if none are provided
  const defaultStats = [
    {
      title: 'Total Animals',
      value: '432',
      change: '+12',
      changeType: 'increase', // 'increase', 'decrease', or 'neutral'
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
  ];

  // Use provided stats or fall back to defaults
  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {displayStats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-700 font-medium text-sm">{stat.title}</h3>
            <div className="text-2xl bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center">
              <span role="img" aria-label={stat.title}>{stat.icon}</span>
            </div>
          </div>
          
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
            <div className="ml-4">
              {stat.changeType !== 'neutral' ? (
                <span 
                  className={`inline-flex items-center text-xs font-medium ${stat.changeType === 'increase' ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'} px-2 py-0.5 rounded`}
                >
                  {stat.change}
                  {stat.changeType === 'increase' ? (
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  )}
                </span>
              ) : (
                <span className="inline-flex items-center text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                  {stat.change}
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14"></path>
                  </svg>
                </span>
              )}
            </div>
          </div>
          
          <p className="text-gray-500 text-xs mt-2">
            {stat.period === 'now' ? 'Currently' : `Past ${stat.period}`}
          </p>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
