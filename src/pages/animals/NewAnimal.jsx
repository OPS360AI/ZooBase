import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ANIMAL_STATUS, ANIMAL_CLASSIFICATIONS } from '../../utils/constants';
import { API_URL } from '../../utils/constants';

const NewAnimal = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [habitats, setHabitats] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    classification: 'Mammals',
    age: '',
    gender: 'male',
    weight: '',
    status: ANIMAL_STATUS.HEALTHY,
    habitat: '',
    dietaryNeeds: '',
    medicalHistory: '',
    notes: '',
    image: ''
  });
  
  const [validation, setValidation] = useState({
    name: true,
    species: true,
    age: true,
    weight: true,
    habitat: true
  });

  useEffect(() => {
    // Fetch available habitats
    const fetchHabitats = async () => {
      try {
        // In a real app, this would fetch from an API
        setHabitats([
          { id: '1', name: 'African Savanna' },
          { id: '2', name: 'Tropical Rainforest' },
          { id: '3', name: 'Desert Biome' },
          { id: '4', name: 'Arctic Tundra' },
          { id: '5', name: 'Wetlands' },
        ]);
      } catch (err) {
        console.error('Error fetching habitats:', err);
        setError('Failed to load habitats. Please try again later.');
      }
    };

    fetchHabitats();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear validation errors as user types
    if (validation[name] === false) {
      setValidation({
        ...validation,
        [name]: true
      });
    }
  };

  const validateForm = () => {
    const newValidation = {
      name: formData.name.trim() !== '',
      species: formData.species.trim() !== '',
      age: formData.age !== '' && !isNaN(formData.age) && Number(formData.age) >= 0,
      weight: formData.weight !== '' && !isNaN(formData.weight) && Number(formData.weight) > 0,
      habitat: formData.habitat !== ''
    };
    
    setValidation(newValidation);
    return Object.values(newValidation).every(isValid => isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setError('Please correct the errors in the form.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // In a real application, this would send data to an API endpoint
      /* Example API call:
      const response = await fetch(`${API_URL}/animals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add animal');
      }
      
      const data = await response.json();
      */
      
      // For demo purposes, just simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to the animal list page after successful submission
      navigate('/animals', { 
        state: { 
          message: `${formData.name} has been successfully added to the zoo!`,
          type: 'success'
        } 
      });
    } catch (err) {
      console.error('Error adding new animal:', err);
      setError('Failed to add animal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Add New Animal</h1>
          <button
            onClick={() => navigate('/animals')}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information Section */}
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-xl font-semibold mb-3 text-gray-700 border-b pb-2">Basic Information</h2>
            </div>
            
            {/* Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  validation.name ? 'border-gray-300 focus:ring-blue-500' : 'border-red-500 focus:ring-red-500'
                }`}
                placeholder="Enter animal name"
              />
              {!validation.name && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
            </div>

            {/* Species */}
            <div className="mb-4">
              <label htmlFor="species" className="block text-gray-700 font-medium mb-2">
                Species <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="species"
                name="species"
                value={formData.species}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  validation.species ? 'border-gray-300 focus:ring-blue-500' : 'border-red-500 focus:ring-red-500'
                }`}
                placeholder="Enter species name"
              />
              {!validation.species && (
                <p className="text-red-500 text-sm mt-1">Species is required</p>
              )}
            </div>

            {/* Classification */}
            <div className="mb-4">
              <label htmlFor="classification" className="block text-gray-700 font-medium mb-2">
                Classification
              </label>
              <select
                id="classification"
                name="classification"
                value={formData.classification}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {ANIMAL_CLASSIFICATIONS.map((classification) => (
                  <option key={classification} value={classification}>
                    {classification}
                  </option>
                ))}
              </select>
            </div>

            {/* Age */}
            <div className="mb-4">
              <label htmlFor="age" className="block text-gray-700 font-medium mb-2">
                Age (years) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="0"
                step="0.1"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  validation.age ? 'border-gray-300 focus:ring-blue-500' : 'border-red-500 focus:ring-red-500'
                }`}
                placeholder="Enter age in years"
              />
              {!validation.age && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid age</p>
              )}
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">
                Gender
              </label>
              <div className="flex space-x-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Female</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="unknown"
                    checked={formData.gender === 'unknown'}
                    onChange={handleChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Unknown</span>
                </label>
              </div>
            </div>

            {/* Weight */}
            <div className="mb-4">
              <label htmlFor="weight" className="block text-gray-700 font-medium mb-2">
                Weight (kg) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                min="0"
                step="0.1"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  validation.weight ? 'border-gray-300 focus:ring-blue-500' : 'border-red-500 focus:ring-red-500'
                }`}
                placeholder="Enter weight in kg"
              />
              {!validation.weight && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid weight</p>
              )}
            </div>

            {/* Health & Habitat Section */}
            <div className="col-span-1 md:col-span-2 mt-4">
              <h2 className="text-xl font-semibold mb-3 text-gray-700 border-b pb-2">Health & Habitat</h2>
            </div>

            {/* Status */}
            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
                Health Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={ANIMAL_STATUS.HEALTHY}>Healthy</option>
                <option value={ANIMAL_STATUS.OBSERVATION}>Under Observation</option>
                <option value={ANIMAL_STATUS.TREATMENT}>Under Treatment</option>
                <option value={ANIMAL_STATUS.QUARANTINE}>Quarantine</option>
                <option value={ANIMAL_STATUS.CRITICAL}>Critical</option>
              </select>
            </div>

            {/* Habitat */}
            <div className="mb-4">
              <label htmlFor="habitat" className="block text-gray-700 font-medium mb-2">
                Habitat <span className="text-red-500">*</span>
              </label>
              <select
                id="habitat"
                name="habitat"
                value={formData.habitat}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  validation.habitat ? 'border-gray-300 focus:ring-blue-500' : 'border-red-500 focus:ring-red-500'
                }`}
              >
                <option value="">Select a habitat</option>
                {habitats.map((habitat) => (
                  <option key={habitat.id} value={habitat.id}>
                    {habitat.name}
                  </option>
                ))}
              </select>
              {!validation.habitat && (
                <p className="text-red-500 text-sm mt-1">Please select a habitat</p>
              )}
            </div>

            {/* Additional Information */}
            <div className="col-span-1 md:col-span-2 mt-4">
              <h2 className="text-xl font-semibold mb-3 text-gray-700 border-b pb-2">Additional Information</h2>
            </div>

            {/* Dietary Needs */}
            <div className="mb-4">
              <label htmlFor="dietaryNeeds" className="block text-gray-700 font-medium mb-2">
                Dietary Needs
              </label>
              <textarea
                id="dietaryNeeds"
                name="dietaryNeeds"
                value={formData.dietaryNeeds}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter dietary requirements"
              ></textarea>
            </div>

            {/* Medical History */}
            <div className="mb-4">
              <label htmlFor="medicalHistory" className="block text-gray-700 font-medium mb-2">
                Medical History
              </label>
              <textarea
                id="medicalHistory"
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter medical history"
              ></textarea>
            </div>

            {/* Additional Notes */}
            <div className="col-span-1 md:col-span-2 mb-4">
              <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter any additional notes"
              ></textarea>
            </div>

            {/* Image Upload (placeholder - would need additional functionality for real implementation) */}
            <div className="col-span-1 md:col-span-2 mb-6">
              <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                Animal Image
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    // In a real app, this would handle file upload
                    console.log('File selected:', e.target.files[0]);
                    // For demo, just store the file name
                    if (e.target.files[0]) {
                      setFormData({
                        ...formData,
                        image: e.target.files[0].name
                      });
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('image').click()}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Choose File
                </button>
                <span className="text-gray-500">
                  {formData.image ? formData.image : 'No file chosen'}
                </span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Adding Animal...' : 'Add Animal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAnimal;