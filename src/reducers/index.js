import { combineReducers } from 'redux';
import basketReducer from './basketReducer';
import userReducer from './userReducer';

const allReducers = combineReducers({
    basket: basketReducer,
    user: userReducer,
});

export default allReducers;