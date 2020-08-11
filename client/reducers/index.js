import { combineReducers } from 'redux';

// import all reducers here
import marketsReducer from './marketsReducer';

// combine reducers
const reducers = combineReducers({
  // if we had other reducers, they would go here
  markets: marketsReducer,
});

// make the combined reducers available for import
export default reducers;
