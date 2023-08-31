// reducers/index.js

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  counter: {count: 0},
  // Add more reducers here
});

export default rootReducer;
