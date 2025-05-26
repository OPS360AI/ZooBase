import React, { useState, useEffect } from 'react';

/**
 * WeatherWidget - Component displaying weather information for the zoo
 * 
 * @param {Object} props - Component props
 * @param {Object} props.data - Weather data if available
 * @param {string} props.location - Location name to display
 */
const WeatherWidget = ({ data = null, location = 'Zoo Location' }) => {
  const [weatherData, setWeatherData] = useState(data);

  // Create example weather data if none is provided
  useEffect(() => {
    if (!data) {
      // Mock data for demonstration
      const mockData = {
        location: location,
        current: {
          temp: 72,
          feels_like: 74,
          humidity: 65,
          wind_speed: 5.2,
          condition: 'Partly Cloudy',
          icon: '⛅',
        },
        forecast: [
          { day: 'Today', temp: 72, condition: 'Partly Cloudy', icon: '⛅' },
          { day: 'Tomorrow', temp: 68, condition: 'Rain', icon: '🌧️' },
          { day: 'Wed', temp: 75, condition: 'Sunny', icon: '☀️' },
          { day: 'Thu', temp: 71, condition: 'Partly Cloudy', icon: '⛅' },
          { day: 'Fri', temp: 73, condition: 'Sunny', icon: '☀️' },
        ],
        daily_range: {
          min: 67,
          max: 78
        }
      };
      setWeatherData(mockData);
    }
  }, [data, location]);

  if (!weatherData) {
    return (
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 flex justify-center items-center">
        <p className="text-gray-500">Loading weather data...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-md font-semibold text-gray-800">Weather Conditions</h3>
      </div>
      
      <div className="p-5">
        {/* Current Weather */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">{weatherData.location}</p>
            <div className="flex items-baseline mt-1">
              <span className="text-3xl font-bold text-gray-900">{weatherData.current.temp}°</span>
              <span className="ml-2 text-sm text-gray-600">Feels like {weatherData.current.feels_like}°</span>
            </div>
            <p className="text-gray-700 mt-1">{weatherData.current.condition}</p>
          </div>
          <div className="text-5xl">
            {weatherData.current.icon}
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-4 mt-5">
          <div className="bg-gray-50 rounded p-3">
            <p className="text-xs text-gray-500">Humidity</p>
            <p className="text-lg font-semibold mt-1">{weatherData.current.humidity}%</p>
          </div>
          <div className="bg-gray-50 rounded p-3">
            <p className="text-xs text-gray-500">Wind Speed</p>
            <p className="text-lg font-semibold mt-1">{weatherData.current.wind_speed} mph</p>
          </div>
        </div>
        
        {/* Daily Range */}
        <div className="mt-5">
          <p className="text-xs text-gray-500 mb-1">Today's Range</p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{weatherData.daily_range.min}°</span>
            <div className="flex-1 mx-2 h-1.5 bg-gradient-to-r from-blue-300 to-orange-300 rounded-full"></div>
            <span className="text-sm font-medium">{weatherData.daily_range.max}°</span>
          </div>
        </div>
        
        {/* Forecast */}
        <div className="mt-5">
          <p className="text-xs text-gray-500 mb-2">5-Day Forecast</p>
          <div className="flex justify-between">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="text-center">
                <p className="text-xs font-medium text-gray-700">{day.day}</p>
                <div className="text-lg my-1">{day.icon}</div>
                <p className="text-sm font-medium">{day.temp}°</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 text-center">
        <button 
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          onClick={() => console.log('View detailed forecast')}
        >
          View Detailed Forecast
        </button>
      </div>
    </div>
  );
};

export default WeatherWidget;
