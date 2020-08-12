import {
  combineReducers
} from 'redux';

// import all reducers here
// import marketsReducer from './marketsReducer';
import {
  socketReducer
} from './socketReducer';
import {
  nodeReducer
} from './nodeReducer'

// combine reducers
const reducers = combineReducers({
  // if we had other reducers, they would go here
  // markets: marketsReducer,
  socket: socketReducer,
  node: nodeReducer,
});

// make the combined reducers available for import
export default reducers;