import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSocket } from '../../socket/SocketProvider';
import api from '../../services/api';
import { ANIMAL_STATUS } from '../../utils/constants';

const AnimalDetail = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [observations, setObservations] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const { socket, connected, subscribeToAnimal } = useSocket();

  // Fetch animal data
  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // const response = await api.getAnimal(id);
        // const animalData = response.data;
        
        // Mock data for development
        const animalData = {
          id,
          name: 'Leo',
          species: 'African Lion',
          commonName: 'Lion',
          scientificName: 'Panthera leo',
          taxon: { class: 'Mammalia', order: 'Carnivora', family: 'Felidae' },
          dateOfBirth: '2018-06-12T00:00:00.000Z',
          sex: 'Male',
          weight: 180, // kg
          height: 1.2, // m
          length: 2.1, // m
          identifiers: {
            microchip: '985121056488909',
            tagNumber: 'L-2018-001',
          },
          status: ANIMAL_STATUS.HEALTHY,
          diet: 'Carnivore - Raw meat diet with occasional bone supplements',
          dailyFoodIntake: '8-10 kg of meat',
          origin: 'Born in captivity - New York Zoo',
          acquisitionDate: '2020-03-15T00:00:00.000Z',
          location: { 
            habitat: 'Lion Habitat', 
            area: 'Predator Zone',
            enclosureId: 'PZ-001' 
          },
          temperament: 'Generally calm, shows dominance during feeding',
          trainingStatus: 'Responds to basic keeper commands, crate trained',
          reproductiveStatus: 'Intact male, part of breeding program',
          parent: {
            father: {
              id: 'a20',
              name: 'Mufasa',
              alive: true
            },
            mother: {
              id: 'a21',
              name: 'Sarabi',
              alive: false
            }
          },
          imageUrl: '/assets/images/lion.jpg',
          images: [
            { id: 'img1', url: '/assets/images/lion_1.jpg', caption: 'Front view', date: '2022-10-15T00:00:00.000Z' },
            { id: 'img2', url: '/assets/images/lion_2.jpg', caption: 'Profile', date: '2022-10-15T00:00:00.000Z' },
            { id: 'img3', url: '/assets/images/lion_3.jpg', caption: 'Resting', date: '2023-01-23T00:00:00.000Z' },
          ]
        };
        
        setAnimal(animalData);
        
        // Mock observations data
        const mockObservations = [
          { 
            id: 'obs1', 
            timestamp: '2023-05-20T09:15:00.000Z',
            observer: { id: 'u1', name: 'John Smith', role: 'Zookeeper' },
            type: 'behavioral',
            notes: 'Displaying normal feeding behavior, consumed entire daily ration without hesitation.',
            tags: ['feeding', 'normal-behavior']
          },
          { 
            id: 'obs2', 
            timestamp: '2023-05-18T14:30:00.000Z',
            observer: { id: 'u2', name: 'Sarah Jones', role: 'Veterinarian' },
            type: 'medical',
            notes: 'Visual examination shows good coat condition, clear eyes. No signs of distress or illness.',
            tags: ['visual-exam', 'healthy']
          },
          { 
            id: 'obs3', 
            timestamp: '2023-05-15T11:45:00.000Z',
            observer: { id: 'u1', name: 'John Smith', role: 'Zookeeper' },
            type: 'environmental',
            notes: 'Interacted well with enrichment items. Spent approximately 30 minutes engaging with scent markers.',
            tags: ['enrichment', 'positive-response']
          },
        ];
        
        // Mock medical records
        const mockMedicalRecords = [
          {
            id: 'med1',
            date: '2023-04-10T10:00:00.000Z',
            veterinarian: { id: 'v1', name: 'Dr. Emily Carter' },
            type: 'Routine Examination',
            findings: 'Annual health check. All vital signs normal. Weight: 182 kg.',
            treatments: 'Administered annual vaccinations per protocol.',
            followUp: 'Next annual exam due April 2024.'
          },
          {
            id: 'med2',
            date: '2023-01-15T14:15:00.000Z',
            veterinarian: { id: 'v2', name: 'Dr. Michael Wong' },
            type: 'Dental Examination',
            findings: 'Minor tartar buildup on upper canines. No signs of dental disease or cavities.',
            treatments: 'Dental cleaning performed under sedation.',
            followUp: 'Monitor during routine feedings for any signs of discomfort.'
          },
          {
            id: 'med3',
            date: '2022-10-05T09:30:00.000Z',
            veterinarian: { id: 'v1', name: 'Dr. Emily Carter' },
            type: 'Blood Work',
            findings: 'All blood parameters within normal ranges for age and species.',
            treatments: 'None required.',
            followUp: 'Routine bloodwork in 6 months.'
          },
        ];
        
        setObservations(mockObservations);
        setMedicalRecords(mockMedicalRecords);
        
        // Subscribe to real-time updates for this animal
        if (connected) {
          subscribeToAnimal(id);
        }
        
      } catch (err) {
        console.error('Error fetching animal details:', err);
        setError('Failed to load animal details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnimalData();
    
    // Set up socket listeners if connected
    if (socket && connected) {
      socket.on('animal:updated', (updatedAnimal) => {
        if (updatedAnimal.id === id) {
          setAnimal(prevAnimal => ({ ...prevAnimal, ...updatedAnimal }));
        }
      });
      
      socket.on('observation:created', (newObservation) => {
        if (newObservation.animalId === id) {
          setObservations(prev => [newObservation, ...prev]);
        }
      });
      
      socket.on('medical:updated', (newRecord) => {
        if (newRecord.animalId === id) {
          setMedicalRecords(prev => [newRecord, ...prev]);
        }
      });
      
      // Clean up on component unmount
      return () => {
        socket.off('animal:updated');
        socket.off('observation:created');
        socket.off('medical:updated');
      };
    }
  }, [id, socket, connected, subscribeToAnimal]);
  
  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  // Format time helper
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Calculate age helper
  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--;
      months = 12 + months;
    }
    
    return `${years} years, ${months} months`;
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

  if (!animal) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-600">Animal not found</p>
        <Link to="/animals" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
          ← Back to Animals
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back navigation */}
      <Link to="/animals" className="text-blue-600 hover:text-blue-800 flex items-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Animals
      </Link>
      
      {/* Animal Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img 
              className="h-48 w-full object-cover md:w-48"
              src={animal.imageUrl} 
              alt={animal.name} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/images/animal-placeholder.jpg';
              }}
            />
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900 mr-3">{animal.name}</h1>
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusBadgeClass(animal.status)}`}>
                    {animal.status}
                  </span>
                  {connected && (
                    <span className="ml-2 text-green-500 text-xs">● Live Updates</span>
                  )}
                </div>
                <p className="text-gray-600 mt-1">{animal.scientificName}</p>
                <p className="text-sm text-gray-500 mt-1">{animal.species} ({animal.commonName})</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-md text-sm font-medium flex items-center"
                  onClick={() => alert('Edit functionality would be implemented here.')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit
                </button>
                <button 
                  className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-1 rounded-md text-sm font-medium flex items-center"
                  onClick={() => alert('Print functionality would be implemented here.')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                  </svg>
                  Print
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm font-medium text-gray-500">ID/Microchip</p>
                <p className="text-sm text-gray-900">{animal.identifiers.microchip}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Tag Number</p>
                <p className="text-sm text-gray-900">{animal.identifiers.tagNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Sex</p>
                <p className="text-sm text-gray-900">{animal.sex}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                <p className="text-sm text-gray-900">{formatDate(animal.dateOfBirth)} ({calculateAge(animal.dateOfBirth)})</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 mt-6">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'observations' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('observations')}
          >
            Observations ({observations.length})
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'medical' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('medical')}
          >
            Medical Records ({medicalRecords.length})
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'gallery' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('gallery')}
          >
            Gallery ({animal.images?.length || 0})
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="mt-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 border-b pb-2">Basic Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Species</p>
                    <p className="text-sm text-gray-900">{animal.species}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Common Name</p>
                    <p className="text-sm text-gray-900">{animal.commonName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Scientific Name</p>
                    <p className="text-sm text-gray-900">{animal.scientificName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Class</p>
                    <p className="text-sm text-gray-900">{animal.taxon.class}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Order</p>
                    <p className="text-sm text-gray-900">{animal.taxon.order}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Family</p>
                    <p className="text-sm text-gray-900">{animal.taxon.family}</p>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-3 border-b pb-2 mt-6">Physical Characteristics</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Weight</p>
                    <p className="text-sm text-gray-900">{animal.weight} kg</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Height</p>
                    <p className="text-sm text-gray-900">{animal.height} m</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Length</p>
                    <p className="text-sm text-gray-900">{animal.length} m</p>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-3 border-b pb-2 mt-6">Lineage</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Father</p>
                    <p className="text-sm text-gray-900">
                      {animal.parent?.father ? (
                        <span>{animal.parent.father.name} {!animal.parent.father.alive && '(Deceased)'}</span>
                      ) : 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Mother</p>
                    <p className="text-sm text-gray-900">
                      {animal.parent?.mother ? (
                        <span>{animal.parent.mother.name} {!animal.parent.mother.alive && '(Deceased)'}</span>
                      ) : 'Unknown'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 border-b pb-2">Location & Origin</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Current Habitat</p>
                    <p className="text-sm text-gray-900">{animal.location.habitat}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Area</p>
                    <p className="text-sm text-gray-900">{animal.location.area}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Enclosure ID</p>
                    <p className="text-sm text-gray-900">{animal.location.enclosureId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Origin</p>
                    <p className="text-sm text-gray-900">{animal.origin}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Acquisition Date</p>
                    <p className="text-sm text-gray-900">{formatDate(animal.acquisitionDate)}</p>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-3 border-b pb-2 mt-6">Diet & Nutrition</h3>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Diet Type</p>
                    <p className="text-sm text-gray-900">{animal.diet}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Daily Food Intake</p>
                    <p className="text-sm text-gray-900">{animal.dailyFoodIntake}</p>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-3 border-b pb-2 mt-6">Behavioral Information</h3>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Temperament</p>
                    <p className="text-sm text-gray-900">{animal.temperament}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Training Status</p>
                    <p className="text-sm text-gray-900">{animal.trainingStatus}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Reproductive Status</p>
                    <p className="text-sm text-gray-900">{animal.reproductiveStatus}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Observations Tab */}
        {activeTab === 'observations' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Observations</h3>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded-md flex items-center text-sm"
                onClick={() => alert('Add observation functionality would be implemented here.')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Observation
              </button>
            </div>
            
            {observations.length > 0 ? (
              <div className="space-y-4">
                {observations.map((obs, index) => (
                  <div 
                    key={obs.id} 
                    className={`bg-white shadow-md rounded-lg p-4 border ${index === 0 && socket && connected ? 'border-blue-300 ring-1 ring-blue-200' : 'border-gray-200'} transition-all duration-300`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <span className="text-gray-900 font-medium">{obs.type}</span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-gray-500 text-sm">{formatDateTime(obs.timestamp)}</span>
                          {index === 0 && socket && connected && (
                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Live</span>
                          )}
                        </div>
                        <p className="text-gray-700 mt-2">{obs.notes}</p>
                        {obs.tags && obs.tags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {obs.tags.map((tag, idx) => (
                              <span 
                                key={idx}
                                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <p>By: {obs.observer.name}</p>
                        <p className="text-xs">{obs.observer.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-500">No observations recorded yet</p>
                {socket && connected && (
                  <p className="text-xs text-green-600 mt-2">✓ Live updates enabled</p>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Medical Records Tab */}
        {activeTab === 'medical' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Medical Records</h3>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded-md flex items-center text-sm"
                onClick={() => alert('Add medical record functionality would be implemented here.')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Record
              </button>
            </div>
            
            {medicalRecords.length > 0 ? (
              <div className="space-y-4">
                {medicalRecords.map((record, index) => (
                  <div 
                    key={record.id} 
                    className={`bg-white shadow-md rounded-lg p-4 border ${index === 0 && socket && connected ? 'border-blue-300 ring-1 ring-blue-200' : 'border-gray-200'} transition-all duration-300`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <span className="text-gray-900 font-medium">{record.type}</span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-gray-500 text-sm">{formatDateTime(record.date)}</span>
                          {index === 0 && socket && connected && (
                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Live</span>
                          )}
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-500">Findings</p>
                          <p className="text-sm text-gray-700">{record.findings}</p>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-500">Treatments</p>
                          <p className="text-sm text-gray-700">{record.treatments}</p>
                        </div>
                        {record.followUp && (
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-500">Follow-up</p>
                            <p className="text-sm text-gray-700">{record.followUp}</p>
                          </div>
                        )}
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <p>Vet: {record.veterinarian.name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-500">No medical records available</p>
                {socket && connected && (
                  <p className="text-xs text-green-600 mt-2">✓ Live updates enabled</p>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Image Gallery</h3>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded-md flex items-center text-sm"
                onClick={() => alert('Add image functionality would be implemented here.')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Image
              </button>
            </div>
            
            {animal.images && animal.images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {animal.images.map(image => (
                  <div key={image.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={image.caption} 
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/images/image-placeholder.jpg';
                      }}
                    />
                    <div className="p-3">
                      <p className="text-gray-700 text-sm">{image.caption}</p>
                      <p className="text-gray-500 text-xs mt-1">{formatDate(image.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-500">No images available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalDetail;