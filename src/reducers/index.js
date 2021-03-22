import { combineReducers } from 'redux';
import dataReducer from './dataReducer';

const rootReducer = combineReducers({
  api: dataReducer,
});

export default rootReducer;
