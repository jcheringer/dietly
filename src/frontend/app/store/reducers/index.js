import { combineReducers } from 'redux';
import DietsReducer from './diets-reducer';
import FoodsReducer from './foods-reducer';
import ReceiptsReducer from './receipts-reducer';

export default combineReducers({ diet: DietsReducer, food: FoodsReducer, receipt: ReceiptsReducer });