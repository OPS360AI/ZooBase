import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSocket } from '../../socket/SocketProvider';
import api from '../../services/api';
import { ANIMAL_STATUS } from '../../utils/constants';

const AnimalList = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    species: '',
    status: '',
    location: '',
    search: ''
  });
  const { socket, connected, subscribeToAnimal } = useSocket();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // const response = await api.getAnimals(filters);
        // const animalsData = response.data;
        
        // Mock data for development
        const animalsData = [
          { 
            id: 'a1', 
            name: 'Leo', 
            species: 'African Lion', 
            taxon: { class: 'Mammalia', order: 'Carnivora', family: 'Felidae' },
            dateOfBirth: '2018-06-12T00:00:00.000Z',
            sex: 'Male',
            status: ANIMAL_STATUS.HEALTHY, 
            location: { habitat: 'Lion Habitat', area: 'Predator Zone' },
            imageUrl: '/assets/images/lion.jpg' 
          },
          { 
            id: 'a2', 
            name: 'Zara', 
            species: 'Giraffe', 
            taxon: { class: 'Mammalia', order: 'Artiodactyla', family: 'Giraffidae' },
            dateOfBirth: '2017-03-22T00:00:00.000Z',
            sex: 'Female',
            status: ANIMAL_STATUS.OBSERVATION, 
            location: { habitat: 'Savanna Exhibit', area: 'Herbivore Section' },
            imageUrl: '/assets/images/giraffe.jpg' 
          },
          { 
            id: 'a3', 
            name: 'Pongo', 
            species: 'Orangutan', 
            taxon: { class: 'Mammalia', order: 'Primates', family: 'Hominidae' },
            dateOfBirth: '2015-09-10T00:00:00.000Z',
            sex: 'Male',
            status: ANIMAL_STATUS.HEALTHY, 
            location: { habitat: 'Primate House', area: 'Great Apes Section' },
            imageUrl: '/assets/images/orangutan.jpg' 
          },
          { 
            id: 'a4', 
            name: 'Bubbles', 
            species: 'Bottlenose Dolphin', 
            taxon: { class: 'Mammalia', order: 'Cetacea', family: 'Delphinidae' },
            dateOfBirth: '2019-11-05T00:00:00.000Z',
            sex: 'Female',
            status: ANIMAL_STATUS.HEALTHY, 
            location: { habitat: 'Aquatic Center', area: 'Marine Mammals' },
            imageUrl: '/assets/images/dolphin.jpg' 
          },
          { 
            id: 'a5', 
            name: 'Kaa', 
            species: 'Burmese Python', 
            taxon: { class: 'Reptilia', order: 'Squamata', family: 'Pythonidae' },
            dateOfBirth: '2016-07-15T00:00:00.000Z',
            sex: 'Female',
            status: ANIMAL_STATUS.QUARANTINE, 
            location: { habitat: 'Reptile House', area: 'Serpents Section' },
            imageUrl: '/assets/images/python.jpg' 
          },
          { 
            id: 'a6', 
            name: 'Oscar', 
            species: 'Ostrich', 
            taxon: { class: 'Aves', order: 'Struthioniformes', family: 'Struthionidae' },
            dateOfBirth: '2020-02-14T00:00:00.000Z',
            sex: 'Male',
            status: ANIMAL_STATUS.TREATMENT, 
            location: { habitat: 'African Plains', area: 'Bird Section' },
            imageUrl: '/assets/images/ostrich.jpg' 
          },
        ];
        
        // Filter animals based on search/filter criteria
        const filteredAnimals = animalsData.filter(animal => {
          const matchesSpecies = !filters.species || animal.species.toLowerCase().includes(filters.species.toLowerCase());
          const matchesStatus = !filters.status || animal.status.toLowerCase() === filters.status.toLowerCase();
          const matchesLocation = !filters.location || 
            (animal.location?.habitat?.toLowerCase().includes(filters.location.toLowerCase()) || 
             animal.location?.area?.toLowerCase().includes(filters.location.toLowerCase()));
          const matchesSearch = !filters.search || 
            animal.name.toLowerCase().includes(filters.search.toLowerCase()) || 
            animal.species.toLowerCase().includes(filters.search.toLowerCase());
          
          return matchesSpecies && matchesStatus && matchesLocation && matchesSearch;
        });
        
        setAnimals(filteredAnimals);
        
        // Subscribe to real-time updates for each animal
        if (connected) {
          filteredAnimals.forEach(animal => {
            subscribeToAnimal(animal.id);
          });
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching animals:', err);
        setError('Failed to load animals. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnimals();
    
    // Set up socket listeners if connected
    if (socket && connected) {
      socket.on('animal:updated', (updatedAnimal) => {
        setAnimals(prevAnimals => 
          prevAnimals.map(animal => 
            animal.id === updatedAnimal.id ? { ...animal, ...updatedAnimal } : animal
          )
        );
      });
      
      // Clean up on component unmount
      return () => {
        socket.off('animal:updated');
      };
    }
  }, [filters, socket, connected, subscribeToAnimal]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilters({
      species: '',
      status: '',
      location: '',
      search: ''
    });
  };
  
  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  // Get status badge class based on animal status
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case ANIMAL_STATUS.HEALTHY:
        return 'bg-green-100 text-green-800';
      case ANIMAL_STATUS.OBSERVATION:
        return 'bg-yellow-100 text-yellow-800';
      case ANIMAL_STATUS.CRITICAL:
        return 'bg-red-100 text-red-800';
      case ANIMAL_STATUS.QUARANTINE:
        return 'bg-purple-100 text-purple-800';
      case ANIMAL_STATUS.TREATMENT:
        return 'bg-blue-100 text-blue-800';
      case ANIMAL_STATUS.DECEASED:
        return 'bg-gray-100 text-gray-800';
      case ANIMAL_STATUS.TRANSFERRED:
        return 'bg-indigo-100 text-indigo-800';
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

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
        <p>{error}</p>
        <button 
          className="mt-2 bg-red-200 hover:bg-red-300 text-red-800 py-1 px-3 rounded"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Animals</h1>
        <Link
          to="/animals/new"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Animal
        </Link>
      </div>
      
      {/* Filters section */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by name or species"
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Species</label>
            <input
              type="text"
              name="species"
              value={filters.species}
              onChange={handleFilterChange}
              placeholder="Filter by species"
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              <option value={ANIMAL_STATUS.HEALTHY}>Healthy</option>
              <option value={ANIMAL_STATUS.OBSERVATION}>Under Observation</option>
              <option value={ANIMAL_STATUS.CRITICAL}>Critical</option>
              <option value={ANIMAL_STATUS.QUARANTINE}>Quarantine</option>
              <option value={ANIMAL_STATUS.TREATMENT}>Under Treatment</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Filter by location"
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="col-span-1 md:col-span-2 lg:col-span-5 flex justify-end">
            <button
              onClick={resetFilters}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
      
      {/* Animals grid */}
      {animals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {animals.map(animal => (
            <Link key={animal.id} to={`/animals/${animal.id}`} className="animal-card">
              <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={animal.imageUrl} 
                    alt={animal.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/images/animal-placeholder.jpg';
                    }}
                  />
                  <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(animal.status)}`}>
                    {animal.status}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{animal.name}</h3>
                  <p className="text-gray-600">{animal.species}</p>
                  <div className="mt-2 flex justify-between text-sm text-gray-500">
                    <span>DOB: {formatDate(animal.dateOfBirth)}</span>
                    <span>{animal.sex}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 truncate">
                    {animal.location?.habitat || 'Unknown Location'}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 text-center rounded-lg shadow-sm border border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No animals found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
          <button
            onClick={resetFilters}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AnimalList;