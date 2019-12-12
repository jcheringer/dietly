import { combineReducers } from 'redux';
import DietsReducer from './diets-reducer';

export default combineReducers({ diet: DietsReducer });