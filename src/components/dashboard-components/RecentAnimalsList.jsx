import React from 'react';

/**
 * RecentAnimalsList - Component displaying a list of recently added or updated animals
 * 
 * @param {Object} props - Component props
 * @param {Array} props.animals - Array of animal objects to display
 * @param {number} props.limit - Maximum number of animals to show
 * @param {Function} props.onViewAnimal - Callback when an animal is clicked
 */
const RecentAnimalsList = ({ animals = [], limit = 5, onViewAnimal }) => {
  // Example default data if none is provided
  const defaultAnimals = [
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
  ];

  // Use provided animals or fall back to defaults
  const displayAnimals = animals.length > 0 ? animals.slice(0, limit) : defaultAnimals.slice(0, limit);

  // Helper to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Helper to get status badge class
  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'under observation':
        return 'bg-yellow-100 text-yellow-800';
      case 'medical treatment':
      case 'treatment':
        return 'bg-red-100 text-red-800';
      case 'new':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-md font-semibold text-gray-800">Recent Animals</h3>
        <button 
          className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
          onClick={() => console.log('View all animals clicked')}
        >
          <span>View all</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
      
      <ul className="divide-y divide-gray-100">
        {displayAnimals.map((animal) => (
          <li 
            key={animal.id} 
            className="px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onViewAnimal && onViewAnimal(animal.id)}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                {animal.image || '🦁'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {animal.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {animal.species}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span 
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(animal.status)}`}
                >
                  {animal.status}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  {formatDate(animal.dateAdded)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      
      {displayAnimals.length === 0 && (
        <div className="py-8 px-5 text-center">
          <p className="text-gray-500">No recent animals to display</p>
        </div>
      )}
    </div>
  );
};

export default RecentAnimalsList;
