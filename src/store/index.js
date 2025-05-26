import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { combineReducers } from 'redux';

// Import slices here
// Example:
// import authReducer from './slices/authSlice';
// import animalReducer from './slices/animalSlice';

// Create a root reducer
const rootReducer = combineReducers({
  // Add reducers here
  // auth: authReducer,
  // animals: animalReducer,
  
  // For now, use an empty reducer since we haven't created slices yet
  empty: (state = {}, action) => state
});

// Configure the store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types to avoid serialization errors with date objects, etc.
        ignoredActions: ['animals/setFilters', 'observations/addMedia'],
        ignoredPaths: ['animals.currentAnimal.dateOfBirth']
      },
    }),
  devTools: true, // Enable dev tools in development mode
});

// Enable listener behavior for the store
setupListeners(store.dispatch);

export default store;

// Example slice structure for future implementation:
/*
import { createSlice } from '@reduxjs/toolkit';

const animalSlice = createSlice({
  name: 'animals',
  initialState: {
    animals: [],
    currentAnimal: null,
    loading: false,
    error: null,
    filters: {
      species: [],
      status: [],
      habitat: []
    }
  },
  reducers: {
    fetchAnimalsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAnimalsSuccess(state, action) {
      state.animals = action.payload;
      state.loading = false;
    },
    fetchAnimalsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentAnimal(state, action) {
      state.currentAnimal = action.payload;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    }
  }
});

export const { 
  fetchAnimalsStart,
  fetchAnimalsSuccess,
  fetchAnimalsFail,
  setCurrentAnimal,
  setFilters
} = animalSlice.actions;

export default animalSlice.reducer;
*/