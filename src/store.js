// store.js

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Import your combined reducers

const store = configureStore({
  reducer: rootReducer,
  // Add the devTools option to enable Redux DevTools
  devTools: process.env.NODE_ENV !== 'production', // Enable only in development
});

export default store;
