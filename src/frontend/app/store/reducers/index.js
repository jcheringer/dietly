import { combineReducers } from 'redux';
import DietsReducer from './diets-reducer';
import FoodsReducer from './foods-reducer';

export default combineReducers({ diet: DietsReducer, food: FoodsReducer });